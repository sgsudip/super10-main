import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotioncardComponent } from './promotioncard.component';

describe('PromotioncardComponent', () => {
  let component: PromotioncardComponent;
  let fixture: ComponentFixture<PromotioncardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotioncardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotioncardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
