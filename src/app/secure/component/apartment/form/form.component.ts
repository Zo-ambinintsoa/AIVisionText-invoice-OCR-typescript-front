import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Editor, Toolbar} from 'ngx-editor';
@Component({
  selector: 'app-apartment-form',
  templateUrl: './form.component.html',
  styleUrls: ['../../../../public/public.component.css', './form.component.css', ]
})
export class ApartmentFormComponent {
  apartmentForm: FormGroup;

  editor!: Editor;
  html = '';
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];


  filteredProperties: { name: string; id: number }[] = [];
  propertyId = 0;
  showAutocomplete: boolean = false;
  properties: { name: string; id: number }[] = [
    { name: 'Property 1', id: 1 },
    { name: 'Property 2', id: 2 },
  ];


  constructor(private formBuilder: FormBuilder) {
    this.apartmentForm = this.formBuilder.group({
      unitNumber: ['', Validators.required],
      description: ['', Validators.required],
      numberOfBedrooms: ['', Validators.required],
      numberOfBathrooms: ['', Validators.required],
      squareFootage: ['', Validators.required],
      property: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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
    this.apartmentForm.get('property')?.setValue(property.name);
    this.propertyId = property.id;
    this.showAutocomplete = false;
  }

  onSubmit() {
    if (this.apartmentForm.valid) {
      this.apartmentForm.patchValue({ property : this.propertyId });
      const formData = this.apartmentForm.value;
      console.log(formData);
    } else {

    }
  }
}
