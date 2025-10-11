import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../../shared/animate-on-scroll.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, AnimateOnScrollDirective],
  templateUrl: './register.component.html'
})
export class RegisterComponent { }
