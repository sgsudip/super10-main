import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotioninfoComponent } from './promotioninfo.component';

describe('PromotioninfoComponent', () => {
  let component: PromotioninfoComponent;
  let fixture: ComponentFixture<PromotioninfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotioninfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotioninfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
