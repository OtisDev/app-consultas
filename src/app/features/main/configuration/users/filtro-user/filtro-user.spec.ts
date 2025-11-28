import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroUser } from './filtro-user';

describe('FiltroUser', () => {
  let component: FiltroUser;
  let fixture: ComponentFixture<FiltroUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
