import { Component, OnInit } from '@angular/core';
import {DocumentService} from "../../../services/document.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documentList: any[] = [];
  showDetails: boolean = false;
  selectedDocument: any = {};
  selectedBefore!: number;
  currentPage: number = 1;
  perPage: number = 10;
  searchForm!: FormGroup;
  imagePreviewUrl: SafeUrl | null = null;

  selectedDocumentId: number | null = null;

  constructor(private documentService: DocumentService, private formBuilder: FormBuilder, private sanitizer: DomSanitizer,) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchKeyword: [''], // You can provide an initial value here
    });
    this.searchDocuments();
  }

  searchDocuments() {
    const searchKeyword = this.searchForm.get('searchKeyword')?.value;
    this.documentService.listDocuments(searchKeyword, this.currentPage, this.perPage)
      .subscribe((data: any) => {
        this.documentList = data.documents;
        this.currentPage = data.currentPage;
        this.perPage = data.perPage;
      });
  }



  changePage(newPage: number) {
    this.currentPage = newPage;
    this.searchDocuments();
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.documentList.length / this.perPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  onRowClick(documentId: number): void {
    if (documentId === this.selectedBefore) {
      // Toggle the details visibility
      this.showDetails = !this.showDetails;
      this.selectedBefore = documentId;
    } else {
      // If details are not shown, fetch document details and show them
      this.documentService.findOneDocument(documentId).subscribe(
        (documentDetails: any) => {
          this.selectedDocument = documentDetails;
          this.selectedBefore = documentId;
          this.documentService.downloadFile(documentId).subscribe(blob => {
            const objectURL = URL.createObjectURL(blob);
            this.imagePreviewUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            this.showDetails = true;
          }, error => {
            console.error('Error fetching document image', error);
          });
        },
        (error) => {
          console.error('Error fetching document details', error);
        }
      );
    }
  }



  toggleButton(documentId: number) {
    if (this.selectedDocumentId === documentId) {
      this.selectedDocumentId = null; // Close the button if it's already open
    } else {
      this.selectedDocumentId = documentId;
    }
  }

  deleteDocument(id: number) {
    this.documentService.deleteDocument(+id).subscribe(
      () => {
        // Success: Document deleted, you can handle this as needed (e.g., update documentList)
        console.log(`Document with ID ${id} deleted successfully.`);
        // Reload the page after deletion
        window.location.reload();
      },
      (error) => {
        // Handle errors here
        console.error(`Error deleting document with ID ${id}:`, error);
        // You can show an error message or take other actions based on the error.
      }
    );
  }
}
