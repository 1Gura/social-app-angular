import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifictaionComponent } from './notifictaion.component';

describe('NotifictaionComponent', () => {
  let component: NotifictaionComponent;
  let fixture: ComponentFixture<NotifictaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifictaionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifictaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
