import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent {
  isLoading: boolean = false;
  formFields = [
    { id: 'airline', label: 'Airline', type: 'text', required: true },
    { id: 'arrivalDate', label: 'Arrival Date', type: 'date', required: true },
    { id: 'arrivalTime', label: 'Arrival Time', type: 'time', required: true },
    { id: 'flightNumber', label: 'Flight Number', type: 'text', required: true },
    { id: 'numOfGuests', label: 'Number of Guests', type: 'number', required: true },
    { id: 'comments', label: 'Comments', type: 'textarea', required: false }
  ];
  constructor(private http: HttpClient,
    private afAuth: AngularFireAuth, 
    private router: Router) {}

  submitForm(flightForm: NgForm): void {
    if (flightForm.invalid) {
      alert('Request failed...Please fill in all required fields.');
      return;
    }

    const payload = flightForm.value;
    
    if (payload.numOfGuests < 1) {
      alert('Number of Guests should be at least 1.');
      return;
    }
    this.isLoading = true; 

    const headers = new HttpHeaders({
      'token': 'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh',
      'candidate': 'Hima'
    });

    this.http.post<any>('https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge', payload, { headers })
      .subscribe(
        (response) => {
          alert('Request ' + (response ? 'successful' : 'failed'));
          flightForm.resetForm();
          this.isLoading = false;
          
        },
        (error) => {
          alert('Request failed: ' + error);
          this.isLoading = false;
        }
      );
  }

  logout(): void {
    this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        alert('Opps! error occured while logging out. Please try again later')
      });
  }
}
