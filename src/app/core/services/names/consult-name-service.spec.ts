import { TestBed } from '@angular/core/testing';

import { ConsultNameService } from './consult-name-service';

describe('ConsultName', () => {
  let service: ConsultNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
