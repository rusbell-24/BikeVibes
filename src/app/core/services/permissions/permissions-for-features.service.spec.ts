import { TestBed } from '@angular/core/testing';

import { PermissionsForFeaturesService } from './permissions-for-features.service';

describe('PermissionsForFeaturesService', () => {
  let service: PermissionsForFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionsForFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
