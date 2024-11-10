import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Photo } from './photo.model';

@Component({
  selector: 'app-photos-frame',
  standalone: true,
  imports: [
    NgForOf,
  ],
  templateUrl: './photos-frame.component.html',
  styleUrl: './photos-frame.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosFrameComponent {
  photos: Photo[] = [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSMRe_dzBSJLBv468sGFIes2oVm4IgnwVQSQ&s',
      alt: 'Person on mountain',
      isWide: false,
      isTall: false,
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQq2iVNtY_F_85HjdoJ72SK7CmtjvIYSQrA&s',
      alt: 'Dog in nature', isWide: false,
      isTall: false,
    },
    {
      url: 'https://images.unsplash.com/photo-1521334884684-d80222895322',
      alt: 'Cat relaxing',
      isWide: false,
      isTall: false,
    },
    {
      url: 'https://media.istockphoto.com/id/1363411424/photo/smiling-young-man-playing-an-acoustic-guitar.jpg?s=612x612&w=0&k=20&c=N_caQ5y0CXdglRXYHeU8iaopiJSVo86qA_GM6F3e-V4=',
      alt: 'Person playing guitar', isWide: false,
      isTall: false,
    },
    {
      url: 'https://images.unsplash.com/photo-1544717305-996b815c338c',
      alt: 'Basketball hoop',
      isWide: false,
      isTall: false,
    },
    {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      alt: 'Tropical beach',
      isWide: false,
      isTall: false,
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyT0mrTvRdRrIY1zzJ0XnspQ_ifPf03v4sqg&s',
      alt: 'Person with skateboard', isWide: false,
      isTall: false,
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShp-P-xa8WJ3jVaADFoHLf39vWfVGul-RN2Q&s',
      alt: 'Build',
      isWide: false,
      isTall: false,
    },
    {
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      alt: 'Portrait of a woman',
      isWide: false,
      isTall: false,
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNIcQHl5DvEfdm9Vdu811_8mhT08nXPe-AOA&s',
      alt: 'Person cycling', isWide: false,
      isTall: false,
    },
    // добавьте еще фотографии по необходимости
  ];

  onImageLoad(photo: Photo, event: Event): void {
    const img = event.target as HTMLImageElement;
    const aspectRatio = img.naturalWidth / img.naturalHeight;

    // Определяем, что изображение "широкое", если его соотношение сторон больше 1.5
    photo.isWide = aspectRatio > 1.5;
    photo.isTall = aspectRatio < 0.75; // Условие для "высоких" изображений
  }
}
