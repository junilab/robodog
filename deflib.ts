
namespace Deflib{
    export enum posture {
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

    export enum whatLeg {
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

    export enum whatLeg_ext {
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

    export enum rotate_dir {
        //% block="시계방향"
        zero,
        //% block="반시계방향"
        one
    }

    export enum front_back {
        //% block="앞"
        zero,
        //% block="뒤"
        one
    }

    export enum left_right {
        //% block="왼쪽"
        zero,
        //% block="오른쪽"
        one
    }

    export enum lr_fb {
        //% block="좌우"
        zero,
        //% block="앞뒤"
        one
    }

    export enum led_draw {
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

    export enum mp3_list {
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

    export enum mp3_volume {
        //% block="크게"
        zero,
        //% block="중간으로"
        one,
        //% block="작게"
        two
    }


    export function findPattern(buffer: Buffer, pattern: number[]): number {
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

    export function toSigned8(n: number): number {
        n = n & 0xff
        return (n ^ 0x80) - 0x80
    }

    export function toSigned16(n: number): number {
        n = n & 0xffff
        return (n ^ 0x8000) - 0x8000
    }

    export function constrain(val:number, min:number, max:number): number {
        if(val > max)
            val = max
        if(val < min)
            val = min
        return val
    }

    export function complement(val: number): number {

    return 0;
}
}
