import { TestBed } from '@angular/core/testing';

import { MonthsbytablenameService } from './monthsbytablename.service';

describe('MonthsbytablenameService', () => {
  let service: MonthsbytablenameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthsbytablenameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
