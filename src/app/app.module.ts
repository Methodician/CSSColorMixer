import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

import { AppComponent } from './app.component';
import { PoolComp } from './pool/pool.comp';

import { MakeDraggable } from './shared/makeDraggable.dir';
import { MakeDroppable } from './shared/makeDroppable.dir';



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

@NgModule({
  declarations: [
    AppComponent, PoolComp, MakeDraggable, MakeDroppable
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
