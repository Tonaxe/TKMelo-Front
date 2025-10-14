import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <main class="app-shell">
      <router-outlet />
    </main>
    <app-footer />
  `
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    const tree = this.router.parseUrl(this.router.url);
    const token = tree.queryParams['token'];
    const sent  = tree.queryParams['sent'];

    if (token) {
      this.router.navigate(['/verificar-correo'], {
        queryParams: { token },
        replaceUrl: true
      });
      return;
    }

    if (sent) {
      this.router.navigate(['/verificar-correo'], {
        queryParams: { sent },
        replaceUrl: true
      });
    }
  }
}
