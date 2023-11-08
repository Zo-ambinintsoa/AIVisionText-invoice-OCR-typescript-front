import { Injectable } from '@angular/core';

// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";

import {Invoice} from "../models/invoice";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private apiUrl = 'http://localhost:3000/api/invoices'; // Adjust the API URL as needed
  constructor(private http: HttpClient) {}
  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getInvoiceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  getInvoices(params: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, { params });
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Could not complete your request; please try again later.'));
  }

  createInvoice(invoiceData: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrl, invoiceData);
  }

  generatePDF(invoice: Invoice, action = 'open') {
    let docDefinition = {
      content: [
        {
          columns: [
            [
              {
                text: 'PRINCEPT I-WEB',
                style: 'header'
              },
              {
                text: [
                  'Forme juridique : Entreprise individuelle (EI)\n',
                  'NIF : 3005836049\n',
                  'STAT : 62011 11 2021 09472\n',
                  'Siège social : Mahazoarivo, Lot VR 26 MAA Mahazoarivo, Antananarivo 101, Madagascar\n',
                  'Téléphone : +261341908517\n',
                ],
                margin: [0, 5, 0, 20]
              }
            ],
            [
              {
                text: 'Facture',
                style: 'documentTitle',
                alignment: 'right'
              },
              {
                text: [
                  `Date : ${new Date().toLocaleDateString('fr-FR')} \n`,
                  `Facture N° : ${invoice.InvNo ? invoice.InvNo : (Math.random() * 1000).toFixed(0)}`
                ],
                alignment: 'right',
                margin: [0, 5, 0, 0]
              }
            ]
          ],
          columnGap: 10,
        },
        {
          text: 'Détails du client',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: invoice.customerName,
                bold: true
              },
              { text: invoice.address },
              { text: invoice.email },
              { text: invoice.contactNo }
            ],
          ]
        },
        {
          text: 'Détails de la commande',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Produit', 'Prix unitaire', 'Quantité', 'Montant'],
              ...invoice.products.map(p => ([p.name, p.price.toFixed(2) + ' €', p.qty, (p.price * p.qty).toFixed(2) + ' €'])),
              [{ text: 'Montant total', colSpan: 3 }, {}, {}, invoice.products.reduce((sum, p) => sum + (p.price * p.qty), 0).toFixed(2) + ' €']
            ]
          }
        },
        {
          text: 'Informations supplémentaires',
          style: 'sectionHeader'
        },
        {
          text: invoice.additionalDetails,
          margin: [0, 0, 0, 15]
        },
        {
          columns: [
            [{ qr: `${invoice.customerName}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true }],
          ]
        },
        {
          text: 'Termes et Conditions',
          style: 'sectionHeader'
        },
        {
          ul: [
            'Les commandes peuvent être retournées sous 10 jours maximum.',
            'La garantie du produit est soumise aux termes et conditions du fabricant.',
            'Cette facture est générée par le système et est donc valide sans signature manuscrite.',
          ],
        }
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true
        },
        documentTitle: {
          fontSize: 14,
          bold: true,
          decoration: 'underline'
        },
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };
    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }

}
