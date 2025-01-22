//% color="#AA278D" weight=100 icon="\uf0c3"
namespace main {
    let isInit = 0;
    let buffer: Buffer = null;
    export let counter = 0; // 네임스페이스 내부 전역 변수

    function checksum(buffer: Buffer): number {
        let sum = 0;
        for (let i = 6; i < buffer.length; i++) {
            sum += buffer[i];
        }
        return sum & 0xFF;
    }
    
    loops.everyInterval(1000, function () {
        if(isInit == 0){
            serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate115200);
            buffer = pins.createBuffer(48);
            buffer.setNumber(NumberFormat.UInt8LE, 0, 0x26);
            buffer.setNumber(NumberFormat.UInt8LE, 1, 0xA8);
            buffer.setNumber(NumberFormat.UInt8LE, 2, 0x14);
            buffer.setNumber(NumberFormat.UInt8LE, 3, 0x81);
            buffer.setNumber(NumberFormat.UInt8LE, 4, 48);
            isInit = 1;
        }
        buffer[5] = checksum(buffer);
        serial.writeBuffer(buffer);
        basic.showNumber(buffer[5]);
    });

    
    
    //% block="gesture by $value"
    export function gesture(value: number): void {
            buffer[15] = 0x04;
            buffer[16] = value;
    }
    
    /**
     * Adds two numbers and returns the result
     */
    //% block
    export function addNumbers(a: number, b: number): number {
        return counter;
    }

    /**
     * Subtracts the second number from the first
     */
    //% block
    export function subtractNumbers(a: number, b: number): number {
        return a - b;
    }

    /**
     * Turns on an LED at a specific pin
     */
    //% block="turn on LED at pin %pin"
    export function turnOnLED(pin: DigitalPin): void {
        pins.digitalWritePin(pin, 1);
    }

    /**
     * Turns off an LED at a specific pin
     */
    //% block="turn off LED at pin %pin"
    export function turnOffLED(pin: DigitalPin): void {
        pins.digitalWritePin(pin, 0);
    }
}
