import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	toasts: Toast[] = [];
	delay = 6000;

	constructor(private messageService: MessageService) {}

	subject = new BehaviorSubject<Toast[]>(null!);
	toasts$ = this.subject.asObservable();

	add(toast: Toast) {
		this.toasts = [toast, ...this.toasts];
		this.subject.next(this.toasts);

		setTimeout(() => {
			this.toasts = this.toasts.filter((v) => v !== toast);
			this.subject.next(this.toasts);
		}, this.delay);
	}

	remove(index: number) {
		this.toasts = this.toasts.filter((toast, i) => i !== index);
		this.subject.next(this.toasts);
	}

	showSuccess(title: string, message: string) {
		this.add({
			type: ToastType.success,
			title: title,
			message: message,
		});
	}

	showError(title: string, message: string) {
		this.add({
			type: ToastType.error,
			title: title,
			message: message,
		});
	}

	showWarning(title: string, message: string) {
		this.add({
			type: ToastType.warning,
			title: title,
			message: message,
		});
	}

	ShowToast() {
		this.messageService.add({
			severity: 'success',
			summary: 'Success',
			detail: 'Successfully show toast!',
		});
	}
}

export interface Toast {
	type: string;
	title: string;
	message: string;
}

export enum ToastType {
	success = 'success',
	error = 'error',
	info = 'info',
	warning = 'warning',
}
