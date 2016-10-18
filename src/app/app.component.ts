import { Component } from '@angular/core';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

import { rgbColor, IrgbColor } from '../models/colorModels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: FirebaseListObservable<any[]>;
  
  red: IrgbColor = new rgbColor(255,0,0);
  green: IrgbColor = new rgbColor(0,255,0);
  blue: IrgbColor = new rgbColor(0,0,255);

  c1: any = {'R': 0, 'G': 0, 'B': 255};
  c2: any = {'R': 255, 'G': 0, 'B': 0};
  mixedColor: any = {};

  c1R: number;
  c1G: number;
  c1B: number;

  c2R: number;
  c2G: number;
  c2B: number;

  constructor(public af: AngularFire) {
    this.items = af.database.list('items');
  }

  updateC1(){
    document.getElementById('colorBox1')
      .style.backgroundColor =
      'rgb(' + this.c1.R + ',' + this.c1.G + ',' + this.c1.B + ')';

      this.mixColors();
    //let cb = document.getElementById('colorBox1');
    //cb.style.backgroundColor = 'rgb(' + this.c1.R + ',' + this.c1.G + ',' + this.c1.B + ')';
  }

  updateC2(){
    document.getElementById('colorBox2')
      .style.backgroundColor =
      'rgb(' + this.c2.R + ',' + this.c2.G + ',' + this.c2.B + ')';

      this.mixColors();
    //let cb = document.getElementById('colorBox1');
    //cb.style.backgroundColor = 'rgb(' + this.c1.R + ',' + this.c1.G + ',' + this.c1.B + ')';
  }

  mixColors(){
    let cR = Math.round(( this.c1.R + this.c2.R ) / 2);
    let cG = Math.round(( this.c1.G + this.c2.G ) / 2);
    let cB = Math.round(( this.c1.B + this.c2.B ) / 2);
    this.mixedColor.R = cR;
    this.mixedColor.G = cG;
    this.mixedColor.B = cB;
    document.getElementById('mixedColorBox')
      .style.backgroundColor =
      'rgb(' + cR + ',' + cG + ',' + cB + ')';
  }

  loginGoogle(){
    this.af.auth.login();
  }

  loginTwitter(){
    alert('Twitter login not implemented yet...');
    /*this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Redirect
    });*/
  }

  loginFacebook(){
    alert('Facebook login not implemented yet...');
  }

  logout(){
    this.af.auth.logout();
  }

}
