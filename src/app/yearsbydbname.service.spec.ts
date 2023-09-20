import { TestBed } from '@angular/core/testing';

import { YearsbydbnameService } from './yearsbydbname.service';

describe('YearsbydbnameService', () => {
  let service: YearsbydbnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearsbydbnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
