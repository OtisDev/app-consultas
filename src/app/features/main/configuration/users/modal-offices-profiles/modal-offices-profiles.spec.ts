import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOfficesProfiles } from './modal-offices-profiles';

describe('ModalOfficesProfiles', () => {
  let component: ModalOfficesProfiles;
  let fixture: ComponentFixture<ModalOfficesProfiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOfficesProfiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOfficesProfiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
