import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importez ces modules
import { SeuilUpdateService } from '../seuil-update-service.service'; // Importez le service pour gérer l'affichage du formulaire

@Component({
  selector: 'app-seuil-update',
  templateUrl: './seuil-update.component.html',
  styleUrls: ['./seuil-update.component.css']
})
export class SeuilUpdateComponent implements OnInit {
  seuilForm: any = {}; // Form model
  //seuilForm: FormGroup;

  constructor(private fb: FormBuilder, private seuilUpdateService: SeuilUpdateService) {
    this.seuilForm = this.fb.group({
      DB: ['', Validators.required],
      TB: ['', Validators.required],
      idFichier: ['', Validators.required],
      valeur: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {
    const formValues = this.seuilForm;
    
    // Add your logic to update the threshold value based on formValues
    
    // Hide the form after submission
    this.seuilUpdateService.hideForm();
    
  }
}
