import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../domain/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  endpoint = 'https://jsonplaceholder.typicode.com'

  constructor(
    private readonly http: HttpClient,
  ) { }

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.endpoint}/todos`);
  }

  findById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.endpoint}/todos/${id}`)
  }

  create(body: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.endpoint}/todos`, body)
  }

  remove(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.endpoint}/todos/${id}`)
  }

  update(id: string, body: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.endpoint}/todos/${id}`, body)
  }
}
