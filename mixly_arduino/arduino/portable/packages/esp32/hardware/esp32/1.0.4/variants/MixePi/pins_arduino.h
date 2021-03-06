#ifndef Pins_Arduino_h
#define Pins_Arduino_h

#include <stdint.h>

#define EXTERNAL_NUM_INTERRUPTS 16
#define NUM_DIGITAL_PINS        40
#define NUM_ANALOG_INPUTS       16

#define analogInputToDigitalPin(p)  (((p)<20)?(esp32_adc2gpio[(p)]):-1)
#define digitalPinToInterrupt(p)    (((p)<40)?(p):-1)
#define digitalPinHasPWM(p)         (p < 34)

static const uint8_t TX = 1;
static const uint8_t RX = 3;

static const uint8_t SDA = 21;
static const uint8_t SCL = 22;

static const uint8_t SS    = 5;
static const uint8_t MOSI  = 23;
static const uint8_t MISO  = 50;//未使用，定义为不存在管脚
static const uint8_t SCK   = 18;

static const uint8_t TFT_CS=5;
static const uint8_t TFT_DC =19;

static const uint8_t BTN_A = 0;
static const uint8_t BTN_B = 2;
static const uint8_t BTN_C = 4;

static const uint8_t TOUCH_C = 4;
static const uint8_t TOUCH_D = 13;
static const uint8_t TOUCH_E = 12;
static const uint8_t TOUCH_F = 14;
static const uint8_t TOUCH_G = 15;
static const uint8_t TOUCH_A = 27;
static const uint8_t TOUCH_B = 2;


static const uint8_t DAC1 = 25;
static const uint8_t DAC2 = 26;

#endif /* Pins_Arduino_h */
