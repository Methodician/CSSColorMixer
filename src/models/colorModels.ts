export class rgbColor {
    r: number;
    g: number;
    b: number;
    rgb: string;
    hex: string;
    constructor(r: number, g: number, b: number){
        this.r = r;
        this.g = g;
        this.b = b;
        let hexR = r==0? '00' : r.toString(16)
        let hexG = g==0? '00' : g.toString(16)
        let hexB = b==0? '00' : b.toString(16)
        this.rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
        this.hex = ('#' + hexR + hexG + hexB).toUpperCase();
    }
}

export interface IrgbColor{
    r: number;
    g: number;
    b: number;
    rgb: string;
    hex: string;
}