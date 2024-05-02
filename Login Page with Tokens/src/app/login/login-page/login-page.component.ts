import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent 
{
  loginUserData = {email : '', password : ''};

  message :any;

  constructor(private _auth: AuthService,  private _router: Router) { }


  loginUser()
  {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        this.message = res
        console.log(this.message)
        localStorage.setItem('token', res.token)
        this._router.navigate(['/dashboard'])
      },
      err => console.log(err)
    )
  }

}

