import { TestBed } from '@angular/core/testing';

import { AreaServices } from './area-services';

describe('AreaServices', () => {
  let service: AreaServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
