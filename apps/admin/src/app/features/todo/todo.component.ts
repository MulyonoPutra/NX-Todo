import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Subject, take, takeUntil, timer } from 'rxjs';

import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Todo } from '../../core/domain/todo';
import { TodoService } from '../../core/services/todo.service';

@Component({
  selector: 'ng-mf-todo',
  standalone: true,
  imports: [CommonModule, TableModule, HttpClientModule, CardModule, ToastModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  providers: [TodoService, MessageService]
})
export class TodoComponent implements OnInit, OnDestroy {

  todos!: Todo[];
  private destroyed = new Subject();

  columns = ['User Id', 'id', 'Title', 'Completed', 'Actions'];

  constructor(
    private readonly router: Router,
    private readonly todoService: TodoService,
    private readonly messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.todoService
      .findAll()
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (response) => {
          this.todos = response;
        },
        error: (error: HttpErrorResponse) => {
          this.toastError(error.message)
        },
      });
  }

  onRemove(id: string): void {
    this.todoService
      .remove(id)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: () => {
          this.toastSuccess();
        },
        error: (error: HttpErrorResponse) => {
          this.toastError(error.message)
        },
        complete: () => {
          this.navigateAfterSucceed();
        },
      });
  }

  onUpdate(id: string): void {
    this.router.navigateByUrl(`/admin/todo-update/${id}`);
  }

  navigateAfterSucceed(): void {
    timer(1000)
      .pipe(take(1))
      .subscribe(() =>
        this.router.navigateByUrl('/admin/todo').then(() => window.location.reload())
      );
  }

  toastSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Removed!' });
  }

  toastError(error: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}
