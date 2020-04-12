import { TestBed } from '@angular/core/testing';

import { StackexchangeService } from './stackexchange.service';

describe('StackexchangeService', () => {
  let service: StackexchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackexchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
