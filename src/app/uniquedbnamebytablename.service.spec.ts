import { TestBed } from '@angular/core/testing';

import { UniquedbnamebytablenameService } from './uniquedbnamebytablename.service';

describe('UniquedbnamebytablenameService', () => {
  let service: UniquedbnamebytablenameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniquedbnamebytablenameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
