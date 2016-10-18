export class rgbColor {
    r: number;
    g: number;
    b: number;
    rgb: string;
    constructor(r: number, g: number, b: number){
        this.r = r;
        this.g = g;
        this.b = b;
        this.rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}

export interface IrgbColor{
    r: number;
    g: number;
    b: number;
    rgb: string;
}