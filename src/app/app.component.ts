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

  red: IrgbColor = new rgbColor(255, 0, 0);
  green: IrgbColor = new rgbColor(0, 255, 0);
  blue: IrgbColor = new rgbColor(0, 0, 255);

  c1: any = { 'R': 0, 'G': 0, 'B': 255 };
  c2: any = { 'R': 255, 'G': 0, 'B': 0 };
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



  loginGoogle() {
    this.af.auth.login();
  }

  loginTwitter() {
    alert('Twitter login not implemented yet... Please use Google');
    /*this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Redirect
    });*/
  }

  loginFacebook() {
    alert('Facebook login not implemented yet... Please use Google');
  }

  logout() {
    this.af.auth.logout();
  }

}
