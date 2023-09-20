import { TestBed } from '@angular/core/testing';

import { DbnamesbymonthService } from './dbnamesbymonth.service';

describe('DbnamesbymonthService', () => {
  let service: DbnamesbymonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbnamesbymonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
