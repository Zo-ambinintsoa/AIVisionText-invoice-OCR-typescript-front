import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-apartment-form',
  templateUrl: './form.component.html',
  styleUrls: ['../../../../public/public.component.css', './form.component.css', ]
})
export class ApartmentFormComponent {
  apartmentForm: FormGroup;
  properties: { name: string; id: number }[] = [
    { name: 'Property 1', id: 1 },
    { name: 'Property 2', id: 2 },
  ];
  filteredProperties: { name: string; id: number }[] = [];
  showAutocomplete: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.apartmentForm = this.formBuilder.group({
      unitNumber: ['', Validators.required],
      numberOfBedrooms: ['', Validators.required],
      numberOfBathrooms: ['', Validators.required],
      squareFootage: ['', Validators.required],
      property: ['', Validators.required],
    });
  }
  onPropertyInput() {
    const inputValue = this.apartmentForm.get('property')?.value.toLowerCase();

    if (inputValue.length >= 1) {
      this.filteredProperties = this.properties.filter(property =>
        property.name.toLowerCase().includes(inputValue)
      );
      this.showAutocomplete = true;
    } else {
      this.filteredProperties = [];
      this.showAutocomplete = false;
    }
  }

  selectProperty(property: { name: string; id: number }) {
    this.apartmentForm.get('property')?.setValue(property.id);
    this.showAutocomplete = false;
  }

  onSubmit() {
    if (this.apartmentForm.valid) {
      const formData = this.apartmentForm.value;
      // You can now handle form submission, e.g., sending data to an API
      console.log(formData);
    } else {
      // Form is invalid, display error messages or handle as needed
    }
  }
}
