import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-first></app-first>
<app-second></app-second>
<app-third></app-third>`,

  styles: []
})
export class AppComponent {
  title = 'Modular';
}
