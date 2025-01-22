//% color="#AA278D" weight=100 icon="\uf0c3"
namespace main {
    let isInit = 0;
    let tof = 0;
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
        if(isInit==0){
            serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate115200);
            txData = pins.createBuffer(48);
            rxData = pins.createBuffer(30);
            txData[0]=0x26; txData[1]=0xA8; txData[2]=0x14; txData[3]=0x81; txData[4]=48;
            isInit = 1;
        }
        txData[5] = checksum(txData);
        serial.writeBuffer(txData);
        basic.showNumber(tof);
    });

    serial.onDataReceived("aabcd", function () {
       rxData = serial.readBuffer(24);
        tof = rxData[7]
    });
    
    //% block="gesture by $value"
    export function gesture(value: number): void {
            txData[15] = 0x04;
            txData[16] = value;
    }

    //% block="headLED4 $value"
    export function headled(value: number): void {
            txData[14] = 0x82;
            txData[24] = value;
    }
    
    //% block="headLED7 $value"
    export function headled7(value: number): void {
            txData[14] = 0x82;
            txData[24] = value;
    }
}
