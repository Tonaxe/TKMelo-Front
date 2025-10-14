import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AnimateOnScrollDirective } from '../../../shared/animate-on-scroll.directive';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterLink, AnimateOnScrollDirective],
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth  = inject(AuthService);

  status: 'idle' | 'loading' | 'ok' | 'error' = 'idle';
  message = '';

  ngOnInit() {
    const qp = this.route.snapshot.queryParamMap;
    const token = qp.get('token');
    const sent  = qp.get('sent');

    if (token) {
      this.status = 'loading';
      this.auth.verifyEmail(token).subscribe({
        next: () => {
          this.status = 'ok';
          this.message = '¡Email verificado correctamente! Ya puedes iniciar sesión.';
          setTimeout(() => this.router.navigateByUrl('/login'), 2500);
        },
        error: (e) => {
          this.status = 'error';
          this.message = e?.error?.error ?? 'Enlace inválido o caducado.';
        }
      });
      return;
    }
    
    this.status = 'idle';
    this.message = sent
      ? 'Te hemos enviado un correo para verificar tu cuenta.'
      : 'Abre el enlace de verificación que te enviamos por correo.';
  }
}