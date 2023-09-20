import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuilUpdateComponent } from './seuil-update.component';

describe('SeuilUpdateComponent', () => {
  let component: SeuilUpdateComponent;
  let fixture: ComponentFixture<SeuilUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeuilUpdateComponent]
    });
    fixture = TestBed.createComponent(SeuilUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
