import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStandard } from './home-standard';

describe('HomeStandard', () => {
  let component: HomeStandard;
  let fixture: ComponentFixture<HomeStandard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeStandard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeStandard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
