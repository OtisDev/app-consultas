import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterClient } from './filter-client';

describe('FilterClient', () => {
  let component: FilterClient;
  let fixture: ComponentFixture<FilterClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
