import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuilComponent } from './seuil.component';

describe('SeuilComponent', () => {
  let component: SeuilComponent;
  let fixture: ComponentFixture<SeuilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeuilComponent]
    });
    fixture = TestBed.createComponent(SeuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
