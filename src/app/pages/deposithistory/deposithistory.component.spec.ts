import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeposithistoryComponent } from './deposithistory.component';

describe('DeposithistoryComponent', () => {
  let component: DeposithistoryComponent;
  let fixture: ComponentFixture<DeposithistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeposithistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeposithistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
