//% color="#AA278D" weight=100 icon="\uf0c3"
namespace main {
    
    /**
     * Adds two numbers and returns the result
     */
    //% block
    export function addNumbers(a: number, b: number): number {
        return a + b;
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
