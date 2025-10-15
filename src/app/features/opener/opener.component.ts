import { Component } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';
import { Tone, ConversationService } from '../conversation.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-opener',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AnimateOnScrollDirective],
  templateUrl: './opener.component.html',
  styleUrl: './opener.component.scss'
})
export class OpenerComponent {
  tone: Tone = 'gracioso';
  context = '';
  ideas: string[] = [];
  loading = false;
  error = '';

  constructor(private api: ConversationService) {}

  generate() {
    this.loading = true;
    this.error = '';
    this.ideas = [];

    this.api.generate({ tone: this.tone, context: this.context, count: 3, language: 'es' })
      .subscribe({
        next: (res) => { this.ideas = res.openers; this.loading = false; },
        error: (err) => {
          if (err?.status === 429 || err?.status === 402) {
            this.error = 'Hemos superado el saldo del modelo. Inténtalo más tarde.';
          } else {
            this.error = 'No se pudo generar. Vuelve a intentarlo.';
          }
          this.loading = false;
        }
      });
  }

  copy(text: string) {
    navigator.clipboard?.writeText(text);
  }
}