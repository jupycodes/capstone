import { TestBed } from '@angular/core/testing';

import { CartOptionServiceService } from './cart-option-service.service';

describe('CartOptionServiceService', () => {
  let service: CartOptionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartOptionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
