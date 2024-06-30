import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  selector: 'ng-mf-admin-entry',
  template: `<router-outlet></router-outlet>`,
})
export class RemoteEntryComponent {}
