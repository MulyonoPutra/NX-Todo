import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedService } from '@todo/services';

@Component({
	selector: 'lib-navbar',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent {
	isVisible!: boolean;
	constructor(private sharedService: SharedService) {}

	toggleVisibility() {
		this.isVisible = !this.isVisible;
		this.sharedService.changeVisibility(this.isVisible);
	}
}
