import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDataComponent } from './courses-data.component';

describe('CoursesDataComponent', () => {
  let component: CoursesDataComponent;
  let fixture: ComponentFixture<CoursesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
