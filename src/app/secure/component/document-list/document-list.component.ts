import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documentList: any[] = [];
  showDetails: boolean = false;
  selectedDocument: any = {};
  selectedBefore!:number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/documents').subscribe(data => {
      this.documentList = data;
    });
  }

  onRowClick(documentId: number): void {
    if (documentId === this.selectedBefore) {
      // Toggle the details visibility
      this.showDetails = !this.showDetails;
      this.selectedBefore = documentId;
    } else {
      // If details are not shown, fetch document details and show them
      this.http.get(`http://localhost:3000/documents/${documentId}`).subscribe(
        (documentDetails: any) => {
          this.selectedDocument = documentDetails;
          this.selectedBefore = documentId;
          this.showDetails = true;
        },
        (error) => {
          console.error('Error fetching document details', error);
        }
      );
    }
  }
}
