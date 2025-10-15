import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadBoxComponent } from '../../shared/upload-box/upload-box.component';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';
import { ConversationService, Tone } from '../conversation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reply-from-image',
  standalone: true,
  imports: [CommonModule, FormsModule, UploadBoxComponent, AnimateOnScrollDirective],
  templateUrl: './reply-from-image.component.html',
  styleUrl: './reply-from-image.component.scss'
})
export class ReplyFromImageComponent {
  file?: File;
  previewUrl: string | null = null;

  readonly language = 'es';
  readonly count = 1;

  tone: Tone = 'gracioso';
  loading = false;
  error = '';
  bestReply = '';

  constructor(private api: ConversationService) { }

  onFile(file: File) {
    this.file = file;
    const r = new FileReader();
    r.onload = () => (this.previewUrl = r.result as string);
    r.readAsDataURL(file);
  }

  analyze() {
    if (!this.file) { this.error = 'Sube una imagen primero.'; return; }
    this.loading = true; this.error = ''; this.bestReply = '';
    this.api.replyFromImage(this.file, { tone: this.tone, language: 'es', count: 1 })
      .subscribe({
        next: (reply: string) => { this.bestReply = reply ?? ''; this.loading = false; },
        error: (err: HttpErrorResponse) => {
          this.error = (err.status === 429 || err.status === 402)
            ? 'Sin saldo en el modelo. Inténtalo más tarde.'
            : 'No se pudo procesar la imagen.';
          this.loading = false;
        }
      });
  }

  copy(t: string) { navigator.clipboard?.writeText(t); }
}