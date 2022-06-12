import { TestBed } from '@angular/core/testing';

import { FilterDateService } from './filter-date.service';

describe('FilterDateService', () => {
  let service: FilterDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
