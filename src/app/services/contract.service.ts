import { Injectable } from '@angular/core';
// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contractsUrl = 'http://localhost:3000/api/contracts';
  constructor(private http: HttpClient) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }


  createContract(contractData: any): Observable<any> {
    return this.http.post(this.contractsUrl, contractData);
  }

  getContracts({ page = 1, limit = 5, search = '' }): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('limit', limit);
    if (search) {
      params = params.append('searchTerm', search);
    }
    return this.http.get(`${this.contractsUrl}`, { params });
  }

  deleteContract(id: number): Observable<any> {
    return this.http.delete(`${this.contractsUrl}/${id}`);
  }

  generatePdf(data: any, action: 'open' | 'print' | 'download') {
    const documentDefinition = this.getDocumentDefinition(data);
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

    if (action === 'open') {
      pdfDocGenerator.open();
    } else if (action === 'print') {
      pdfDocGenerator.print();
    } else if (action === 'download') {
      pdfDocGenerator.download();
    }
  }

  getContractById(id: number): Observable<any> {
    return this.http.get(`${this.contractsUrl}/${id}`);
  }

  private getDocumentDefinition(data: any) {
    return {
      content: [
        { text: 'Work Contract', style: 'header' },
        `This contract is made between ${data.employerName} (Employer) and ${data.employeeName} (Employee).`,
        `Employee National ID: ${data.nationalId}`,
        `Date of Birth: ${data.dateOfBirth}`,
        `Job Title: ${data.jobTitle}`,
        `Start Date: ${data.startDate}`,
        `Salary: ${data.salary}`,
        '\n\nTerms and Conditions:',
        '1. The Employee agrees to perform the duties described by the Employer under the title specified above and will perform duties as required by the Employer.',
        '2. The Employer agrees to compensate the Employee for services rendered at the rate specified above, payable monthly.',
        '3. The Employee will observe and comply with company policies and procedures.',
        '4. The Employee is entitled to standard company benefits, including health insurance, as specified in the company handbook.',
        '5. This contract is governed by the laws of the jurisdiction where the Employer operates.',
        '\n\nEmployee Signature: ____________________    Date: _______________',
        '\n\nEmployer Signature: ____________________    Date: _______________'
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        }
      }
    };
  }
}
