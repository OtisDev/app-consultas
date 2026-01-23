import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsLoader } from './abs-loader';

describe('AbsLoader', () => {
  let component: AbsLoader;
  let fixture: ComponentFixture<AbsLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
