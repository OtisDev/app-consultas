import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateUpdateUser } from './modal-create-update-user';

describe('ModalCreateUpdateUser', () => {
  let component: ModalCreateUpdateUser;
  let fixture: ComponentFixture<ModalCreateUpdateUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateUpdateUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateUpdateUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
