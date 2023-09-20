import { Component, OnInit, ViewChild } from '@angular/core';
import { KpiService } from '../kpi.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { DbNameService } from '../db-name.service'; // Import your service for uniqueDbNames
import { TableNameService } from '../table-name.service'; // Import your service for uniqueTableNames
import { TableUniqueNamesService } from '../table-unique-names.service';
import { YearService } from '../year.service';
import { MonthService } from '../month.service';
//import * as ExcelJS from 'exceljs';
//import * as XLSX from 'xlsx';
const stream: any = import('stream');
// Use stream as any

interface KpiData {
  id: number;
  fileSize: number;
  nbFiles: number;
  nbLines: number;
  moy: number;
  seuil: number;
  exportday: string;
  dbname: string;
  tablename: string;
  d_d: number;
  diff_mean?: number; // Calculated field
  diff_day2day?: number; // Calculated field
}

@Component({
  selector: 'app-list-kpi',
  templateUrl: './list-kpi.component.html',
  styleUrls: ['./list-kpi.component.css']
})
export class ListKpiComponent implements OnInit {
  kpiData!: MatTableDataSource<KpiData>;  
  displayedColumns: string[] = ['id', 'fileSize', 'nbFiles', 'nbLines', 'moy', 'seuil', 'exportday', 'dbname', 'tablename', 'd_d', 'diff_mean', 'diff_day2day'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  monthNameToNumber: { [key: string]: string } = {
    'January': '01',
    'February': '02',
    'March': '03',
    'April': '04',
    'May': '05',
    'June': '06',
    'July': '07',
    'August': '08',
    'September': '09',
    'October': '10',
    'November': '11',
    'December': '12',
  };

  // Define variables for filtering
  selectedDbName: string = '';
  selectedTableName: string = '';
  uniqueDbNames: string[] = [];
  uniqueTableNames: string[] = [];
  filteredData: KpiData[] = [];
  selectedYear: number | null = null;
  uniqueYears: number[] = [];
  uniqueMonths: string[] = [];
  selectedMonth: string = '';
  selectedMonthNumber: string = '';
  relatedTableNames: string[] = [];
  isDbNameSelected: boolean = false;
  avg1 : number | null = null;
  avg2 : number | null = null;
  

  //uniqueTableNames: string[] = [];


  constructor(
    private kpiService: KpiService,
    private dbNameService: DbNameService, // Inject the service for uniqueDbNames
    private tableNameService: TableNameService, // Inject the service for uniqueTableNames
    private tableUniqueNamesService: TableUniqueNamesService,
    private yearService: YearService,
    private monthService: MonthService
  ) {}

  ngOnInit(): void {
    this.selectedDbName = ''; // Initially, set it to an empty string
  this.loadKpiData(); // Load data and apply filters
  this.loadUniqueDbNames();
  this.loadUniqueTableNames();
  //this.selectedTableUniqueName ='';
  this.loadUniqueYears();
  this.loadUniqueMonths();
  }

  //excel

 

  /*exportToExcel(): void {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
  
    this.uniqueDbNames.forEach((dbName) => {
      // Filter the data for the current DB name
      const filteredData = this.filteredData.filter((item) => item.dbname === dbName);
  
      // Define the columns for the Excel table (exclude 'id')
      const columns = ['fileSize', 'nbFiles', 'nbLines', 'moy', 'seuil', 'exportday', 'd_d', 'diff_mean', 'diff_day2day'];
  
      // Create a worksheet for the current DB name
      const worksheet = XLSX.utils.json_to_sheet(filteredData, { header: columns });
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, dbName);
    });
  
    // Generate the Excel file in binary format
    const excelBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
  
    // Convert the binary data to a Blob
    const blob = new Blob([this.s2ab(excelBinary)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Create a download link and trigger the download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kpi_data.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  // Helper function to convert binary string to ArrayBuffer
 s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }*/
  
  
  
  

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

  loadKpiData(): void {
    this.kpiService.getKpiData().pipe(
      map((data: KpiData[]) => {
        // Calculate diff_mean and diff_day2day for each element in the data
        return data.map((element) => {
          // ... Your calculations
          this.avg1 = (element.d_d + element.nbLines)/2;
          this.avg2 = (element.moy + element.nbLines)/2;
          element.diff_mean = Math.abs(element.nbLines-element.moy)*100/this.avg1;
          element.diff_day2day= Math.abs(element.d_d-element.nbLines)*100/this.avg2;
          return element;
        });
      })
    ).subscribe(
      (dataWithCalculatedValues: KpiData[]) => {
        this.filteredData = dataWithCalculatedValues;
        this.applyFilters(); // Apply filters after loading data
      },
      (error) => {
        console.error('Error fetching kpiData:', error);
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
        this.applyFilters(); // Apply filters after updating table names
      },
      (error) => {
        console.error('Error fetching unique table names:', error);
      }
    );
  }
  
  
  

  /*loadUniqueTableNames(): void {
    this.tableNameService.getRelatedTableNames(this.selectedDbName).subscribe(
      (data: string[]) => {
        this.uniqueTableNames = data;
      },
      (error) => {
        console.error('Error fetching unique table names:', error);
      }
    );
  }*/

  onDbNameSelectionChange(): void {
    if (this.selectedDbName) {
      console.log('Selected DB Name:', this.selectedDbName);
      // Fetch related table names when a DB name is selected
      this.tableNameService.getRelatedTableNames(this.selectedDbName).subscribe(
        (data: string[]) => {
          this.uniqueTableNames = data;
          // Clear the selected table name when a new DB name is selected
          this.selectedTableName = ''; // Add this line to clear the selected table name
          this.applyFilters(); // Apply filters after updating table names
        },
        (error) => {
          console.error('Error fetching related table names:', error);
        }
      );
    } else {
      // Fetch all table names when the DB name filter is cleared
      this.loadUniqueTableNames();
    }
  }
  
  
  
  
  onMonthSelectionChange(): void {
    this.applyFilters();
  }
  

 /* onDbNameSelectionChange(): void {
    this.applyFilters();
  }*/
  // ... (other methods)

  getVal(event: KeyboardEvent): void {
    if ((event.target as HTMLInputElement)?.value) {
      this.applyFilter((event.target as HTMLInputElement)?.value);
    }
  }
  
  applyFilter(value: string): void {
    value = value.trim().toLowerCase();
    this.kpiData.filter = value;
  }

  clearFilter(inputElement: HTMLInputElement): void {
    inputElement.value = ''; // Clear the input field
    this.applyFilter(''); // Apply the filter with an empty string
  }
  
  textFilter: string = '';

clearTextFilter(): void {
  this.textFilter = '';
  this.applyFilters();
}

applyFilters(): void {
    let filteredData = this.filteredData; // Start with the full dataset

    // Filter by DB name if selected
    if (this.selectedDbName) {
      filteredData = filteredData.filter((item) => item.dbname === this.selectedDbName);
    }

    // Filter by Table name if selected
    if (this.selectedTableName) {
      filteredData = filteredData.filter((item) => item.tablename === this.selectedTableName);
    }

    // Filter by Year if selected
    if (this.selectedYear !== null) {
      filteredData = filteredData.filter((item) => {
        const year = new Date(item.exportday).getFullYear();
        return year === this.selectedYear;
      });

      //month

    }

    if (this.selectedMonth) {
      filteredData = filteredData.filter((item) => {
        const date = new Date(item.exportday);
        const monthNumber = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month number as a string (e.g., "09" for September)
        const selectedMonthNumber = this.monthNameToNumber[this.selectedMonth];
        return monthNumber === selectedMonthNumber;
      });
    }

    // Update the MatTableDataSource with the filtered data
    this.kpiData = new MatTableDataSource(filteredData);
    this.kpiData.paginator = this.paginator;
  }


// Define a method to get the original data
/*getOriginalKpiData(): KpiData[] {
  return this.kpiData.data; // Replace with the actual source of your data
}*/

isAllowedColumn(column: string): boolean {
  return column === 'seuil' || column === 'nbLines';
}

clearDbName(): void {
  this.selectedDbName = ''; // Clear the selected DB name
  this.loadUniqueTableNames(); // Load all table names
  this.applyFilters(); // Apply the filters to update the table
}



clearTableName(): void {
  this.selectedTableName = ''; // Clear the selected table name
  this.applyFilters(); // Apply the filters to update the table
}
clearYear(): void {
  this.selectedYear = null; // Clear the selected year
  this.applyFilters(); // Apply the filters to update the table
}
clearMonth(): void {
  this.selectedMonth = '';
  this.applyFilters();
}

parametrerSeuil() {
  // Implement the logic for the button click action here
  // You can set the threshold value or perform any desired action
  // For example, you can display a dialog to input the threshold value
  // or navigate to another page for parameterization
}
}
