import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DbNameService } from '../db-name.service'; // Import your DB name service
import { TableNameService } from '../table-name.service'; // Import your table name service
import { ExportDayService } from '../export-day.service';
import { FilterService } from '../filter.service';
import { KpiDataService } from '../kpi-data.service';
import { DatePipe } from '@angular/common';
//import { Component, OnInit,  } from '@angular/core';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent implements OnInit {
  form!: FormGroup;
  dbNameControl = new FormControl('');
  numberControl = new FormControl('', [Validators.required]);
  tableNameControl = new FormControl('');
  dbNameOptions: string[] = [];
  tableNameOptions: string[] = [];
  showDbNameError = false;
  selectedDB: string = '';
  tableDisabled = true;
  dbNameSelected: boolean = false;
  exportDayOptions: Date[] = [];
  @Output() filterCriteriaSelected = new EventEmitter<any>();
  



  constructor(
    private fb: FormBuilder,
    private dbNameService: DbNameService,
    private tableNameService: TableNameService,
    private exportDayService: ExportDayService,
    private filterService: FilterService,
    private kpiDataService: KpiDataService,
  ) {
    this.form = this.fb.group({
      dbName: [''],
      tableName: [''],
      date: [''],
      //number: [''],
      //number: this.numberControl,
      number: ['', [Validators.required, this.seuilValidator]],
    });
  }

  ngOnInit(): void {
    this.getUniqueDbNames(); // Fetch unique DB names on component initialization
    this.tableNameControl = new FormControl('', [Validators.required, Validators.nullValidator]);
    this.fetchUniqueExportDays();
    this.seuilValidator;
    this.form.get('dbName')?.valueChanges.subscribe((value) => {
      if (!value) {
        // Clear and disable the Table Name field when DB Name is cleared
        this.form.get('tableName')?.setValue(null);
        this.form.get('tableName')?.disable();
      } else {
        // Enable the Table Name field when DB Name is set
        this.form.get('tableName')?.enable();
      }
    });
  }
  

  updateTableNameOptions() {
    const dbNameControl = this.form.get('dbName');
    if (dbNameControl) {
      const selectedDBName = dbNameControl.value;
      if (selectedDBName) {
        // Fetch related table names only if a DB name is selected
        this.getTableNameOptions(selectedDBName);
      } else {
        this.tableNameOptions = []; // Reset table name options if no DB name is selected
        this.tableDisabled = true; // Disable table name field when no DB name is selected
      }
    }
  }

  getTableNameOptions(selectedDBName: string): void {
    this.tableNameService.getRelatedTableNames(selectedDBName).subscribe((tableNames) => {
      this.tableNameOptions = tableNames;
      this.tableDisabled = tableNames.length === 0; // Disable table name field if no options available
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      const exportday = new Date(formData.exportDay);
      const dbname = formData.dbName.toString();
      const tablename = formData.tableName.toString();
      const newSeuil = parseFloat(formData.number);
      
      const filterCriteria = {
        exportday,
        dbname,
        tablename,
        seuil: newSeuil,
      };
      this.filterCriteriaSelected.emit(filterCriteria);
      // Update Seuil using KpiDataService
      this.kpiDataService.updateSeuilForFilteredData(filterCriteria).subscribe(
        (response) => {
          console.log('Seuil updated successfully:', response);
         // const updatedSeuil = response.updatedSeuil;
          //reload

          // Optionally, you can inform the user that the update was successful
        },
        (error) => {
          console.error('Error updating Seuil:', error);

          // Handle errors and inform the user if the update fails
         
        }
      );

      // Send filter criteria to the FilterService
      this.filterService.setFilterCriteria({ seuil: newSeuil, exportday });

      // Rest of your onSubmit logic
    } else {
      this.showDbNameError = true;
    }
  }

  private getUniqueDbNames(): void {
    this.dbNameService.getUniqueDbNames().subscribe((uniqueDbNames) => {
      this.dbNameOptions = uniqueDbNames;
    });
  }
  isMouseOverTableSelect = false;

  onMouseEnterTableSelect() {
    if (!this.selectedDB) {
      this.isMouseOverTableSelect = true;
    }
  }

  onMouseLeaveTableSelect() {
    this.isMouseOverTableSelect = false;
  }
  onSelectDBName() {
    this.dbNameSelected = true;
    this.isMouseOverTableSelect = false; // Set it to false when a DB name is selected
  }
  fetchUniqueExportDays(): void {
    this.exportDayService.getUniqueExportDays().subscribe((response: Date[]) => {
      this.exportDayOptions = response;
    });
  }
  seuilValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
  
    if (value !== null && (value < 0 || value > 100)) {
      return { invalidSeuil: true };
    }
  
    return null;
  }
  clearDbName(): void {
    this.form.get('dbName')?.setValue(null); 
  }
  clearTableName(): void {
    this.form.get('tableName')?.setValue(null); 
  }
  clearExportDay(): void {
    this.form.get('exportDay')?.setValue(null); 
  }
  
  clearSeuil(): void {
    this.form.get('number')?.setValue(null);
  }
  
  applyFilters(): void {
    //
    const seuilFilter = this.form.get('number')?.value;
    const exportDayFilter = this.form.get('exportDay')?.value;
  
    //
    const filters = {
      seuil: seuilFilter,
      exportDay: exportDayFilter,
    };
}
  
}