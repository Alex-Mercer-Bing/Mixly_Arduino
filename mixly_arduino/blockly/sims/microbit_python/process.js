var codeProcessor = {
    replaceCode: function (code) {
        if (code.indexOf('class HCSR04:') != -1) {
            code = code.replace(/class HCSR04[\s\S]*?self.distance_mm\(\) \/ 10\.0/, '');
        }

        if (code.indexOf('class Servo:') != -1) {
            code = code.replace(/class Servo[\s\S]*?self\.write_us\(us\)/, '');
        }
        return code;
    },
    getCode: function (trick) {
        var code = '';
        if(document.getElementById('tab_arduino').className == 'tabon'){
            code = editor.getValue();
        }else{
            code = Blockly.Python.workspaceToCode(Blockly.mainWorkspace) || '';
        }
        if (code == '') {
            return '';
        }
        if (trick == true) {
            // trick
            code = codeProcessor.replaceCode(code);
        }
        return code;
    },
    //需要修改板卡名称
    saveXmlFileAs: function () {
        var xmlCodes = goog.string.quote(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)));
        xmlCodes = xmlCodes.replace("<xml", "<xml version=\\\"mixgo_0.999\\\" board=\\\"" + "MicroPython[NRF51822_microbit]" + "\\\"");
        xmlCodes = xmlCodes.substring(1, xmlCodes.length - 1);
        var blob = new Blob(
            [xmlCodes],
            { type: 'text/plain;charset=utf-8' });
        saveAs(blob, "Mixoj.xml");
    },
    savePyFileAs: function () {
        var blob = new Blob(
            [codeProcessor.getCode(false)],
            { type: 'text/plain;charset=utf-8' });
        saveAs(blob, "Mixoj.py");
    },
    translateQuote: function(str, trimEscaped){
        var xml = "";
        var hasComleteAngleBracket = true;
        var lenStr = str.length;
        for(var i = 0 ; i < lenStr; i ++){
            if(str[i] === "<"){
                hasComleteAngleBracket = false;
            }else if(str[i] === ">"){
                hasComleteAngleBracket = true;
            }
    
            if(trimEscaped === true
                    && hasComleteAngleBracket === false
                    && i + 1 < lenStr
                    && str[i] === "\\"
                    && str[i + 1] === '"'){
                i += 1;			
            }
    
            if(trimEscaped === false 
                    && hasComleteAngleBracket === false
                    && i > 0
                    && str[i - 1] !== "\\"
                    && str[i] === '"'){
                xml += "\\";			
            }
            xml += str[i];
        }
        return xml;
    },
    decodeUnicode: function(s){
	    return unescape(s.replace(/\\u/g, '%u'));
    },
    renderXml: function (xmlContent) {
        try {
            try {
                var xml = Blockly.Xml.textToDom(codeProcessor.decodeUnicode(xmlContent));
                Blockly.mainWorkspace.clear();
                Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
                renderContent();
            } catch (e) {
                alert("invalid xml file!");
                console.log(e);
                return;
            }
        } catch (e) {
            alert("invalid xml file!");
            console.log(e);
            return;
        }
    },
    renderIno: function (xmlContent) {
        tabClick('arduino');
        editor.setValue(xmlContent, -1);
    },
    loadLocalFile: function () {
        // Create event listener function
        var parseInputXMLfile = function (e) {
            var files = e.target.files;
            var reader = new FileReader();
            reader.onload = function () {
                var text = codeProcessor.translateQuote(reader.result, true);
                var filesuffix = files[0].name.split(".")[files[0].name.split(".").length - 1];
                if (filesuffix === "xml" || filesuffix === "mix") {
                    codeProcessor.renderXml(text);
                } else if (filesuffix === "ino" || filesuffix === "py" || filesuffix === "js") {
                    //根据文件后缀反推newboard
                } else {
                    alert("Invalid file type! (.ino|.xml|.mix|.js|.py file supported)");
                    return;
                }
            };
            reader.readAsText(files[0]);
        };
        // Create once invisible browse button with event listener, and click it
        var selectFile = document.getElementById('select_file');
        if (selectFile != null) {
            $("#select_file").remove();
            $("#select_file_wrapper").remove();
            selectFile = document.getElementById('select_file');
        }
        if (selectFile == null) {
            var selectFileDom = document.createElement('INPUT');
            selectFileDom.type = 'file';
            selectFileDom.id = 'select_file';

            var selectFileWrapperDom = document.createElement('DIV');
            selectFileWrapperDom.id = 'select_file_wrapper';
            selectFileWrapperDom.style.display = 'none';
            selectFileWrapperDom.appendChild(selectFileDom);

            document.body.appendChild(selectFileWrapperDom);
            selectFile = document.getElementById('select_file');
            //$("body").on('change', '#select_file', parseInputXMLfile);
            $("#select_file").change(parseInputXMLfile);
        }
        selectFile.click();
    },
    infiniteLoop: function () {
        //TODO: decide whether code has infinite loop
        return true;
    }
}


var smCodeProcessor = {
    //1. import XXX ==> import sm_XXX
    processImport: function (code) {
        var microbitModuleArr = ['microbit', 'music', 'radio', 'neopixel', 'speech'];
        var codeArr = code.replace('\r\n', '\n').replace('\r', '\n').split('\n');
        var usedModuleSet = new Set();
        for (var i = 0; i < codeArr.length; i++) {
			var line = codeArr[i];
            line.replace(/^( *?)from( +?)(\w*?) import (.*?)$/g, function () {
                var module = arguments[3];
                if (microbitModuleArr.indexOf(module) != -1) {
                    usedModuleSet.add(module);
                }
            });
            line.replace(/^( *?)import (.*?)$/g, function () {
                var module = arguments[2];
                if (microbitModuleArr.indexOf(module) != -1) {
                    usedModuleSet.add(module);
                }
            });
        }
        for (var x of usedModuleSet) {
            code = code.replace(new RegExp(x,'g'), 'sm_' + x);
        }
        return code;
    },

    //2. 多线程修改内部状态
    parseInputer: function (inputer) {
        if (inputer == undefined) {
            return;
        }
        eval(inputer); 
    },

    //3. 超时kill掉
    autoKillProgram: function (timeout) {
        setTimeout(function () {
            sm.time += 10;
            sm.updateSnapshot();
            if (sm.running == true) {
                Sk.execLimit = 0;
                sm.running = false;
            }
        }, timeout);
    }
}
