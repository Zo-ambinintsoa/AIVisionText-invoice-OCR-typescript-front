import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../public.component.css', 'login.component.css']
})
export class LoginComponent {
  title = 'Login';
  loginForm: FormGroup;

  constructor(private titleService: Title, private formBuilder: FormBuilder, private http: HttpClient) {
    this.titleService.setTitle(`PRM - ${(this.title)}`);

    // Initialize the login form with validation
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Send a POST request to the server with the form data
      const formData = this.loginForm.value;
      this.http.post('http://localhost:3000/login', formData)
        .subscribe(
          (response) => {
            // Handle successful login response here
            console.log('Login successful:', response);
          },
          (error) => {
            // Handle login error here
            console.error('Login error:', error);
          }
        );
    }
  }
}
