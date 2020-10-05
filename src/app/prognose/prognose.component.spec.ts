import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrognoseComponent } from './prognose.component';

describe('PrognoseComponent', () => {
  let component: PrognoseComponent;
  let fixture: ComponentFixture<PrognoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrognoseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrognoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
