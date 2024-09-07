import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environmets/enviroment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss',
})
export class AllTodosComponent implements OnInit {
  todos: any = [];
  error = '';
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    try {
      this.todos = await this.loadTodos();
      console.log(this.todos);
    } catch (error) {
      this.error = 'Error loading todos';
      console.error(error);
    }
  }

  loadTodos() {
    const url = environment.baseUrl + '/todos/';
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      'Token ' + localStorage.getItem('token')
    );
    return lastValueFrom(this.http.get(url, { headers: headers }));
  }
}
