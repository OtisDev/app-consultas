import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRuc } from './filtro-ruc';

describe('FiltroRuc', () => {
  let component: FiltroRuc;
  let fixture: ComponentFixture<FiltroRuc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroRuc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroRuc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
