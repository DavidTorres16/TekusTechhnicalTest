import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { firstValueFrom} from 'rxjs';


@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent {

  user: string = '';
  password: string = '';


  public form: FormGroup = new FormGroup(
    {
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }
  )
  constructor( 
    private authService: AuthService,
    private rout: Router
  ) {}
  
  async login(): Promise<void> {
    const {user, password} = this.form.value
    try {
      const token: any = await firstValueFrom(this.authService.getToken(user, password))
    
      if (token.Status == 1) {
        this.rout.navigate(['/main']);
        localStorage.setItem('token', token.Token);
        console.log('Token de sesión:', token);
      } else {
        console.log('Inicio de sesión fallido');
      }
      console.log('Token de sesión:', token);
    } catch (error) {
      console.error(error);
    }
  }
}

