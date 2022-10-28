import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamedetailComponent } from './gamedetail.component';

describe('GamedetailComponent', () => {
  let component: GamedetailComponent;
  let fixture: ComponentFixture<GamedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamedetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
