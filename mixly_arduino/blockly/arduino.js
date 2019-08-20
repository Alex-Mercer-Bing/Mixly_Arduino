/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino for blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
 'use strict';

 goog.provide('Blockly.Arduino');

 goog.require('Blockly.Generator');

/**
 * Arduino code generator.
 * @type !Blockly.Generator
 */
 Blockly.Arduino = new Blockly.Generator('Arduino');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
 Blockly.Arduino.addReservedWords(
	// http://arduino.cc/en/Reference/HomePage
	'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,short,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts,A0,A1,A2,A3,A4,A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15');

/**
 * Order of operation ENUMs.
 *
 */
Blockly.Arduino.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1; // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4; // + -
Blockly.Arduino.ORDER_SHIFT = 5; // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6; // is is! >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7; // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8; // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9; // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10; // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11; // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12; // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13; // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14; // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_NONE = 99; // (...)

/*
 * Arduino Board profiles
 *
 */
 var profile = {
 	softserial_select: [["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
 	arduino_standard : {
 		description : "standard",
 		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
 		analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
 		pwm : [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
 		interrupt : [["2", "2"], ["3", "3"]],
 		MOSI:[["11","11"]],
 		MISO:[["12","12"]],
 		SCK:[["13","13"]],
 		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
 		serial : 9600
 	},
 	arduino_mega : {
 		description : "Mega",
 		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"], ["A12", "A12"], ["A13", "A13"], ["A14", "A14"], ["A15", "A15"]],
 		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"], ["A12", "A12"], ["A13", "A13"], ["A14", "A14"], ["A15", "A15"]],
 		pwm : [["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["44", "44"], ["45", "45"], ["46", "46"]],
 		interrupt: [["2", "2"], ["3", "3"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"]],
 		MOSI:[["11","11"]],
 		MISO:[["12","12"]],
 		SCK:[["13","13"]],
 		serial_select : [["Serial", "Serial"], ["Serial1", "Serial1"], ["Serial2", "Serial2"], ["Serial3", "Serial3"], ["SoftwareSerial", "mySerial"],["SoftwareSerial1", "mySerial1"],["SoftwareSeria2", "mySerial2"],["SoftwareSerial3", "mySerial3"]],
 		serial : 9600
 	},
 	arduino_eightanaloginputs : {
 		description : "eightanaloginputs",
 		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
 		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
 		pwm : [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
 		interrupt : [["2", "2"], ["3", "3"]],
 		MOSI:[["11","11"]],
 		MISO:[["12","12"]],
 		SCK:[["13","13"]],
 		serial_select : [["Serial", "Serial"], ["SoftwareSerial", "mySerial"],["SoftwareSerial1", "mySerial1"],["SoftwareSeria2", "mySerial2"],["SoftwareSerial3", "mySerial3"]],
 		serial : 9600
 	},
 	arduino_ethernet : {
 		description : "ethernet",
 		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
 		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
 		pwm : [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
		interrupt : [["2", "2"], ["3", "3"]], //本无
		MOSI:[["11","11"]],
		MISO:[["12","12"]],
		SCK:[["13","13"]],
		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"],["SoftwareSerial1", "mySerial1"],["SoftwareSeria2", "mySerial2"],["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	arduino_gemma : {
		description : "gemma",
		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"]],
		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"]],
		pwm : [["0", "0"], ["1", "1"]],
		interrupt : [["2", "2"], ["3", "3"]], //本无
		MOSI:[["11","11"]],
		MISO:[["12","12"]],
		SCK:[["13","13"]],
		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"],["SoftwareSerial1", "mySerial1"],["SoftwareSeria2", "mySerial2"],["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	arduino_leonardo : {
		description : "leonardo, micro, yun",
		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
		pwm : [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
		interrupt : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["7", "7"]],
		MOSI:[["11","11"]],
		MISO:[["12","12"]],
		SCK:[["13","13"]],
		serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["SoftwareSerial", "mySerial"],["SoftwareSerial1", "mySerial1"],["SoftwareSeria2", "mySerial2"],["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	arduino_robot : {
		description : "robot",
		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
		pwm : [["3", "3"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
		interrupt : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["7", "7"]],
		MOSI:[["11","11"]],
		MISO:[["12","12"]],
		SCK:[["13","13"]],
		serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	arduino_esp8266 : { 
		description : "esp8266",
		digital : [["0", "0"],["2", "2"],  ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["A0", "A0"]],
		analog : [["A0", "A0"]],
		pwm : [["0", "0"],["2", "2"],  ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"],["A0", "A0"]],
		interrupt : [["0", "0"],["2", "2"],  ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"],["A0", "A0"]],
		MOSI:[["13","13"]],
		MISO:[["12","12"]],
		SCK:[["14","14"]],
		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	'Arduino/Genuino 101' : {
		description : "",
		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
		pwm : [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"]],
		interrupt : [["2", "2"], ["5", "5"], ["7", "7"], ["8", "8"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		MOSI:[["11","11"]],
		MISO:[["12","12"]],
		SCK:[["13","13"]],
		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	mixio_xia : {
		description : "mixio",
		digital : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
		analog : [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
		pwm : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		interrupt : [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
		MOSI:[["11","11"]],
		MISO:[["12","12"]],
		SCK:[["13","13"]],
		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
		serial : 9600
	},
	esp32_arduino: {
		description: "esp32_arduino",
		digital: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"]],
		interrupt: [["0", "0"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"]],
		pwm: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["25", "25"], ["26", "26"], ["27", "27"], ["32", "32"]],
		analog: [["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["39", "39"]],
		dac: [["25", "25"], ["26", "26"]],
		SDA:[["21","21"]],
		SCL:[["22","22"]],
		MOSI:[["23","23"]],
		MISO:[["19","19"]],
		SCK:[["18","18"]],
		touch: [["0", "0"], ["2", "2"], ["4", "4"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["27", "27"], ["32", "32"], ["33", "33"]],
		tone_notes: [["NOTE_C3", "131"],["NOTE_D3", "147"],["NOTE_E3", "165"],["NOTE_F3", "175"],["NOTE_G3", "196"],["NOTE_A3", "220"],["NOTE_B3", "247"],["NOTE_C4", "262"],["NOTE_D4", "294"],["NOTE_E4", "330"],["NOTE_F4", "349"],["NOTE_G4", "392"],["NOTE_A4", "440"],["NOTE_B4", "494"],["NOTE_C5", "532"],["NOTE_D5", "587"],["NOTE_E5", "659"],["NOTE_F5", "698"],["NOTE_G5", "784"],["NOTE_A5", "880"],["NOTE_B5", "988"]],
		serial_pin: [["pin0", "0"], ["pin1", "1"], ["pin2", "2"], ["pin8", "8"], ["pin12", "12"], ["pin13", "13"], ["pin14", "14"], ["pin15", "15"], ["pin16", "16"]],
		radio_power: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7']],
		radio_datarate:[["1Mbit", "RATE_1MBIT"], ["250Kbit", "RATE_250KBIT"], ["2Mbit", "RATE_2MBIT"]],
		one_more:[["ONE_SHOT", "ONE_SHOT"], ["PERIODIC", "PERIODIC"]],
		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"], ["SerialBT", "SerialBT"]],
		serial : 115200
	},
	esp32_handbit: {
		description: "esp32_handbit",
		digital: [["P0", "P0"], ["P1", "P1"], ["P2", "P2"], ["P8", "P8"], ["P9", "P9"], ["P13", "P1x3"], ["P14", "P14"], ["P15", "P15"], ["P16", "P16"],["A", "BTN_A"], ["B", "BTN_B"],],
		interrupt: [["P0", "P0"], ["P1", "P1"], ["P2", "P2"], ["P8", "P8"], ["P9", "P9"], ["P13", "P13"], ["P14", "P14"], ["P15", "P15"], ["P16", "P16"]],
		pwm: [["P0", "P0"], ["P1", "P1"], ["P2", "P2"], ["P8", "P8"], ["P9", "P9"], ["P13", "P13"], ["P14", "P14"], ["P15", "P15"], ["P16", "P16"]],
		analog: [["P0", "P0"], ["P1", "P1"], ["P2", "P2"]],
		dac: [["25", "25"], ["26", "26"]],
		SDA:[["23","23"]],
		SCL:[["22","22"]],
		MOSI:[["P20","P20"]],
		MISO:[["P14","P14"]],
		SCK:[["P13","P13"]],
		touch: [["P", "P"], ["Y", "Y"], ["T", "T"], ["H", "H"], ["O", "O"], ["N", "N"]],
		button:[["A", "BTN_A"], ["B", "BTN_B"]],
		tone_notes: [["NOTE_C3", "131"],["NOTE_D3", "147"],["NOTE_E3", "165"],["NOTE_F3", "175"],["NOTE_G3", "196"],["NOTE_A3", "220"],["NOTE_B3", "247"],["NOTE_C4", "262"],["NOTE_D4", "294"],["NOTE_E4", "330"],["NOTE_F4", "349"],["NOTE_G4", "392"],["NOTE_A4", "440"],["NOTE_B4", "494"],["NOTE_C5", "532"],["NOTE_D5", "587"],["NOTE_E5", "659"],["NOTE_F5", "698"],["NOTE_G5", "784"],["NOTE_A5", "880"],["NOTE_B5", "988"]],
		radio_power: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7']],
		radio_datarate:[["1Mbit", "RATE_1MBIT"], ["250Kbit", "RATE_250KBIT"], ["2Mbit", "RATE_2MBIT"]],
		one_more:[["ONE_SHOT", "ONE_SHOT"], ["PERIODIC", "PERIODIC"]],
		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"], ["SerialBT", "SerialBT"]],
		serial : 115200
	},
	esp32_mixepi: {
		description: "esp32_mixepi",
		digital: [["P0", "P0"], ["P1", "P1"], ["P2", "P2"], ["P8", "P8"], ["P9", "P9"], ["P13", "P13"], ["P14", "P14"], ["P15", "P15"], ["P16", "P16"],["A", "BTN_A"], ["B", "BTN_B"],],
		interrupt: [["P0", "P0"], ["P1", "P1"], ["P2", "P2"], ["P8", "P8"], ["P9", "P9"], ["P13", "P13"], ["P14", "P14"], ["P15", "P15"], ["P16", "P16"]],
		pwm: [["P0", "P0"], ["P1", "P1"], ["P2", "P2"], ["P8", "P8"], ["P9", "P9"], ["P13", "P13"], ["P14", "P14"], ["P15", "P15"], ["P16", "P16"]],
		analog: [["P0", "P0"], ["P1", "P1"], ["P2", "P2"]],
		dac: [["25", "25"], ["26", "26"]],
		SDA:[["23","23"]],
		SCL:[["22","22"]],
		MOSI:[["P20","P20"]],
		MISO:[["P14","P14"]],
		SCK:[["P13","P13"]],
		touch: [["P", "P"], ["Y", "Y"], ["T", "T"], ["H", "H"], ["O", "O"], ["N", "N"]],
		button:[["A", "BTN_A"], ["B", "BTN_B"], ["C", "BTN_C"]],
		tone_notes: [["NOTE_C3", "131"],["NOTE_D3", "147"],["NOTE_E3", "165"],["NOTE_F3", "175"],["NOTE_G3", "196"],["NOTE_A3", "220"],["NOTE_B3", "247"],["NOTE_C4", "262"],["NOTE_D4", "294"],["NOTE_E4", "330"],["NOTE_F4", "349"],["NOTE_G4", "392"],["NOTE_A4", "440"],["NOTE_B4", "494"],["NOTE_C5", "532"],["NOTE_D5", "587"],["NOTE_E5", "659"],["NOTE_F5", "698"],["NOTE_G5", "784"],["NOTE_A5", "880"],["NOTE_B5", "988"]],
		radio_power: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7']],
		radio_datarate:[["1Mbit", "RATE_1MBIT"], ["250Kbit", "RATE_250KBIT"], ["2Mbit", "RATE_2MBIT"]],
		one_more:[["ONE_SHOT", "ONE_SHOT"], ["PERIODIC", "PERIODIC"]],
		serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSeria2", "mySerial2"], ["SoftwareSerial3", "mySerial3"], ["SerialBT", "SerialBT"]],
		serial : 115200
	}
};
profile["Arduino Yun"] = profile["Arduino Yun Mini"] = profile["Arduino Leonardo"] = profile["Arduino Leonardo ETH"] = profile["Arduino/Genuino Micro"] = profile["Arduino Esplora"] = profile["LilyPad Arduino USB"] = profile["arduino_leonardo"];
profile["Arduino Robot Control"] = profile["Arduino Robot Motor"] = profile["arduino_robot"];
profile["Arduino/Genuino Mega or Mega 2560"] =profile["Arduino/Genuino Mega or Mega 1280"]= profile["Arduino Mega ADK"] = profile["arduino_mega"];
profile["Arduino Ethernet"] = profile["arduino_ethernet"];
profile["Arduino Gemma"] = profile["arduino_gemma"];
profile["Arduino/Genuino Uno"] = profile["Arduino Duemilanove or Diecimila"] = profile["LilyPad Arduino"] = profile["Arduino NG or older"] = profile["arduino_standard"];
profile["Arduino Nano"] = profile["Arduino Mini"] = profile["Arduino Fio"] = profile["Arduino BT"] = profile["Arduino Pro or Pro Mini"] = profile["arduino_eightanaloginputs"];
//esp8266
profile['Arduino ESP8266 Generic']=profile["Generic_ESP8266"]=profile["ESP8266_Modules"]=profile["Generic ESP8266 Module"]=profile["Generic ESP8285 Module"] = profile["Adafruit HUZZAH ESP8266"] = profile["NodeMCU 0.9 (ESP-12 Module)"] = profile["NodeMCU 1.0 (ESP-12E Module)"] = profile["Olimex MOD-WIFI-ESP8266(-DEV)"] = profile["SparkFun ESP8266 Thing"] = profile["SweetPea ESP-210"] = profile["ESPDuino"] =  profile["Adafruit Feather HUZZAH ESP8266"] =profile["arduino_esp8266"];
profile["Invent One"]= profile["XinaBox CW01"]=profile["ESPresso Lite 1.0"]=profile["ESPresso Lite 2.0"]=profile["Phoenix 1.0"]=profile["Phoenix 2.0"]=profile["NodeMCU 0.9"]=profile["arduino_esp8266"];
profile["NodeMCU 1.0"]= profile["Olimex MOD-WIFI-ESP8266"]=profile["SparkFun ESP8266 Thing Dev"]=profile["LOLIN"]=profile["WeMos D1 R1"]=profile["ESPino"]=profile["ThaiEasyElec's ESPino"]=profile["arduino_esp8266"];
profile["WifInfo"]=profile["Arduino"]=profile["4D Systems gen4 IoD Range"]=profile["Digistump Oak"]=profile["WiFiduino"]=profile["Amperka WiFi Slot"]=profile["Seeed Wio Link"]=profile["ESPectro Core"]=profile["arduino_esp8266"];;
//esp32
profile['Arduino ESP32 Generic']=profile['Arduino MixGo']=profile['"WeMos" WiFi&Bluetooth Battery']=profile["ESP32 Dev Module"] =profile["ESP32 Wrover Module"] =profile["ESP32 Pico Kit"] =profile["Turta IoT Node"] =profile["TTGO LoRa32-OLED V1"] =profile["XinaBox CW02"] =profile["SparkFun ESP32 Thing"] =profile["u-blox NINA-W10 series (ESP32)"] =profile["Widora AIR"] =profile["Electronic SweetPeas - ESP320"] =profile["Nano32"] =profile["LOLIN D32"] =profile["LOLIN D32 PRO"] =profile["WEMOS LOLIN32"] =profile["Dongsen Tech Pocket 32"] =profile["ESPea32"] =profile["Noduino Quantum"] =profile["Node32s"] =profile["Hornbill ESP32 Dev"] =profile["Hornbill ESP32 Minima"] =profile["FireBeetle-ESP32"] =profile["IntoRobot Fig"] =profile["Onehorse ESP32 Dev Module"] =profile["Adafruit ESP32 Feather"] =profile["NodeMCU-32S"] =profile["MH ET LIVE ESP32DevKIT"] =profile["MH ET LIVE ESP32MiniKit"] =profile["ESP32vn IoT Uno"] =profile["ESP32 Dev Module"] =profile["DOIT ESP32 DEVKIT V1"] =profile["OLIMEX ESP32-EVB"] =profile["OLIMEX ESP32-GATEWAY"] =profile["OLIMEX ESP32-PoE"] =profile["ThaiEasyElec's ESPino32"] =profile["M5Stack-FIRE"] =profile["ODROID ESP32"] =profile["Heltec_WIFI_Kit_32"]=profile["Heltec_WIFI_LoRa_32"]=profile["ESPectro32"]=profile["Microduino-CoreESP32"]=profile["ALKS ESP32"]=profile["WiPy 3.0"]=profile["BPI-BIT"]=profile["Silicognition wESP32"]=profile["T-Beam"]=profile["D-duino-32"]= profile["LoPy"]=profile["LoPy4"]=profile["OROCA EduBot"]=profile["OROCA EduBot"]=profile["ESP32 FM DevKit"]=profile["esp32_arduino"];
profile['Arduino HandBit']=profile["esp32_handbit"];
//set default profile to arduino standard-compatible board
//profile["default"] = profile["arduino_standard"];
//alert(profile.default.digital[0]);

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
 Blockly.Arduino.init = function (workspace) {
	// Create a dictionary of definitions to be printed before setups.
	Blockly.Arduino.definitions_ = Object.create(null);
	// Create a dictionary of setups to be printed before the code.
	Blockly.Arduino.setups_ = Object.create(null);
	//Blockly.Arduino.variableTypes_ = Object.create(null);//处理变量类型

	if (!Blockly.Arduino.variableDB_) {
		Blockly.Arduino.variableDB_ =
		new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
	} else {
		Blockly.Arduino.variableDB_.reset();
	}

	//var defvars = [];
	//var variables = Blockly.Variables.allVariables(workspace);
	//for (var x = 0; x < variables.length; x++) {
	//defvars[x] = 'long ' +
	//	Blockly.Arduino.variableDB_.getName(variables[x],
	//	Blockly.Variables.NAME_TYPE) + ';\n';
	//}
	//Blockly.Arduino.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
 Blockly.Arduino.finish = function (code) {
	// Indent every line.
	code = '  ' + code.replace(/\n/g, '\n  ');
	var positions = new Array();
	var pos = code.indexOf("timer.run();");
	while(pos > -1){
		positions.push(pos);
		pos = code.indexOf("timer.run();",pos + 1);
	}
	for(var i=0;i<positions.length-1;i++)
	{
		code=code.replace('timer.run();\n','');
	}
	code = code.replace(/\n\s+$/, '\n');
	code = 'void loop(){\n' + code + '\n}';
	// Convert the definitions dictionary into a list.
	var imports = [];
	var definitions_var = []; //变量定义
	var definitions_fun = []; //函数定义
	var sorted_keys=Object.keys(Blockly.Arduino.definitions_).sort();
	for(var idx in sorted_keys){
		var name=sorted_keys[idx];
		var def = Blockly.Arduino.definitions_[name];
		if (name.match(/^define_BLYNK_PRINT/)) {
			imports.push(def);
		}
		else if (def.match(/^#include/)) {
			imports.push(def);
		} 
		else if (def.match(/^WiFiClient/)) {
			imports.push(def);
		} 
		else if (name.match(/^var_declare/)) {
			definitions_var.push(def);
		} else {
			definitions_fun.push(def);
		}
	}

	// Convert the setups dictionary into a list.
	var setups = [];
	for (var name in Blockly.Arduino.setups_) {
		setups.push(Blockly.Arduino.setups_[name]);
	}

	var allDefs = imports.join('\n') + '\n\n' + definitions_var.join('\n') + '\n\n' + definitions_fun.join('\n') + '\n\nvoid setup(){\n  ' + setups.join('\n  ') + '\n}' + '\n\n';
	return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
 Blockly.Arduino.scrubNakedValue = function (line) {
 	return line + ';\n';
 };

/**
 * Encode a string as a properly escaped Arduino string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
 Blockly.Arduino.quote_ = function (string) {
	// TODO: This is a quick hack.  Replace with goog.string.quote
	//return goog.string.quote(string);
	return "\"" + string + "\"";
};

/**
 * Common tasks for generating Arduino from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @private
 */
 Blockly.Arduino.scrub_ = function (block, code) {
 	if (code === null) {
		// Block has handled code generation itself.
		return '';
	}
	var commentCode = '';
	// Only collect comments for blocks that aren't inline.
	if (!block.outputConnection || !block.outputConnection.targetConnection) {
		// Collect comment for this block.
		var comment = block.getCommentText();
		if (comment) {
			commentCode += Blockly.Arduino.prefixLines(comment, '// ') + '\n';
		}
		// Collect comments for all value arguments.
		// Don't collect comments for nested statements.
		for (var x = 0; x < block.inputList.length; x++) {
			if (block.inputList[x].type == Blockly.INPUT_VALUE) {
				var childBlock = block.inputList[x].connection.targetBlock();
				if (childBlock) {
					var comment = Blockly.Arduino.allNestedComments(childBlock);
					if (comment) {
						commentCode += Blockly.Arduino.prefixLines(comment, '// ');
					}
				}
			}
		}
	}
	var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
	var nextCode = Blockly.Arduino.blockToCode(nextBlock);
	return commentCode + code + nextCode;
};
