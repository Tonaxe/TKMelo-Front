import { Component } from '@angular/core';
import { OpenerComponent } from '../../features/opener/opener.component';
import { ReplyFromImageComponent } from '../../features/reply-from-image/reply-from-image.component';
import { AdSlotComponent } from '../../shared/ad-slot/ad-slot.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [OpenerComponent, ReplyFromImageComponent, AdSlotComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent { }
