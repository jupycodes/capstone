import { TestBed } from '@angular/core/testing';

import { ClassRegService } from './class-reg.service';

describe('ClassRegService', () => {
  let service: ClassRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
