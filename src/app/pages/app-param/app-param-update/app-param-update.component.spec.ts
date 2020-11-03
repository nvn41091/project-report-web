import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppParamUpdateComponent } from './app-param-update.component';

describe('AppParamUpdateComponent', () => {
  let component: AppParamUpdateComponent;
  let fixture: ComponentFixture<AppParamUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppParamUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppParamUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
