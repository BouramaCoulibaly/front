import { Component } from '@angular/core';
import { SeuilUpdateService } from '../seuil-update-service.service';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent {
  titre="Formulaire De Configuration";
  //tableaubox="Choisissez Votre Configuration";
  conf="Afin de visualiser le tableau, veuillez assigner les différents paramètres au formulaire. Veuillez Cliquer sur le bouton ci-dessous pour remplir!";
 // showFormulaire: boolean = false;
  showFormulaire: boolean = false;
  /*filterCriteria: any;

  // Method to handle emitted filter criteria
  onFilterCriteriaSelected(filterCriteria: any) {
    this.filterCriteria = filterCriteria;
  }*/
  

  //constructor(private seuilUpdateService: SeuilUpdateService) {}

 /* onMouseEnterSeuil(element: any) {
    // Show the threshold update form when the mouse enters the "Seuil" column
    this.seuilUpdateService.showForm();
  }*/
  
}
