import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../../shared/animate-on-scroll.directive';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, AnimateOnScrollDirective],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb  = inject(FormBuilder);
  private svc = inject(AuthService);
  private router = inject(Router)

  loading = false; ok = false; error = '';

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.invalid || this.loading) return;
    this.loading = true; this.error = ''; this.ok = false;
    const { fullName, email, password } = this.form.getRawValue();

    this.svc.register({ fullName: fullName!, email: email!, password: password! }).subscribe({
      next: () => { this.loading = false; this.ok = true; this.router.navigate(['/verificar-correo'], { queryParams: { sent: 1 } }); },
      error: e => { this.loading = false; this.error = e?.error?.error ?? 'No se pudo crear la cuenta'; }
    });
  }
}