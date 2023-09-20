import { TestBed } from '@angular/core/testing';

import { YearsbymonthService } from './yearsbymonth.service';

describe('YearsbymonthService', () => {
  let service: YearsbymonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearsbymonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
