//% color="#AA278D" weight=100 icon="\uf0c3"
namespace main {
    let isInit = 0;
    let txData: Buffer = null;
    let rxData: Buffer = null;
    export let counter = 0; // 네임스페이스 내부 전역 변수

    function checksum(buf: Buffer): number {
        let sum = 0;
        for (let i = 6; i < buf.length; i++) {
            sum += buf[i];
        }
        return sum & 0xFF;
    }
    
    loops.everyInterval(1000, function () {
        if(isInit == 0){
            serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate115200);
            txData = pins.createBuffer(48);
            rxData = pins.createBuffer(30);
            txData[0]=0x26; txData[1]=0xA8; txData[2]=0x14; txData[3]=0x81; txData[4]=48;
            isInit = 1;
        }
        txData[5] = checksum(txData);
        serial.writeBuffer(txData);
    });

    serial.onDataReceived("abcd", function () {
        let buffer = serial.readBuffer(30);
        let chk = checksum(txData);
        if(chk == buffer[5])
            basic.showNumber(5);
        else
            basic.showNumber(8); 
    });
    
    //% block="gesture by $value"
    export function gesture(value: number): void {
            txData[15] = 0x04;
            txData[16] = value;
    }

    //% block="headLED $value"
    export function headled(value: number): void {
            txData[14] = 0x82;
            txData[24] = value;
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
}
