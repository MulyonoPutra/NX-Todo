import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ToastService, ValidationService } from '@todo/services';
import { take, timer } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormFieldComponent } from '@todo/components';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Todo } from '../../core/domain/todo';
import { TodoService } from '../../core/services/todo.service';

@Component({
	selector: 'ng-mf-todo-forms',
	standalone: true,
	imports: [
		CommonModule,
		HttpClientModule,
		ButtonModule,
		ToastModule,
		CardModule,
		FormFieldComponent,
		FormsModule,
		ReactiveFormsModule,
	],
	templateUrl: './todo-forms.component.html',
	styleUrl: './todo-forms.component.scss',
	providers: [TodoService, ToastService, MessageService],
})
export class TodoFormsComponent implements OnInit {
	form!: FormGroup;
	routeId!: string;
	label!: string;

	headerTitle!: string;

	isLoading = false;

	constructor(
		private readonly fb: FormBuilder,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly validations: ValidationService,
		private readonly todoService: TodoService,
		private readonly location: Location,
		private readonly messageService: MessageService
	) {
		this.routeId = this.route.snapshot.paramMap.get('id')!;
	}

	ngOnInit(): void {
		this.formInitialized();
		this.initPageFromRouteId();
	}

	initPageFromRouteId(): void {
		this.label = this.routeId ? 'Update' : 'Create';
		this.headerTitle = `${this.label} Task`;
		if (this.routeId) {
			this.findOne();
		}
	}

	get submitButtonLabel(): string {
		return this.label;
	}

	get cancelButtonLabel(): string {
		return 'Cancel';
	}

	findOne(): void {
		this.todoService.findById(this.routeId).subscribe({
			next: (todo: Todo) => {
				this.prepopulateForm(todo);
			},
			error: (error: HttpErrorResponse) => {
				this.toastError(error.message);
			},
		});
	}

	formInitialized(): void {
		this.form = this.fb.group({
			userId: ['', Validators.required],
			id: ['', Validators.required],
			title: ['', Validators.required],
			completed: ['', Validators.required],
		});
	}

	get formCtrlValue(): Todo {
		return {
			userId: this.form.get('userId')?.value,
			id: this.form.get('id')?.value,
			title: this.form.get('title')?.value,
			completed: this.form.get('completed')?.value,
		};
	}

	prepopulateForm(todo: Todo): void {
		this.form.patchValue({
			userId: todo.userId,
			id: todo.id,
			title: todo.title,
			completed: todo.completed,
		});
	}

	getFormControl(form: string): FormControl | AbstractControl {
		return this.form.get(form) as FormControl;
	}

	goBack(): void {
		this.location.back();
	}

	toastSuccess() {
		this.messageService.add({
			severity: 'success',
			summary: 'Success',
			detail: 'Successfully Created!',
		});
	}

	toastError(error: string): void {
		this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
	}

	onUpdate(): void {
		this.todoService.update(this.routeId, this.formCtrlValue).subscribe({
			next: () => {
				this.isLoading = false;
				this.toastSuccess();
			},
			error: (error: HttpErrorResponse) => {
				this.toastError(error.message);
			},
			complete: () => this.navigateAfterSucceed(),
		});
	}

	onCreate(): void {
		this.todoService.create(this.formCtrlValue).subscribe({
			next: () => {
				this.isLoading = false;
				this.toastSuccess();
			},
			error: (error: HttpErrorResponse) => {
				this.toastError(error.message);
			},
			complete: () => this.navigateAfterSucceed(),
		});
	}

	navigateAfterSucceed(): void {
		timer(1000)
			.pipe(take(1))
			.subscribe(() => this.router.navigateByUrl('/admin/todo'));
	}

	onSubmit(): void {
		this.isLoading = true;
		if (this.form.valid) {
			this.routeId ? this.onUpdate() : this.onCreate();
		} else {
			this.validations.markAllFormControlsAsTouched(this.form);
		}
	}
}
