import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAdmin } from './filtro-admin';

describe('FiltroAdmin', () => {
  let component: FiltroAdmin;
  let fixture: ComponentFixture<FiltroAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
