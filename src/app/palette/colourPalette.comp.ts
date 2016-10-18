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
  method: string = 'Avg';
  poolSet = false;

  red: IrgbColor = new rgbColor(255,0,0);
  //yellow: IrgbColor = new rgbColor(255,255,0);
  green: IrgbColor = new rgbColor(0,255,0);
  blue: IrgbColor = new rgbColor(0,0,255);
  white: IrgbColor = new rgbColor(255,255,255);
  black: IrgbColor = new rgbColor(0,0,0);


  paletteColor: IrgbColor = new rgbColor(127,127,127);

  colors: IrgbColor[] = [];

  constructor(public af: AngularFire) {
    //this.items = af.database.list('items');
  }

  ngOnInit(){
    //this.setRgbPicks();
    this.initializeColors();
  }

  initializeColors(){
    this.colors.push(this.red);
    //this.colors.push(this.yellow);
    this.colors.push(this.green);
    this.colors.push(this.blue);
    this.colors.push(this.white);
    this.colors.push(this.black);
    this.setElementColor('colorPool', this.paletteColor);
  }
/*  
  setRgbPicks(){
    this.setElementColor('redPick', this.red);
    this.setElementColor('greenPick', this.green);
    this.setElementColor('bluePick', this.blue);
    this.setElementColor('colorPool', this.paletteColor);
  }
*/
  setElementColor(elementId: string, color: IrgbColor){
    document.getElementById(elementId)
      .style.backgroundColor = color.rgb;
  }

  pickColor(color: IrgbColor){
    if(!this.poolSet){
      this.setElementColor('colorPool', color);
      this.paletteColor = color;
      this.poolSet = true;
    }
    else{
      var newColor: IrgbColor
      if(this.method == 'Avg')
        newColor = this.mixColors(color, this.paletteColor);
      else newColor = this.addColors(color, this.paletteColor);
      this.setElementColor('colorPool', newColor);
      this.paletteColor = newColor;
    }

  }


  saveColor(){
    this.colors.push(this.paletteColor);
  }

  resetPool(){
    let freshPool = new rgbColor(127,127,127);
    this.paletteColor = freshPool;
    this.setElementColor('colorPool', freshPool);
    this.poolSet = false;
  }

  addColors(c1: IrgbColor, c2: IrgbColor): IrgbColor{
    let r = this.combine(c1.r, c2.r);
    let g = this.combine(c1.g, c2.g);
    let b = this.combine(c1.b, c2.b);
    return new rgbColor(r,g,b);
  }

  combine(a: number, b: number){
    var combo = a + b;
    if(combo > 255)
      return 255;
    else return combo;
  }

  mixColors(c1: IrgbColor, c2: IrgbColor): IrgbColor{
    let r = this.average(c1.r, c2.r);
    let g = this.average(c1.g, c2.g);
    let b = this.average(c1.b, c2.b);
    return new rgbColor(r,g,b);
  }

  average(a: number, b: number){
    return Math.round( ( a + b ) /2 );
  }

  setAvg(){
    this.method = 'Avg';
  }
  setAdd(){
    this.method = 'Add';
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
