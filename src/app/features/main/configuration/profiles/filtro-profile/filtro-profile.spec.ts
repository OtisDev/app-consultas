import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroProfile } from './filtro-profile';

describe('FiltroProfile', () => {
  let component: FiltroProfile;
  let fixture: ComponentFixture<FiltroProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
