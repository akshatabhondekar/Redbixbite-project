import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private languageChangeSubject: Subject<void> = new Subject<void>();

  constructor(private translate: TranslateService) { 
    this.translate.onLangChange.subscribe(() => {
      this.languageChangeSubject.next();
    });
  }
  //dummy data for table
  dummyEngData = [
  {
    EstablishmentID: '1',
    CrNumber: 'CR12345',
    AgencyName: 'Agency 1',
    CustomCode: 'CC001',
    ClearingAgencyType: 'Type A',
    Status: 'Active',
    CreationDate: '2023-10-04'
  },
  {
    EstablishmentID: '2',
    CrNumber: 'CR67890',
    AgencyName: 'Agency 2',
    CustomCode: 'CC002',
    ClearingAgencyType: 'Type B',
    Status: 'Inactive',
    CreationDate: '2023-09-20'
  },

];
  dummyArbicData=[
  {
    EstablishmentID: '١', 
    CrNumber: 'CR12345',
    AgencyName: 'الوكالة ١', 
    CustomCode: 'الرمز المخصص ١',
    ClearingAgencyType: 'نوع A', 
    Status: 'نشط',
    CreationDate: '2023-10-04'
  },
  {
    EstablishmentID: '٢',
    CrNumber: 'CR67890',
    AgencyName: 'الوكالة ٢',
    CustomCode: 'الرمز المخصص ٢',
    ClearingAgencyType: 'نوع B', 
    Status: 'غير نشط', 
    CreationDate: '2023-09-20'
  }
]

  getData(): Observable<any[]> {
    const currentLang = this.translate.currentLang;
    if (currentLang === 'en') {
      return of(this.dummyEngData);
    }else {
      return of(this.dummyArbicData);
    }
   
  }
  //method to listen for language change events
  onLanguageChange(): Observable<void> {
    return this.languageChangeSubject.asObservable();
  }
}
