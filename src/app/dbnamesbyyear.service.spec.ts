import { TestBed } from '@angular/core/testing';

import { DbnamesbyyearService } from './dbnamesbyyear.service';

describe('DbnamesbyyearService', () => {
  let service: DbnamesbyyearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbnamesbyyearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
