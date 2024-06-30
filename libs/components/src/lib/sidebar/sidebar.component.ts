import { Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
import { SharedService } from '@todo/services';
import { SidebarModule } from 'primeng/sidebar';

@Component({
	selector: 'lib-sidebar',
	standalone: true,
	imports: [CommonModule, SidebarModule, ButtonModule, MenuModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
	isVisible!: boolean;
	items: MenuItem[] | undefined;

	constructor(private readonly sharedService: SharedService, private readonly router: Router) {}

	ngOnInit(): void {
		this.visibilityAfterChanged();
		this.menuItemInit();
	}

	visibilityAfterChanged(): void {
		this.sharedService.currentVisibility.subscribe({
			next: (isVisible) => {
				this.isVisible = isVisible;
			},
		});
	}

	menuItemInit(): MenuItem[] {
		return (this.items = [
			{
				label: 'Dashboard',
				items: [
					{
						label: 'Charts',
						icon: 'pi pi-chart-scatter',
						command: () => {
							this.router.navigate(['/charts']);
						},
					},
				],
			},
			{
				label: 'Todo',
				items: [
					{
						label: 'Create a new Task',
						icon: 'pi pi-plus-circle',
						command: () => {
							this.router.navigate(['/admin/todo-forms']);
						},
					},
					{
						label: 'Todo List',
						icon: 'pi pi-list-check',
						command: () => {
							this.router.navigate(['/admin/todo']);
						},
					},
				],
			},
		]);
	}
}
