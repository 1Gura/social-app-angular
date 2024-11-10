import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosFrameComponent } from './photos-frame.component';

describe('PhotosFrameComponent', () => {
  let component: PhotosFrameComponent;
  let fixture: ComponentFixture<PhotosFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosFrameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotosFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
