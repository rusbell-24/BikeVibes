import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cuentaGuard } from './cuenta.guard';

describe('cuentaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cuentaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
