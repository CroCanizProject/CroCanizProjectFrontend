import { TestBed } from '@angular/core/testing';

import { GeneralIService } from './general-i.service';

describe('GeneralIService', () => {
  let service: GeneralIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
