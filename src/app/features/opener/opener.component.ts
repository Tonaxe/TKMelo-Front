import { Component } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';

@Component({
  selector: 'app-opener',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './opener.component.html',
  styleUrl: './opener.component.scss'
})
export class OpenerComponent { }
