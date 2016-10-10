import { Component } from '@angular/core';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: FirebaseListObservable<any[]>;
  
  c1: any = {};
  c2: any = {};

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
    document.getElementById('colorBox1').style.backgroundColor = 'rgb(' + this.c1.R + ',' + this.c1.G + ',' + this.c1.B + ')';
    //let cb = document.getElementById('colorBox1');
    //cb.style.backgroundColor = 'rgb(' + this.c1.R + ',' + this.c1.G + ',' + this.c1.B + ')';
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
