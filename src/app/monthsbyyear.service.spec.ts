import { TestBed } from '@angular/core/testing';

import { MonthsbyyearService } from './monthsbyyear.service';

describe('MonthsbyyearService', () => {
  let service: MonthsbyyearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthsbyyearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
