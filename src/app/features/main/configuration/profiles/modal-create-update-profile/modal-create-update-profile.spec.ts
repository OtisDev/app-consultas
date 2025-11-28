import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateUpdateProfile } from './modal-create-update-profile';

describe('ModalCreateUpdateProfile', () => {
  let component: ModalCreateUpdateProfile;
  let fixture: ComponentFixture<ModalCreateUpdateProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateUpdateProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateUpdateProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
