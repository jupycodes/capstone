import { TestBed } from '@angular/core/testing';

import { ClassTypeService } from './class-type.service';

describe('ClassTypeService', () => {
  let service: ClassTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
