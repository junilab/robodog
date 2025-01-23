//% color="#AA278D" weight=100 icon="\uf0c3"
namespace dog {
    let isInit = 0;
    let battery = 0;
    let tof = 0;
    let yaw = 0;
    let roll = 0;
    let pitch = 0;
    let button = 0;
    let txData: Buffer = null;
    let rxData = pins.createBuffer(0);
    let delimiter = [0x40, 0x21, 0x23, 0x25];
    export let counter = 0; 

    function checksum(buf: Buffer): number {
        let sum = 0;
        if (buf[4] > buf.length)
            return -1;
        for (let i = 6; i < buf[4]; i++) {
            sum += buf[i];
        }
        return sum & 0xFF;
    }


    loops.everyInterval(50, function () {
        if (isInit == 0 || txData == null) {
            serial.setRxBufferSize(40)
            serial.redirect(SerialPin.P0, SerialPin.P1, BaudRate.BaudRate115200);
            txData = pins.createBuffer(48);
            txData[0] = 0x26; txData[1] = 0xA8; txData[2] = 0x14; txData[3] = 0x81; txData[4] = 48;
            isInit = 1;
        }
        txData[5] = checksum(txData);
        serial.writeBuffer(txData);
    });

    serial.onDataReceived("%", function () {
        rxData = rxData.concat(serial.readBuffer(0));
        let index = findPattern(rxData, delimiter);
        if (index >= 0) {
            let packet = rxData.slice(0, index);
            rxData = rxData.slice(index + delimiter.length);
            if (packet.length>19 && checksum(packet) == packet[5]){
                battery = packet[6]
                tof = packet[7]
                roll = toSigned8(packet[8])
                pitch = toSigned8(packet[9])
                yaw = toSigned16((packet[11]<<8) | packet[10])
                button = packet[16]
                //txData[14] = 3;
                //txData[24] = tof % 10 + 0x30;
                //txData[32] = tof / 10 + 0x30;
            }
        }
    });

    function findPattern(buffer: Buffer, pattern: number[]): number {
        for (let i = 0; i <= buffer.length - pattern.length; i++) {
            let match = true;
            for (let j = 0; j < pattern.length; j++) {
                if (buffer[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) return i;
        }
        return -1; 
    }

    function toSigned8(n: number): number{
        n = n & 0xff
        return (n ^ 0x80) - 0x80
    }

    function toSigned16(n: number): number {
        n = n & 0xffff
        return (n ^ 0x8000) - 0x8000
    }

    enum posture{
        "준비",
        "앉기",
        "물구나무서기",
        "기지개켜기",
        "인사하기"
    }
    //%block="$value 자세 취하기 "
    export function gesture(value: posture): void {
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

