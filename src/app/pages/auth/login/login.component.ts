import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../../shared/animate-on-scroll.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, AnimateOnScrollDirective],
  templateUrl: './login.component.html'
})
export class LoginComponent { }
