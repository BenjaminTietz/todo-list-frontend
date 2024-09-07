import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environmets/enviroment';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  token: string = '';

  constructor(private as: AuthService, private router: Router) {}

  async login() {
    try {
      let resp: any = await this.as.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      const token = resp.token;
      localStorage.setItem('token', token);
      console.log(resp);
      this.router.navigateByUrl('/todos');
    } catch (error) {
      console.log('error', error);
    }
  }
}
