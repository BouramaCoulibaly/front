import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonthService } from '../month.service';
import { YearService } from '../year.service';
import { TableUniqueNamesService } from '../table-unique-names.service';
import { DbNameService } from '../db-name.service';
import { TableNameService } from '../table-name.service';
import { SeuilService } from '../seuil.service';
import { YearsByMonthService } from '../yearsbymonth.service';
import { TableNamesByMonthService } from '../tablenamesbymonth.service';
import { DbNamesByMonthService } from '../dbnamesbymonth.service';
import { MonthsByYearService } from '../monthsbyyear.service';
import { TableNamesByYearService } from '../tablenamesbyyear.service';
import { DbNamesByYearService } from '../dbnamesbyyear.service';
import { UniqueDbNameByTableNameService } from '../uniquedbnamebytablename.service';
import { MonthsByTableNameService } from '../monthsbytablename.service';
import { YearsbytablenameService } from '../yearsbytablename.service';
import { YearsByDbnameService } from '../yearsbydbname.service';
import { MonthsByDbnameService } from '../monthsbydbname.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seuil',
  templateUrl: './seuil.component.html',
  styleUrls: ['./seuil.component.css'],
})
export class SeuilComponent implements OnInit {
  //mapping monthname to number
  monthNameToNumber: { [key: string]: string } = {
    'January': '1',
    'February': '2',
    'March': '3',
    'April': '4',
    'May': '5',
    'June': '6',
    'July': '7',
    'August': '8',
    'September': '9',
    'October': '10',
    'November': '11',
    'December': '12',
  };

  //
  uniqueMonths: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  
  uniqueDbNames: string[] = [];
  uniqueTableNames: string[] = [];
  //uniqueMonths: string[] = [];
  uniqueYears: number[] = [];
  seuilForm!: FormGroup;
  //selectedDbName: string = '';
  selectedTableName: string=''
  selectedDbName: string = '';
  isDbNameSelected: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private monthService: MonthService,
    private yearService: YearService,
    private tableNameService: TableNameService,
    private dbNameService: DbNameService,
    private tableUniqueNamesService: TableUniqueNamesService,
    private seuilService: SeuilService,
    private yearsByMonthService: YearsByMonthService,
    private tableNamesByMonthService: TableNamesByMonthService,
    private dbNamesByMonthService: DbNamesByMonthService, 
    private monthsByYearService: MonthsByYearService,
    private tableNamesByYearService: TableNamesByYearService,
    private dbNamesByYearService: DbNamesByYearService,
    private uniqueDbNameByTableNameService: UniqueDbNameByTableNameService,
    private monthsByTableNameService: MonthsByTableNameService,
    private yearsbytablenameService: YearsbytablenameService,
    private yearsByDbnameService: YearsByDbnameService,
    private monthsByDbnameService: MonthsByDbnameService,
    private router: Router
    
  ) {}

  ngOnInit(): void {
    this.selectedDbName = '';
    this.loadUniqueDbNames(); // Load uniqueDbNames initially
    this.loadUniqueTableNames();
    this.loadUniqueYears();
    this.loadUniqueMonths(); // Load all unique table names initially

    // Initialize the form with default values
    this.seuilForm = this.formBuilder.group({
      dbName: [''],
      tableName: [''],
      year: [''],
      month: [''],
      seuil: ['', Validators.required],
    });
    
  }

  navigateToYourPage(): void {
    // Navigate to the 'your-page' route defined in your routing module
    this.router.navigate(['/tableau']);
  }

  onMonthSelectionChange(): void {
    const selectedMonth = this.seuilForm.get('month')?.value;
    console.log('Selected Month:', selectedMonth);
  
    if (selectedMonth) {
      // Fetch relative years when a month is selected
      this.yearsByMonthService.getRelativeYearsByMonth(selectedMonth).subscribe(
        (yearsData: number[]) => {
          this.uniqueYears = yearsData;
          console.log('Relative Years:', yearsData);
        },
        (yearsError) => {
          console.error('Error fetching relative years:', yearsError);
        }
      );
  
      // Fetch relative table names when a month is selected
      this.tableNamesByMonthService.getRelativeTableNamesByMonth(selectedMonth).subscribe(
        (tableNamesData: string[]) => {
          this.uniqueTableNames = tableNamesData;
          console.log('Relative Table Names:', tableNamesData);
        },
        (tableNamesError) => {
          console.error('Error fetching relative table names:', tableNamesError);
        }
      );
      //
      this.dbNamesByMonthService.getRelativeDbNamesByMonth(selectedMonth).subscribe(
        (data: string[]) => {
          this.uniqueDbNames = data;
          console.log('Relative DB Names:', data);
        },
        (error) => {
          console.error('Error fetching relative DB names:', error);
        }
      );
    
    } else {
      // If month is cleared, load all unique years and table names
      this.loadUniqueYears();
      this.loadUniqueTableNames();
      this.loadUniqueDbNames();
    }
  }
  //
  onYearSelectionChange(): void {
    const selectedYear = this.seuilForm.get('year')?.value;
    console.log('Selected Year:', selectedYear);
  
    if (selectedYear) {
      // Fetch related months when a year is selected
      this.monthsByYearService.getRelativeMonthsByYear(selectedYear).subscribe(
        (data: string[]) => {
          this.uniqueMonths = data;
          console.log('Related Months:', data);
        },
        (error) => {
          console.error('Error fetching related months:', error);
        }
      );
      //
      this.tableNamesByYearService.getRelativeTableNamesByYear(selectedYear).subscribe(
        (data: string[]) => {
          this.uniqueTableNames = data;
          console.log('Related Table Names:', data);
        },
        (error) => {
          console.error('Error fetching related table names:', error);
        }
      );
      //
      this.dbNamesByYearService.getRelativeDbNamesByYear(selectedYear).subscribe(
        (data: string[]) => {
          this.uniqueDbNames = data;
          console.log('Related DB Names:', data);
        },
        (error) => {
          console.error('Error fetching related DB names:', error);
        }
      );
    } else {
      // If year is cleared, load all unique months
      this.loadUniqueMonths();
      this.loadUniqueTableNames();
      this.loadUniqueDbNames();
    }
  }

  //

  onTableNameSelectionChange(): void {
    const selectedTableName = this.seuilForm.get('tableName')?.value;
    console.log('Selected Table Name:', selectedTableName);
  
    if (selectedTableName) {
      // Fetch unique DB names when a table name is selected
      this.uniqueDbNameByTableNameService.getUniqueDbNamesByTableName(selectedTableName).subscribe(
        (data: string[]) => {
          this.uniqueDbNames = data;
          console.log('Unique DB Names:', data);
        },
        (error) => {
          console.error('Error fetching unique DB names:', error);
        }
      );

      //
      this.monthsByTableNameService.getRelativeMonthsByTableName(selectedTableName).subscribe(
        (data: string[]) => {
          this.uniqueMonths = data;
          console.log('Relative Months:', data);
        },
        (error) => {
          console.error('Error fetching relative months:', error);
        }
      );
      //
      this.yearsbytablenameService.getRelativeYearsByTableName(selectedTableName).subscribe(
        (data: number[]) => {
          this.uniqueYears = data;
          console.log('Relative Years:', data);
        },
        (error) => {
          console.error('Error fetching relative months:', error);
        }
      );
    } else {
      // If table name is cleared, load all unique DB names
      this.loadUniqueDbNames();
      this.loadUniqueMonths();
      this.loadUniqueYears
    }
  }

  //

  onDbNameSelectionChange(): void {
    const selectedDbName = this.seuilForm.get('dbName')?.value;
    console.log('Selected DB Name:', selectedDbName);
  
    if (selectedDbName) {
      // Fetch related table names when a DB name is selected
      this.tableNameService.getRelatedTableNames(selectedDbName).subscribe(
        (data: string[]) => {
          this.uniqueTableNames = data;
          console.log('Related Table Names:', data);
        },
        (error) => {
          console.error('Error fetching related table names:', error);
        }
      );
      //
      this.yearsByDbnameService.getRelativeYearsByDbname(selectedDbName).subscribe(
        (data: number[]) => {
          this.uniqueYears = data;
          console.log('Relative Years:', data);
        },
        (error) => {
          console.error('Error fetching relative years:', error);
        }
      );

      //

      this.monthsByDbnameService.getRelativeMonthsByDbname(selectedDbName).subscribe(
        (data: string[]) => {
          this.uniqueMonths = data;
          console.log('Relative Months:', data);
        },
        (error) => {
          console.error('Error fetching relative months:', error);
        }
      );
    } else {
      // If DB name is cleared, load all unique table names
      this.loadUniqueTableNames();
      this.loadUniqueYears();
      this.loadUniqueMonths();
    }
  }

  //

  onSubmit(): void {
    if (this.seuilForm.valid) {
      const formValue = this.seuilForm.value;
      // Angular component
      const data = {
        dbname: formValue.dbName,
        tablename: formValue.tableName,
        year: formValue.year,
        month: formValue.month,
        seuil: formValue.seuil
      };

  
      // Call the SeuilService to update the Seuil value
      this.seuilService.updateSeuil(data).subscribe(
        (response) => {
          // Handle a successful response (e.g., show a confirmation message)
          console.log('Seuil updated successfully:', response);
  
          // Optionally, reset the form
          this.seuilForm.reset();
        },
        (error) => {
          // Handle errors (e.g., display an error message)
          console.error('Error updating Seuil:', error);
        }
      );
    }
  }
  
  
  
  
  

  loadUniqueMonths(): void {
    this.monthService.getUniqueMonths().subscribe(
      (data: string[]) => {
        this.uniqueMonths = data;
      },
      (error) => {
        console.error('Error fetching unique months:', error);
      }
    );
  }
  
  // Load unique years
  loadUniqueYears(): void {
    this.yearService.getYears().subscribe(
      (data: number[]) => {
        this.uniqueYears = data;
      },
      (error) => {
        console.error('Error fetching unique years:', error);
      }
    );
  }

  loadUniqueDbNames(): void {
    this.dbNameService.getUniqueDbNames().subscribe(
      (data: string[]) => {
        this.uniqueDbNames = data;
      },
      (error) => {
        console.error('Error fetching unique DB names:', error);
      }
    );
  }

  loadUniqueTableNames(): void {
    this.tableUniqueNamesService.getUniqueTableNames().subscribe(
      (data: string[]) => {
        this.uniqueTableNames = data;
      },
      (error) => {
        console.error('Error fetching unique table names:', error);
      }
    );
  }
//

  clearTableName(): void {
    // Clear the Table Name field
    this.seuilForm.get('tableName')?.setValue('');
  }
  clearField(fieldName: string): void {
    this.seuilForm.get(fieldName)?.setValue(''); // Reset the form control to an empty value
  }
}
