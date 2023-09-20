import { TestBed } from '@angular/core/testing';

import { TablenamesbymonthService } from './tablenamesbymonth.service';

describe('TablenamesbymonthService', () => {
  let service: TablenamesbymonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablenamesbymonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
