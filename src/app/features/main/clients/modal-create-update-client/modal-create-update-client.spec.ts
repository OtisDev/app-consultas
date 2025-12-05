import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateUpdateClient } from './modal-create-update-client';

describe('ModalCreateUpdateClient', () => {
  let component: ModalCreateUpdateClient;
  let fixture: ComponentFixture<ModalCreateUpdateClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateUpdateClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateUpdateClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
