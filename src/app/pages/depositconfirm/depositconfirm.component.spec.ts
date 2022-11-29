import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositconfirmComponent } from './depositconfirm.component';

describe('DepositconfirmComponent', () => {
  let component: DepositconfirmComponent;
  let fixture: ComponentFixture<DepositconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
