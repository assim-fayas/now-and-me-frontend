import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { expertGuard } from './expert.guard';

describe('expertGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => expertGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
