import { Component, OnInit } from '@angular/core';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { rgbColor, IrgbColor } from '../../models/colorModels';

@Component({
  selector: 'colour-palette',
  templateUrl: './colourPalette.comp.html',
  styleUrls: ['./colourPalette.comp.css']
})
export class ColourPaletteComp implements OnInit {

  //items: FirebaseListObservable<any[]>;
  method: string = 'Average';
  averageOn = true;
  addOn = false;
  minusOn = false;
  poolSet = false;
  showHex = true;

  red: IrgbColor = new rgbColor(255, 0, 0);
  //yellow: IrgbColor = new rgbColor(255,255,0);
  green: IrgbColor = new rgbColor(0, 255, 0);
  blue: IrgbColor = new rgbColor(0, 0, 255);
  white: IrgbColor = new rgbColor(255, 255, 255);
  black: IrgbColor = new rgbColor(0, 0, 0);


  poolColor: IrgbColor = new rgbColor(127, 127, 127);

  colors: IrgbColor[] = [];

  constructor(public af: AngularFire) {
    //this.items = af.database.list('items');
  }

  ngOnInit() {
    //this.setRgbPicks();
    this.initializeColors();
    this.setElementColor('colorPool', this.poolColor);
  }

  clearColors() {
    this.initializeColors();
  }

  toggleHex() {
    this.showHex = !this.showHex;
  }

  initializeColors() {
    this.colors = [];
    this.colors.push(this.red);
    //this.colors.push(this.yellow);
    this.colors.push(this.green);
    this.colors.push(this.blue);
    this.colors.push(this.white);
    this.colors.push(this.black);

  }

  setElementColor(elementId: string, color: IrgbColor) {
    document.getElementById(elementId)
      .style.backgroundColor = color.rgb;
  }

  pickColor(color: IrgbColor) {
    if (!this.poolSet) {
      this.setElementColor('colorPool', color);
      this.poolColor = color;
      this.poolSet = true;
    }
    else {
      var newColor: IrgbColor
      if (this.averageOn && !this.addOn && !this.minusOn)
        newColor = this.mixColors(this.poolColor, color);
      else if (this.addOn)
        newColor = this.addColors(this.poolColor, color);
      else if (this.minusOn)
        newColor = this.subtractColors(this.poolColor, color);
      this.setElementColor('colorPool', newColor);
      this.poolColor = newColor;
    }

  }

  subtractColors(c1: IrgbColor, c2: IrgbColor): IrgbColor {
    let r = this.subtract(c1.r, this.averageOn ? this.average(c1.r, c2.r) : c2.r));
    let g = this.subtract(c1.g, this.averageOn ? this.average(c1.g, c2.g) : c2.g));
    let b = this.subtract(c1.b, this.averageOn ? this.average(c1.b, c2.b) : c2.b);
    return new rgbColor(r, g, b);
  }
  subtract(a: number, b: number) {
    var combo = a;
    if (a < b)
      combo = b - a;
    if (b < a)
      combo = a - b;
    else
      return 0;
    return combo;
  }

  addColors(c1: IrgbColor, c2: IrgbColor): IrgbColor {
    let r = this.combine(c1.r, this.averageOn ? this.average(c1.r, c2.r) : c2.r);
    let g = this.combine(c1.g, this.averageOn ? this.average(c1.g, c2.g) : c2.g);
    let b = this.combine(c1.b, this.averageOn ? this.average(c1.b, c2.b) : c2.b);
    return new rgbColor(r, g, b);
  }
  combine(a: number, b: number) {
    var combo = a + b;
    if (combo > 255)
      return 255;
    else return combo;
  }

  mixColors(c1: IrgbColor, c2: IrgbColor): IrgbColor {
    let r = this.average(c1.r, c2.r);
    let g = this.average(c1.g, c2.g);
    let b = this.average(c1.b, c2.b);
    return new rgbColor(r, g, b);
  }

  average(a: number, b: number) {
    return Math.round((a + b) / 2);
  }

  toggleAvg() {
    this.method = 'Average';
    this.averageOn = !this.averageOn;
  }
  toggleAdd() {
    this.method = 'Add';
    this.addOn = !this.addOn;
    if (this.addOn)
      this.minusOn = false;
  }
  toggleMinus() {
    this.method = 'Minus';
    this.minusOn = !this.minusOn;
    if (this.minusOn)
      this.addOn = false;
  }

  saveColor() {
    this.colors.push(this.poolColor);
  }

  resetPool() {
    let freshPool = new rgbColor(127, 127, 127);
    this.poolColor = freshPool;
    this.setElementColor('colorPool', freshPool);
    this.poolSet = false;
  }
  /*  updateC1(){
      document.getElementById('colorBox1')
        .style.backgroundColor =
        'rgb(' + this.c1.R + ',' + this.c1.G + ',' + this.c1.B + ')';
  
        this.mixColors();
      //let cb = document.getElementById('colorBox1');
      //cb.style.backgroundColor = 'rgb(' + this.c1.R + ',' + this.c1.G + ',' + this.c1.B + ')';
    }*/

  /*  updateC2(){
      document.getElementById('colorBox2')
        .style.backgroundColor =
        'rgb(' + this.c2.R + ',' + this.c2.G + ',' + this.c2.B + ')';
  
        this.mixColors();
      //let cb = document.getElementById('colorBox1');
      //cb.style.backgroundColor = 'rgb(' + this.c1.R + ',' + this.c1.G + ',' + this.c1.B + ')';
    }*/

  /*  mixColors(){
      let cR = Math.round(( this.c1.R + this.c2.R ) / 2);
      let cG = Math.round(( this.c1.G + this.c2.G ) / 2);
      let cB = Math.round(( this.c1.B + this.c2.B ) / 2);
      this.mixedColor.R = cR;
      this.mixedColor.G = cG;
      this.mixedColor.B = cB;
      document.getElementById('mixedColorBox')
        .style.backgroundColor =
        'rgb(' + cR + ',' + cG + ',' + cB + ')';
    }*/

}
