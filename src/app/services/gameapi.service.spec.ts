import { TestBed } from '@angular/core/testing';

import { GameapiService } from './gameapi.service';

describe('GameapiService', () => {
  let service: GameapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
