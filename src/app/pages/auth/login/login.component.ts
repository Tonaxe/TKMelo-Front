import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../../shared/animate-on-scroll.directive';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, AnimateOnScrollDirective],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb  = inject(FormBuilder);
  private svc = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error   = '';

  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.invalid || this.loading) return;
    this.loading = true; this.error = '';
    const { email, password } = this.form.getRawValue();

    this.svc.login({ email: email!, password: password! }).subscribe({
      next: () => { this.loading = false; this.router.navigateByUrl('/dashboard'); },
      error: e => { this.loading = false; this.error = e?.error?.error ?? 'Credenciales inválidas'; }
    });
  }
}