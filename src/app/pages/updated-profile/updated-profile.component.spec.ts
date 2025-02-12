import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedProfileComponent } from './updated-profile.component';

describe('UpdatedProfileComponent', () => {
  let component: UpdatedProfileComponent;
  let fixture: ComponentFixture<UpdatedProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatedProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
