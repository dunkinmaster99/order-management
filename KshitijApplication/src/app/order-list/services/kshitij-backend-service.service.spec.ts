import { TestBed } from '@angular/core/testing';

import { KshitijBackendServiceService } from './kshitij-backend-service.service';

describe('KshitijBackendServiceService', () => {
  let service: KshitijBackendServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KshitijBackendServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
