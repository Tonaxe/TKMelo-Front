import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';
import { AdSlotComponent } from '../../shared/ad-slot/ad-slot.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink, AnimateOnScrollDirective, AdSlotComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent { }
