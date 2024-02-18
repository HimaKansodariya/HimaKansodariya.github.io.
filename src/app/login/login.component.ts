import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  login(loginForm: NgForm): void {
    if (loginForm.invalid) {
      return;
    }

    const { username, password } = loginForm.value;
    this.afAuth
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        this.router.navigate(['/flight-details']);
      })
      .catch((error) => {
        alert('Login failed. Please enter a valid username and password.');
      });
  }
}
