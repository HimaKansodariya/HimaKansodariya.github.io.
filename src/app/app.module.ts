import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAjUy-HUtVZCShNKGSzSqheX6YzPqWsVGs",
  authDomain: "flight-task-hima.firebaseapp.com",
  projectId: "flight-task-hima",
  storageBucket: "flight-task-hima.appspot.com",
  messagingSenderId: "342196695107",
  appId: "1:342196695107:web:52223eb2594032f68924f6",
  measurementId: "G-9W5FCFGE97"
};

@NgModule({
  declarations: [
    AppComponent,
    FlightDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
