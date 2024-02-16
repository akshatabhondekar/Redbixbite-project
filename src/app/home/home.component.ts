import { AfterViewInit, Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  SrNo: any = 1
  data: any[] = [];
  form!: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(public translate: TranslateService, private dataService: DataService,private formBuilder:FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      crNumber: [''],
      status: [''],
      agencyName: [''],
      establishmentID: [''],
      customCode: [''],
      clearingAgencyType: [''],
      creationDate: [''],
      creationDateTO: ['']
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.dataService.onLanguageChange().subscribe(() => {
      // language has changed retrieve data accordingly
      this.getTableData();
    });
  }

  getTableData() {
    this.dataService.getData().subscribe((result) => {
      this.data = result;
      this.dtTrigger.next();
    });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  search(){
    
  }
  reset(){
    this.form.reset()
  }
}
