import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModules } from './manage-modules';

describe('ManageModules', () => {
  let component: ManageModules;
  let fixture: ComponentFixture<ManageModules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageModules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageModules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
