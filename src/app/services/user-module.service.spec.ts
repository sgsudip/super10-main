import { TestBed } from '@angular/core/testing';

import { UserModuleService } from './user-module.service';

describe('UserModuleService', () => {
  let service: UserModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
