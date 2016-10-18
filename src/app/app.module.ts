import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

import { AppComponent } from './app.component';
import { ColourPaletteComp } from './palette/colourPalette.comp';



export const firebaseConfig = {
    apiKey: "AIzaSyAc4xI67Kr3-lqqsSTKXvKGsVF6flq-Zi8",
    authDomain: "css-colormixer.firebaseapp.com",
    databaseURL: "https://css-colormixer.firebaseio.com",
    storageBucket: "css-colormixer.appspot.com",
    messagingSenderId: "1057907796380"
}

export const authConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
}
/*export const twitterAuthConfig = {
  provider: AuthProviders.Twitter,
  method: AuthMethods.Redirect
}*/

@NgModule({
  declarations: [
    AppComponent, ColourPaletteComp
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
