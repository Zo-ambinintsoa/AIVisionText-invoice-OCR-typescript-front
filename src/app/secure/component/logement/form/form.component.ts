import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-logement-form',
  templateUrl: './form.component.html',
  styleUrls: [ '../../../../public/public.component.css', './form.component.css']
})
export class FormLogmentComponent {
  propertyForm: FormGroup;

  mapOptions: google.maps.MapOptions = {
    center: { lat: -21.115141, lng: 55.536384 },
    zoom: 14,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
  };

  selectedOwner: string = '';
  owners: any[] = [
    { name: 'Owner 1', id: 1 },
    { name: 'Owner 2', id: 2 },
    // Add more owners here
  ];
  filteredProperties: { name: string; id: number }[] = [];

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
