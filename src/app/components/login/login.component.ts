import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environmets/enviroment';
import { AuthService } from '../../services/auth.service';
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

  constructor(private as: AuthService) {}

  async login() {
    try {
      let resp = await this.as.loginWithUsernameAndPassword(
        this.username,
        this.password
      );
      // TODO: Redirect
      console.log(resp);
    } catch (error) {
      console.log('error', error);
    }
  }
}
