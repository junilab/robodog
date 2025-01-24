enum posture {
    //% block="준비"
    zero,
    //% block="앉기"
    one,
    //% block="물구나무서기"
    two,
    //% block="기지개켜기"
    three,
    //% block="인사하기"
    four
}

enum whatLeg {
    //% block="네다리"
    zero,
    //% block="앞다리"
    one,
    //% block="뒷다리"
    two,
    //% block="왼쪽다리"
    three,
    //% block="오른쪽다리"
    four
}
enum whatLeg_ext {
    //% block="왼쪽위"
    zero,
    //% block="왼쪽아래"
    one,
    //% block="오른쪽아래"
    two,
    //% block="오른쪽위"
    three,
    //% block="앞다리"
    four,
    //% block="뒷다리"
    five,
    //% block="왼쪽다리"
    six,
    //% block="오른쪽다리"
    seven,
    //% block="네다리"
    eight
}

enum rotate_dir {
    //% block="시계방향"
    zero,
    //% block="반시계방향"
    one
}
enum front_back {
    //% block="앞"
    zero,
    //% block="뒤"
    one
}

enum left_right {
    //% block="왼쪽"
    zero,
    //% block="오른쪽"
    one
}

enum lr_fb {
    //% block="좌우"
    zero,
    //% block="앞뒤"
    one
}

enum led_draw {
    //% block="초롱초롱"
    zero,
    //% block="ILOVEYOU"
    one,
    //% block="눈감기"
    two,
    //% block="감사"
    three,
    //% block="고마워요"
    four,
    //% block="뱁새"
    five,
    //% block="좌우굴리기"
    six,
    //% block="찢눈"
    seven,
    //% block="찢눈 깜박임"
    eight,
    //% block="곤충"
    nine,
    //% block="깜박"
    ten,
    //% block="뱀눈"
    eleven,
    //% block="바람개비"
    twelve,
    //% block="왕눈이"
    thirteen
}

enum mp3_list {
    //% block="멍멍"
    zero,
    //% block="으르렁"
    one,
    //% block="화난"
    two,
    //% block="찡찡"
    three,
    //% block="거친숨"
    four,
    //% block="안녕"
    five,
    //% block="기다려"
    six,
    //% block="비켜"
    seven,
    //% block="출발"
    eight,
    //% block="레이저"
    nine,
    //% block="모터회전"
    ten,
    //% block="띠리리"
    eleven,
    //% block="외계신호"
    twelve,
    //% block="동작"
    fourteen,
    //% block="충돌"
    fifteen,
    //% block="도"
    sixteen,
    //% block="레"
    seventeen,
    //% block="미"
    eighteen,
    //% block="파"
    nineteen,
    //% block="솔"
    twenty,
    //% block="라"
    twenty_one,
    //% block="시"
    twenty_two,
    //% block="#도"
    twenty_three
}

enum mp3_volume {
    //% block="크게"
    zero,
    //% block="중간으로"
    one,
    //% block="작게"
    two
}


/**
* RoboDog blocks
*/
//% block="로보독" weight=80 color=#4f8c61 icon="\uf0c3"
namespace robodog {
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
            if (packet.length > 19 && checksum(packet) == packet[5]) {
                battery = packet[6]
                tof = packet[7]
                roll = toSigned8(packet[8])
                pitch = toSigned8(packet[9])
                yaw = toSigned16((packet[11] << 8) | packet[10])
                button = packet[16]
                //txData[14] = 3;
                //txData[24] = tof % 10 + 0x30;
                //txData[32] = tof / 10 + 0x30;
            }
        }
    });

    function findPattern(buffer: Buffer, pattern: number[]): number {
        for (let j = 0; j <= buffer.length - pattern.length; j++) {
            let match = true;
            for (let k = 0; k < pattern.length; k++) {
                if (buffer[j + k] !== pattern[k]) {
                    match = false;
                    break;
                }
            }
            if (match) return j;
        }
        return -1;
    }

    function toSigned8(n: number): number {
        n = n & 0xff
        return (n ^ 0x80) - 0x80
    }

    function toSigned16(n: number): number {
        n = n & 0xffff
        return (n ^ 0x8000) - 0x8000
    }

    //% block="회전"
    export function get_rotation(): number {
        return 100;
    }

    //% block="$what 기울기"
    export function get_tilt(what: lr_fb): number {
        return 100;
    }


    //% block="거리센서"
    export function get_tof(): number {
        return 100;
    }

    //% block="배터리"
    export function get_battery(): number {
        return 100;
    }


    //% block="버튼"
    export function get_button(): number {
        return 1;
    }

    //% block="확장 서보모터 $deg 도 설정하기"
    //% deg.defl=45
    export function ext_servo(deg: number): void {

    }


    //% block="$what 소리를 $volume 출력하기"
    export function sound_play(what: mp3_list, volume: mp3_volume): void {

    }


    //% block="R:$r, G:$g, B:$b로 바디LED 색상 출력하기"
    //%r.defl=255 g.defl=255 b.defl=255
    export function bodyled(r:number, g:number, b:number): void {

    }

    //% block="$what 헤드LED에 $char 문자 출력하기"
    //%char.defl="A"
    export function headled_print(what: left_right, char:string): void {

    }

    //% block="$exp 표정을 헤드 LED에 표현하기"
    export function headled_exp(exp: led_draw): void {
        txData[14] = 0x82;
        txData[24] = exp;
    }

    

    //%block="$leg 회전속도를 어깨 $vel1, 무릎 $vel2 (으)로 설정하기"
    //%leg.defl=whatLeg2.eight vel1.defl=50 vel2.defl=50
    export function motor_velocity(leg: whatLeg_ext, vel1: number, vel2: number): void {

    }

    //%block="$dir (으)로 $deg 도를 $velocity각속도로 회전하기"
    //%deg.defl=90 velocity.defl=100
    export function rotation(dir: rotate_dir, deg: number, velocity: number): void {

    }

    //%block="$leg 어깨 $deg1도, 무릎 $deg2도 설정하기"
    export function motor(leg: whatLeg_ext, deg1: number, deg2: number): void {

    }

    //%block="$leg 다리높이 $height, 발끝앞뒤 $fb로 설정하기"
    //%height.defl=60
    export function leg(leg: whatLeg_ext, height: number, fb: number): void {
        basic.showNumber(leg)
    }

    //%block="$dir (으)로 $velocity 빠르기로 이동하기"
    //%velocity.defl=50
    export function move(dir: front_back, velocity: number): void {

    }

    //%block="$leg (을)를 $height 보행높이로 설정하기"
    //%leg.defl=whatLeg.zero height.defl=60
    export function leg_bend(leg: whatLeg, height: number): void {

    }

    //%block="$value 자세 취하기"
    export function gesture(value: posture): void {
        //txData[15] = 0x04;
        //txData[16] = value;
        basic.showNumber(value)
    }
}
