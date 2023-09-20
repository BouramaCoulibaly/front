import { TestBed } from '@angular/core/testing';

import { TableUniqueNamesService } from './table-unique-names.service';

describe('TableUniqueNamesService', () => {
  let service: TableUniqueNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableUniqueNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
