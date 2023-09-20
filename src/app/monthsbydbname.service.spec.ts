import { TestBed } from '@angular/core/testing';

import { MonthsbydbnameService } from './monthsbydbname.service';

describe('MonthsbydbnameService', () => {
  let service: MonthsbydbnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthsbydbnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
