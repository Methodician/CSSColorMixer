import { Component } from '@angular/core';

import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  constructor(public af: AngularFire) {
    this.items = af.database.list('items');
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
