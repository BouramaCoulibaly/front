import { TestBed } from '@angular/core/testing';

import { DbNameService } from './db-name.service';

describe('DbNameService', () => {
  let service: DbNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
