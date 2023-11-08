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

  private getDocumentDefinition(contractData: any) {
    return {
      content: [
        {
          columns: [
            [
              {
                text: 'PRINCEPT I-WEB',
                style: 'header'
              },
              {
                text: 'Contrat de Travail (CDI)',
                style: 'subheader',
                margin: [0, 5, 0, 0]
              }
            ],
            [
              {
                text: 'Contrat de Travail',
                style: 'documentTitle',
                alignment: 'right'
              }
            ]
          ],
          columnGap: 10,
        },
        {
          text: 'Introduction',
          style: 'sectionHeader'
        },
        {
          text: [
            'Ce document constitue un contrat de travail entre ',
            { text: 'PRINCEPT I-WEB', bold: true }, // Employer's Company Name
            ', ci-après désigné l\'"Employeur", et ',
            { text: `${contractData.employeeName}`, bold: true }, // Employee's Name
            ', ci-après désigné l\'"Employé". Par ce contrat, l\'Employeur engage l\'Employé en tant que ',
            { text: `${contractData.jobTitle}`, bold: true }, // Employee's Job Title
            ' et l\'Employé accepte cette offre d\'emploi et s\'engage à exécuter ses fonctions conformément aux termes et conditions énoncés ci-après. Ce contrat reflète l\'intégralité des accords entre les deux parties et annule et remplace tous les accords précédents, qu\'ils soient écrits ou oraux, relatifs à l\'objet de ce contrat.'
          ],
          margin: [0, 0, 0, 10] // Optional: Adjust margin as needed
        },
        {
          style: 'subheader',
          text: 'Détails de l\'Employeur'
        },
        {
          text: [
            'Nom: RAZANDRINY Dieu Donné Francis\n',
            'Entreprise: PRINCEPT I-WEB\n',
            'Forme juridique: Entreprise individuelle (EI)\n',
            'Numéro d\'Identification Fiscale (NIF): 3005836049\n',
            'Numéro de STAT: 62011 11 2021 09472\n',
            'Siège social: Mahazoarivo, Lot VR 26 MAA Mahazoarivo, Antananarivo 101, Madagascar\n',
            'Téléphone: +261341908517\n',
          ]
        },
        {
          style: 'subheader',
          text: 'Détails de l\'Employé'
        },
        {
          text: [
            `Nom: ${contractData.employeeName}\n`,
            `Numéro d'Identification Nationale: ${contractData.nationalId}\n`,
            `Date de Naissance: ${contractData.dateOfBirth}\n`,
            `Titre de Poste: ${contractData.jobTitle}\n`,
            `Date de Début: ${contractData.startDate}\n`,
            `Salaire: ${contractData.salary}\n`,
          ]
        },

        {
          style: 'sectionHeader',
          text: 'Termes et Conditions'
        },
        {
          ul: [
            'Relation de travail: L\'Employé s\'engage à exécuter les fonctions décrites par l\'Employeur sous le titre spécifié ci-dessus et à effectuer les tâches requises par l\'Employeur. L\'employeur fournira le soutien et les ressources nécessaires à l\'accomplissement de ces fonctions.',
            'Rémunération: L\'Employeur s\'engage à rémunérer l\'Employé pour les services rendus au taux spécifié ci-dessus, payable mensuellement. Ceci inclut la provision pour les augmentations annuelles, sous réserve des évaluations de performance.',
            'Politiques de la société: L\'Employé observera et se conformera aux politiques et procédures de l\'entreprise. Cela inclut l\'adhésion à tous les règlements internes, en particulier en ce qui concerne la confidentialité et la protection des données.',
            'Avantages sociaux de l\'employé: L\'Employé a droit aux avantages sociaux standard de l\'entreprise, y compris l\'assurance maladie, comme spécifié dans le manuel de l\'entreprise. Les avantages supplémentaires tels que les plans de retraite et les primes seront discutés au cas par cas.',
            'Droit applicable: Ce contrat est régi par les lois de la juridiction où l\'Employeur opère. Tous les litiges découlant de ce contrat seront résolus par arbitrage ou devant les tribunaux locaux, selon ce qui est approprié.',
            // ... Autres termes et conditions selon le besoin ...
          ],
          style: 'terms'
        },
        {
          style: 'subheader',
          text: 'Durée et Période d\'Essai'
        },
        {
          ul: [
        'Ce contrat est un contrat à durée indéterminée (CDI) commençant à la date de début spécifiée ci-dessus. Une période d\'essai de 90 jours à compter de la date de début s\'appliquera, pendant laquelle l\'une ou l\'autre des parties peut résilier le contrat avec un préavis plus court.', ]},
        {
          style: 'subheader',
          text: 'Clause de Confidentialité'
        },
            {
              ul: [
        'L\'Employé s\'engage à préserver la confidentialité de toutes les informations propriétaires, secrets commerciaux et données appartenant à l\'Employeur. Cette obligation de confidentialité survivra à la résiliation de ce contrat et restera en vigueur indéfiniment. L\'employé ne divulguera, ne copiera, ne distribuera ni n’utilisera ces informations, sauf autorisation expresse de l\'Employeur ou dans le cadre de ses fonctions pour l\'Employeur.',]},
        {
          style: 'subheader',
          text: 'Horaires et Environnement de Travail'
        },
        {
          ul: [
        'L\'employé est censé travailler à temps plein selon un horaire déterminé par l\'Employeur. La semaine de travail standard est de 40 heures, typiquement du lundi au vendredi, avec la possibilité de faire des heures supplémentaires occasionnelles selon les besoins de l\'Employeur. L\'Employé effectuera ses tâches sur les lieux de travail de l\'Employeur, sauf accord contraire pour le télétravail ou les missions sur le terrain. L\'Employeur s\'engage à fournir un environnement de travail sûr et sain, conforme aux normes de l\'industrie et aux lois applicables.',]},

        {
          style: 'subheader',
          text: 'Clause de Modification'
        },
        'Toute modification de ce contrat ne sera valable qu\'après accord écrit des deux parties. Les modifications ou avenants à ce contrat doivent être rédigés par écrit et signés par les représentants autorisés des deux parties.',
        {
          columns: [
            [
              { text: 'Signature de l\'Employé', alignment: 'left', italics: true, margin: [0, 20, 0, 0] }
            ],
            [
              { text: 'Signature de l\'Employeur', alignment: 'right', italics: true, margin: [0, 20, 0, 0] }
            ]
          ],
        },
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
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        sectionHeader: {
          bold: true,
          fontSize: 12,
          margin: [0, 15, 0, 15],
          decoration: 'underline'
        },
        terms: {
          margin: [0, 5, 0, 15]
        },
      }
    };
  }
}
