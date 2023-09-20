import { TestBed } from '@angular/core/testing';

import { SeuilUpdateServiceService } from './seuil-update-service.service';

describe('SeuilUpdateServiceService', () => {
  let service: SeuilUpdateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeuilUpdateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
