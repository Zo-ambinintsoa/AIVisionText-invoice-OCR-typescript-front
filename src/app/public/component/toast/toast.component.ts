import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  @Input() showToast = false;
  @Input() title = 'Notification';
  @Input() message = '';

  hideToast() {
    this.showToast = false;
  }
}
