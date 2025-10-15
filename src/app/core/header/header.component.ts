import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';
import { AuthStore } from '../../pages/auth/auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private store = inject(AuthStore);
  private auth  = inject(AuthService);
  private router = inject(Router);
  private el = inject(ElementRef);

  auth$ = this.store.auth$;

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  async logout() {
    this.menuOpen = false;
    this.auth.logout().subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: () => { this.auth.clearLocal(); this.router.navigateByUrl('/login'); }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.el.nativeElement.contains(e.target)) this.menuOpen = false;
  }
}