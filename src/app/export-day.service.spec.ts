import { TestBed } from '@angular/core/testing';

import { ExportDayService } from './export-day.service';

describe('ExportDayService', () => {
  let service: ExportDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
