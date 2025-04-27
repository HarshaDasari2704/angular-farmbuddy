import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports:[FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  users = [
    { email: 'farmer@example.com', password: 'farmer123', role: 'farmer' },
    { email: 'buyer@example.com', password: 'buyer123', role: 'buyer' }
  ];

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  moveToSignUp() {
    const container = document.getElementById('container');
    container?.classList.add("right-panel-active");
  }

  moveToSignIn() {
    const container = document.getElementById('container');
    container?.classList.remove("right-panel-active");
  }

  onSignUp(event: Event) {
    event.preventDefault();
    console.log('Sign Up form submitted');
  }

  onSignIn(event: Event) {
    event.preventDefault();
    
    const user = this.users.find(u => u.email === this.email);

    if (!user) {
      this.errorMessage = 'Invalid email address';
      console.log('Invalid email address');
    } else if (user.password !== this.password) {
      this.errorMessage = 'Incorrect password';
      console.log('Incorrect password');
    } else {
      console.log('Sign In successful');
      this.errorMessage = '';
      if (user.role === 'farmer') {
        this.router.navigate(['/farmer']);
      } else if (user.role === 'buyer') {
        this.router.navigate(['/buyer']);
      }
    }
  }
}
