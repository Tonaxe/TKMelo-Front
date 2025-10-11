import { Component } from '@angular/core';
import { UploadBoxComponent } from '../../shared/upload-box/upload-box.component';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';

@Component({
  selector: 'app-reply-from-image',
  standalone: true,
  imports: [UploadBoxComponent, AnimateOnScrollDirective],
  templateUrl: './reply-from-image.component.html',
  styleUrl: './reply-from-image.component.scss'
})
export class ReplyFromImageComponent { }
