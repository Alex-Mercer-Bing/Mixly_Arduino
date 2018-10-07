'use strict';

goog.provide('Blockly.Python.sensor');

goog.require('Blockly.Python');

//ok
Blockly.Python.sensor_button_is_pressed = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  btn + '.is_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_button_was_pressed = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  btn + '.was_pressed()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_button_get_presses = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var btn = Blockly.Python.valueToCode(this, 'btn', Blockly.Python.ORDER_ATOMIC);
    var code =  btn + '.get_presses()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.controls_GestureLists = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var gesture = this.getFieldValue('gesture');
    // Blockly.Python.definitions_['func_gesture' + gesture] = code;
    return ['"'+gesture+'"', Blockly.Python.ORDER_ATOMIC];
}
//ok
Blockly.Python.controls_attachGestureInterrupt = function(){
    Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var gesture = this.getFieldValue('gesture');
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var d=branch || Blockly.Python.PASS;
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = 'if '+v+'.is_gesture("' + gesture + '"):\n' + d;
    // Blockly.Python.definitions_['func_gesture' + gesture] = code;
    return code;
}
//ok
Blockly.Python.controls_attachGestureInterrupt2 = function(){
    Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var gesture = this.getFieldValue('gesture');
    var branch = Blockly.Python.statementToCode(this, 'DO');
    var d=branch || Blockly.Python.PASS;
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = 'if '+v+'.was_gesture("' + gesture + '"):\n' + d;
    // Blockly.Python.definitions_['func_gesture' + gesture] = code;
    return code;
}
//ok
Blockly.Python.sensor_get_gestures= function(){
    Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var gesture = this.getFieldValue('GES');
    var a;
    if(gesture =='all'){
        a = 'accelerometer.get_gestures()';
    }
    else if(gesture =='current'){
        a = 'accelerometer.current_gesture()';
    }
    return [a, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_current_gesture= function(){
    Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    return ['accelerometer.current_gesture()', Blockly.Python.ORDER_ATOMIC];
};

//ok
Blockly.Python.sensor_get_acceleration = function(){
    Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var key = this.getFieldValue('key')
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var code = v+'.get_' + key + '()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_set_acceleration = function(){
    Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var key = this.getFieldValue('key')
    var code = 'input.setAccelerometerRange(' + key  + ')\n';
    return code;
};
//undefined?!?!?!?!
Blockly.Python.sensor_light_level= function(){
    return ['input.lightLevel()', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_calibrate_compass= function(){
    Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    return 'compass.calibrate()\n';
};
//ok
Blockly.Python.sensor_is_compass_calibrated= function(){
    Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    return ['compass.is_calibrated()', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_compass_heading= function(){
    Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    return ['compass.heading()', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_temperature = function(){
    Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    return [v+'.get_temperature()', Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.sensor_field_strength= function(){
    Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var compass = this.getFieldValue('compass');
    var a;
    if(compass =='strength'){
        a = v+'.get_field_strength()';
    }
    else if(compass =='heading'){
        a = v+'.heading()';
    }
    return [a, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.sensor_rotation = function(){
    var key = this.getFieldValue('key')
    var code = 'input.rotation(' + key  + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.sensor_magnetic= function(){
    var key = this.getFieldValue('key')
    var code = 'input.magneticForce(' + key  + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.sensor_distance_hrsc04= function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    Blockly.Python.setups_['class_hrsc04'] =
    'class HCSR04:\n'+
    '    def __init__(self, tpin=pin15, epin=pin14, spin=pin13):\n'+
    '        self.trigger_pin = tpin\n'+
    '        self.echo_pin = epin\n'+
    '        self.sclk_pin = spin\n'+
    '\n'+
    '    def distance_mm(self):\n'+
    '        spi.init(baudrate=125000, sclk=self.sclk_pin,\n'+
    '                 mosi=self.trigger_pin, miso=self.echo_pin)\n'+
    '        pre = 0\n'+
    '        post = 0\n'+
    '        k = -1\n'+
    '        length = 500\n'+
    '        resp = bytearray(length)\n'+
    '        resp[0] = 0xFF\n'+
    '        spi.write_readinto(resp, resp)\n'+
    '        # find first non zero value\n'+
    '        try:\n'+
    '            i, value = next((ind, v) for ind, v in enumerate(resp) if v)\n'+
    '        except StopIteration:\n'+
    '            i = -1\n'+
    '        if i > 0:\n'+
    '            pre = bin(value).count("1")\n'+
    '            # find first non full high value afterwards\n'+
    '            try:\n'+
    '                k, value = next((ind, v)\n'+
    '                                for ind, v in enumerate(resp[i:length - 2]) if resp[i + ind + 1] == 0)\n'+
    '                post = bin(value).count("1") if k else 0\n'+
    '                k = k + i\n'+
    '            except StopIteration:\n'+
    '                i = -1\n'+
    '        dist= -1 if i < 0 else round((pre + (k - i) * 8. + post) * 8 * 0.172)\n'+
    '        return dist\n'+
    '\n'+
    'sonar=HCSR04()\n'
    return ['sonar.distance_mm()/10.0', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.DS1307_init = function () {
  Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
  var SDA = Blockly.Python.valueToCode(this, 'SDA', Blockly.Python.ORDER_ATOMIC);
  var SCL = Blockly.Python.valueToCode(this, 'SCL', Blockly.Python.ORDER_ATOMIC);
  //var RTCName = this.getFieldValue('RTCName');
  //Blockly.Python.definitions_['include_Mixly'] = '#include "Mixly.h"';
  Blockly.Python.setups_['class_DS1307'] = Blockly.Python.CLASS_DS1307_INIT;
  //Blockly.Python.definitions_['DS1307'+RTCName] = 'DS1307 ' + RTCName + '('+SDA+','+SCL+');';
  //return 'DS1307' + '('+SDA+','+SCL+')\n';
};

Blockly.Python.RTC_get_time = function () {
  Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
  //var RTCName = this.getFieldValue('RTCName');
  // var timeType =this.getFieldValue('TIME_TYPE');
  // Blockly.Python.setups_['class_DS1307'] = Blockly.Python.CLASS_DS1307_INIT;
  // switch (timeType) {
  //   case "Year":
  //      var code = 'ds.'+timeType+'()';
  //      return [code, Blockly.Python.ORDER_ASSIGNMENT];
  //      break;
  //   case "Month":
  //      var code = 'ds.'+timeType+'()';
  //      return [code, Blockly.Python.ORDER_ASSIGNMENT];
  //      break;
  //   case "Day":
  //      var code = 'ds.'+timeType+'()';
  //      return [code, Blockly.Python.ORDER_ASSIGNMENT];
  //      break;
  //   case "Hour":
  //      var code = 'ds.'+timeType+'()';
  //      return [code, Blockly.Python.ORDER_ASSIGNMENT];
  //      break;
  //   case "Minute":
  //      var code = 'ds.'+timeType+'()';
  //      return [code, Blockly.Python.ORDER_ASSIGNMENT];
  //      break;
  //   case "Second":
  //      var code = 'ds.'+timeType+'()';
  //      return [code, Blockly.Python.ORDER_ASSIGNMENT];
  //      break;
  //   case "Week":
  //      var code = 'ds.'+timeType+'()';
  //      return [code, Blockly.Python.ORDER_ASSIGNMENT];
  //      break;
  //   case "Mix1":
  //      var code ='ds.Year()'+','+'ds.Month()'+','+'ds.Day()';
  //      return [code, Blockly.Python.ORDER_ASSIGNMENT];
  //      break;
  //   case "Mix2":
  //      var code ='ds.Hour()'+','+'ds.Minute()'+','+'ds.Second()';
  //      return [code, Blockly.Python.ORDER_ASSIGNMENT];
  //      break;
  // }
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.datetime()\n';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.RTC_set_time = function () {
  Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
  //var RTCName = this.getFieldValue('RTCName');
  var hour = Blockly.Python.valueToCode(this, "hour", Blockly.Python.ORDER_ASSIGNMENT);
  var minute = Blockly.Python.valueToCode(this, "minute", Blockly.Python.ORDER_ASSIGNMENT);
  var second = Blockly.Python.valueToCode(this, "second", Blockly.Python.ORDER_ASSIGNMENT);
  Blockly.Python.setups_['class_DS1307'] = Blockly.Python.CLASS_DS1307_INIT;
  var code ='str(ds.Hour('+hour+'))+ str(ds.Minute('+minute+')) +str(ds.Second('+second+'))\n';
  return code;
};

Blockly.Python.RTC_set_date = function () {
  Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
  //var RTCName = this.getFieldValue('RTCName');
  var year = Blockly.Python.valueToCode(this, "year", Blockly.Python.ORDER_ASSIGNMENT);
  var month = Blockly.Python.valueToCode(this, "month",Blockly.Python.ORDER_ASSIGNMENT);
  var day = Blockly.Python.valueToCode(this, "day",Blockly.Python.ORDER_ASSIGNMENT);
  Blockly.Python.setups_['class_DS1307'] = Blockly.Python.CLASS_DS1307_INIT;
  var code ='str(ds.Year('+year+'))+ str(ds.Month('+month+')) +str(ds.Day('+day+'))\n';
  return code;
};

Blockly.Python.sensor_compass_reset = function(block) {
  Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
  return ['compass.clear_calibration()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.HCSR04 = function () {
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    //Blockly.Python.definitions_['import_machine_Pin'] = "from machine import Pin";
    var dropdown_pin1 = Blockly.Python.valueToCode(this, "PIN1", Blockly.Python.ORDER_ASSIGNMENT);
    var dropdown_pin2 = Blockly.Python.valueToCode(this, "PIN2", Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'Sonar(' + dropdown_pin1 + ', ' + dropdown_pin2 + ').checkdist()';
    return [code, Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.dht11 = function () {
    /*Blockly.Python.definitions_['import_machine_Pin'] = "from machine import Pin";
    Blockly.Python.definitions_['import_time'] = 'import time';
    Blockly.Python.definitions_['import_machine'] ='import machine';*/
    Blockly.Python.definitions_['import_dhtx'] = 'import dhtx';
    var sensor_type = this.getFieldValue('TYPE');
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var what = this.getFieldValue('WHAT');
    var code ='dhtx.get_'+what+"('"+sensor_type+"',"+dropdown_pin.substring(1)+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_light= function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    return ['brightness.read()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_sound= function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    return ['sound.read()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.number1 = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_pin_pressed = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var number = Blockly.Python.valueToCode(this, 'button', Blockly.Python.ORDER_ATOMIC);
    var code = 'touch'+ number+'.is_touched()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.controls_attachInterrupt = function () {
    var dropdown_pin = this.getFieldValue('button');
    var dropdown_mode = this.getFieldValue('mode');
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    // Blockly.Python.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
   
    var code = 'button_' + dropdown_pin + '.irq' + '(handler = ' + 'attachInterrupt_func_' + dropdown_pin + ', trigger = ' + dropdown_mode + ')\n'
    var funcName = 'attachInterrupt_func_' + dropdown_pin;
    var branch = Blockly.Python.statementToCode(this, 'DO') || Blockly.Python.PASS;
    var code2 = 'def' + ' ' + funcName + '(p):\n' + branch + '\n';
    Blockly.Python.setups_[funcName] = code2;
    return code;
};

Blockly.Python.sensor_pin_near = function(){
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    var direction = this.getFieldValue('direction');
    var code = 'Infrared_'+ direction +'.near()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.RTC_set_datetime= function () {
  Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
  var year = Blockly.Python.valueToCode(this, "year", Blockly.Python.ORDER_ASSIGNMENT);
  var month = Blockly.Python.valueToCode(this, "month",Blockly.Python.ORDER_ASSIGNMENT);
  var day = Blockly.Python.valueToCode(this, "day",Blockly.Python.ORDER_ASSIGNMENT);
  var hour = Blockly.Python.valueToCode(this, "hour", Blockly.Python.ORDER_ASSIGNMENT);
  var minute = Blockly.Python.valueToCode(this, "minute",Blockly.Python.ORDER_ASSIGNMENT);
  var second = Blockly.Python.valueToCode(this, "second",Blockly.Python.ORDER_ASSIGNMENT);
  var week = Blockly.Python.valueToCode(this, "weekday", Blockly.Python.ORDER_ASSIGNMENT);
  var millisecond = Blockly.Python.valueToCode(this, "millisecond",Blockly.Python.ORDER_ASSIGNMENT);
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code = v+'.datetime(('+year+','+month+','+day+','+week+','+hour+','+minute+','+second+','+millisecond+'))\n';
  return code;
};

Blockly.Python.sensor_rtc_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var code = v + ' = RTC()\n';
    return code;
};

Blockly.Python.sensor_use_i2c_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var iv = Blockly.Python.valueToCode(this, 'I2CSUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key')
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    if (key=='MPU9250') {
      Blockly.Python.definitions_['import_mpu9250_*'] = 'from mpu9250 import *';
    }else if (key=='BMP280') {
      Blockly.Python.definitions_['import_bmp280_*'] = 'from bmp280 import *';
    }else if (key=='SHT20') {
      Blockly.Python.definitions_['import_sht20_*'] = 'from sht20 import *';
    }
    var code = v + ' = ' + key + "("+ iv+ ')\n';
    return code;
};

Blockly.Python.sensor_bmp=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key')
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    Blockly.Python.definitions_['import_bmp280_*'] = 'from bmp280 import *';
    var code = v + '.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.sensor_sht=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key')
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    Blockly.Python.definitions_['import_sht20_*'] = 'from sht20 import *';
    var code = v + '.' + key;
    return [code, Blockly.Python.ORDER_ATOMIC];
};