import { TestBed } from '@angular/core/testing';

import { YearsbytablenameService } from './yearsbytablename.service';

describe('YearsbytablenameService', () => {
  let service: YearsbytablenameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearsbytablenameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
