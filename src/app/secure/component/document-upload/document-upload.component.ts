import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['../../../public/public.component.css', './document-upload.component.css']
})
export class DocumentUploadComponent {
  filteredData: { name: string; id: number }[] = [];
  documentForm!: FormGroup;
  fileInputs!: FormArray;
  filePreview: string | ArrayBuffer = ''; // Initialize with an empty string
  showAutocomplete: boolean = false;
  data: { name: string; id: number }[] = [
    { name: 'data 1', id: 1 },
    { name: 'data 2', id: 2 },
  ];
  uploadFields: any[] = []; // Used to store dynamically added file inputs

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the FormArray
    this.fileInputs = this.fb.array([]);

    this.documentForm = this.fb.group({
      // Bind the FormArray to the 'fileInputs' form control
      fileInputs: this.fileInputs,
      data: ['', Validators.required],
    });
  }

  onFileChange(event: any, index: number = 0): void {
    const files = event.target.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.uploadFields[index].filePreview = reader.result;
          this.uploadFields[index].file = files[0];
        }
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onDataInput(): void {
    const inputValue = this.documentForm.get('data')?.value.toLowerCase();
    if (inputValue.length >= 1) {
      // Filter the data based on the input value
      this.filteredData = this.data.filter(item =>
        item.name.toLowerCase().includes(inputValue)
      );
      this.showAutocomplete = true;
    } else {
      this.filteredData = [];
      this.showAutocomplete = false;
    }
  }

  selectData(dataItem: any): void {
    this.documentForm.get('data')?.setValue(dataItem.name);
    this.showAutocomplete = false;
  }

  addUploadField(): void {
    // Add a new upload field
    this.uploadFields.push({ file: null, filePreview: '' });
  }

  removeUploadField(index: number): void {
    // Remove the upload field at the specified index
    this.uploadFields.splice(index, 1);
  }

  addFileInput(): void {
    const newFileInput = this.fb.group({
      file: [null],
      filePreview: [''],
    });
    // Push the new file input to the FormArray
    this.fileInputs.push(newFileInput);
    // Push the new file input's value to the uploadFields array
    this.uploadFields.push(newFileInput.value);
  }

  // Function to remove a file input field by index
  removeFileInput(index: number): void {
    // Remove the file input from the FormArray
    this.fileInputs.removeAt(index);
    // Remove the corresponding entry from the uploadFields array
    this.uploadFields.splice(index, 1);
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      // Handle form submission here
      console.log(this.documentForm.value);
    } else {
      // Mark form controls as touched to display validation errors
      this.documentForm.markAllAsTouched();
    }
  }
}
