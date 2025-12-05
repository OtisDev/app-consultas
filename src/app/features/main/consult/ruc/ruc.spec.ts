import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ruc } from './ruc';

describe('Ruc', () => {
  let component: Ruc;
  let fixture: ComponentFixture<Ruc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ruc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ruc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
