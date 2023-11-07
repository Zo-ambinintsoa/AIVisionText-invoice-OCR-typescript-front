import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DocumentService} from "../../../services/document.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['../../../public/public.component.css', './document-upload.component.css']
})
export class DocumentUploadComponent {
  filteredData: { name: string; id: number }[] = [];
  documentForm!: FormGroup;
  fileInputs!: FormArray;
  filePreview!: string | ArrayBuffer | null;
  showAutocomplete: boolean = false;

  uploadFields: any[] = [];
  private idCat!: number;

  constructor(private fb: FormBuilder, private documentService: DocumentService, private router: Router) {}

  ngOnInit(): void {
    this.documentForm = this.fb.group({
      file: [null, Validators.required],
      data: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required], // Add a textarea field for the description
    });
  }

  onFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = null;

    if (element.files && element.files.length > 0) {
      file = element.files[0];
      this.documentForm.patchValue({
        file: file
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        // Use a ternary operator to handle null | string
        this.filePreview = reader.result ? reader.result : null;
      };
      reader.readAsDataURL(file);
    }
  }

  onInputFocus(): void {
    // Fetch initial data when the input is clicked
    this.documentService.searchCategories()
      .subscribe(data => {
        this.filteredData = data;
        this.showAutocomplete = true;
      });
  }


  onDataInput(): void {
    const inputValue = this.documentForm.get('data')?.value.toLowerCase();
    if (inputValue.length >= 1) {
      // Use the service to fetch data from the backend
      this.documentService.searchCategories(inputValue)
        .subscribe(data => {
          this.filteredData = data;
          this.showAutocomplete = true;
        });
    } else {
      this.filteredData = [];
      this.showAutocomplete = false;
    }
  }

  selectData(dataItem: any): void {
    this.documentForm.get('data')?.setValue(dataItem.name);
    this.documentForm.patchValue({
      category: dataItem.id
    });
    this.showAutocomplete = false;
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      // Use the DocumentService to send the form data to the backend
      console.log(this.documentForm.value)
      this.documentService.uploadDocument(this.documentForm.value).subscribe(
        response => {
          this.router.navigate(['/document/list']);
        },
        error => {
          console.error('Error uploading document:', error);
        }
      );
    } else {
      // Mark form controls as touched to display validation errors
      this.documentForm.markAllAsTouched();
    }
  }
}
