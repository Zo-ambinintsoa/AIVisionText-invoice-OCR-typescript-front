import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-logement',
  templateUrl: './form.component.html',
  styleUrls: [ '../../../../public/public.component.css', './form.component.css']
})
export class FormLogmentComponent {
  propertyForm: FormGroup;
  selectedOwner: string = '';
  owners: any[] = [
    { name: 'Owner 1', id: 1 },
    { name: 'Owner 2', id: 2 },
    // Add more owners here
  ];

  showAutocomplete: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.propertyForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      address: ['', Validators.required],
      numberOfUnits: ['', Validators.required],
      owner: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.propertyForm.value)
  }

  onOwnerInput() {
    this.showAutocomplete = true;
  }

  selectOwner(owner: any) {
    this.propertyForm.patchValue({
      owner: owner.id,
    });
    this.showAutocomplete = false;
  }
}
