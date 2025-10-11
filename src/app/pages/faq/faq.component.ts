import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const toggles = document.querySelectorAll<HTMLButtonElement>('.faq-toggle');
    toggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('aria-controls');
        if (!id) return;
        const panel = document.getElementById(id);
        if (!panel) return;

        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        if (isOpen) panel.setAttribute('hidden', '');
        else panel.removeAttribute('hidden');
      });
    });
    const filterButtons = document.querySelectorAll<HTMLButtonElement>('.faq__filters button');
    const items = document.querySelectorAll<HTMLElement>('.faq-item');

    const applyFilter = (filter: string) => {
      items.forEach(it => {
        const c = it.getAttribute('data-category') ?? '';
        const show = filter === 'all' || c === filter;
        it.style.display = show ? '' : 'none';
      });
    };

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const f = btn.getAttribute('data-filter') ?? 'all';
        applyFilter(f);
      });
    });

    applyFilter('all');
  }
}