import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { TableauComponent } from './tableau/tableau.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListKpiComponent } from './list-kpi/list-kpi.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SeuilUpdateComponent } from './seuil-update/seuil-update.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SeuilComponent } from './seuil/seuil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableauComponent,
    FormulaireComponent,
    ListKpiComponent,
    SeuilUpdateComponent,
    SeuilComponent,
    //HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     MatSlideToggleModule,
    BrowserAnimationsModule,
    HeaderComponent,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    //FormulaireComponent,
    MatFormFieldModule,
    MatInputModule, 
    MatSelectModule,
    //FormBuilder,
    //FormGroup,
    //Validators,
    ReactiveFormsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    TableModule, // Import the TableModule
    InputTextModule,
  ],
  exports: [ MatButtonModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
  
}
