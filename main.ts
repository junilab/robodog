//% color="#AA278D" weight=100 icon="\uf0c3"
namespace main {
    export let counter = 0; // 네임스페이스 내부 전역 변수

    loops.everyInterval(1000, function () {
        counter += 1;
        basic.showNumber(counter);
    });
    
    //% block="increase counter by $value"
    export function increaseCounter(value: number): void {
        counter += value; // 전역 변수 사용
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
