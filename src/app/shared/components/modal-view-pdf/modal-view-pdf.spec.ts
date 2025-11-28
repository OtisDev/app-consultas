import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewPdf } from './modal-view-pdf';

describe('ModalViewPdf', () => {
  let component: ModalViewPdf;
  let fixture: ComponentFixture<ModalViewPdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalViewPdf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewPdf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
