import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../public.component.css', './register.component.css']
})
export class RegisterComponent {
  title = 'Register';
  registerForm: FormGroup;
  errorMessage!: string;
  constructor(private titleService: Title, private formBuilder: FormBuilder , private router : Router, private authService : AuthService ) {
    this.titleService.setTitle(`PRM - ${(this.title)}`);

    // Initialize the registration form with validation
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.validatePassword]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  validatePassword(control: AbstractControl): ValidationErrors | null {
    const passwordPattern = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
    if (passwordPattern.test(control.value)) {
      return null; // Password is valid
    } else {
      return { invalidPassword: true };
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value === confirmPassword?.value) {
      return null; // Passwords match
    } else {
      return { passwordMismatch: true };
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Send a POST request to the server with the form data
      const formData = this.registerForm.value;
      this.authService.register(
        formData.fullName,
        formData.username,
        formData.email,
        formData.password
      ).subscribe(
        () => {
         this.router.navigate(['/login'])
        },
        (error) => {
          console.log(error)
          this.errorMessage = error.error.message; // Set the error message from the server
        }
      );
    }
  }
}
