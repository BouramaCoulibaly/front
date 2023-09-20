import { TestBed } from '@angular/core/testing';

import { TablenamesbyyearService } from './tablenamesbyyear.service';

describe('TablenamesbyyearService', () => {
  let service: TablenamesbyyearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablenamesbyyearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
