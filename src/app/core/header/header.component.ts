import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';
import { AuthStore } from '../../pages/auth/auth.store';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private store = inject(AuthStore);
  private auth = inject(AuthService);
  private router = inject(Router);
  private el = inject(ElementRef);

  auth$ = this.store.auth$;

  isAppHeader = false;
  private isAuthenticated = false;
  private readonly appPrefixes = ['/dashboard', '/perfil', '/historial', '/app'];

  constructor() {
    this.auth$.subscribe(a => { this.isAuthenticated = !!a?.accessToken; this.updateHeaderMode(); });
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.updateHeaderMode());
    this.updateHeaderMode();
  }

  private updateHeaderMode() {
    const url = this.router.url || '/';
    const inAppRoute = this.appPrefixes.some(p => url.startsWith(p));
    this.isAppHeader = this.isAuthenticated && inAppRoute;
  }

  async logout() {
    
    this.auth.logout().subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: () => { this.auth.clearLocal(); this.router.navigateByUrl('/login'); }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.el.nativeElement.contains(e.target)) { }
  }
}