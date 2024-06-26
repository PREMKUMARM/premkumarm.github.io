import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMinuteComponent } from './one-minute.component';

describe('OneMinuteComponent', () => {
  let component: OneMinuteComponent;
  let fixture: ComponentFixture<OneMinuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneMinuteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneMinuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
