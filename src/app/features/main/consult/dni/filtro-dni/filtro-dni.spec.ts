import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroDni } from './filtro-dni';

describe('FiltroDni', () => {
  let component: FiltroDni;
  let fixture: ComponentFixture<FiltroDni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroDni]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroDni);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
