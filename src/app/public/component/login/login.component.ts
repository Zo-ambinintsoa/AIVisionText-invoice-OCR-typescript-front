import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../public.component.css', 'login.component.css']
})
export class LoginComponent {
  title = 'Login';
  loginForm: FormGroup;
  errorMessage!: string;

  constructor(private titleService: Title, private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
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
      this.authService.login(
        formData.email,
        formData.password
      ).subscribe(
        () => {
          this.router.navigate(['/dashboard'])
        },
        (error) => {
          console.log(error)
          this.errorMessage = error.error.message; // Set the error message from the server
        }
      );
    }
  }
}
