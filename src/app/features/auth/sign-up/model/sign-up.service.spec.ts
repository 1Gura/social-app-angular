import { TestBed } from '@angular/core/testing';

import { SignUpValidationService } from './sign-up-validation.service';

describe('SignUpService', () => {
  let service: SignUpValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
