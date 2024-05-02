import { Component } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms';
import { OnInit } from '@angular/core';
import { ApiService } from '../../sharedata/api.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent implements OnInit
{

  signupForm!: FormGroup

  public Data : any ;

   constructor(private _fbObj : FormBuilder,private _api : ApiService, private _router : Router )
   {

   }

  ngOnInit(): void
  {
    this.signupForm = this._fbObj.group
    (
      {
        email : [''],
        name : [''],
        phonenumber : [''],
        password : [''],
      }
     )
  }
   
  SignUpData() 
  {
    console.log(this.signupForm.value);
      this._api.SignupDataInsert(this.signupForm.value).subscribe(res=>{
        console.log(res);
        alert('Signup Successfully');
        this.signupForm.reset();
        this._router.navigate(['/login']);
      }), (err: any)=>{
        console.log(err);
        alert('Signup Error');
      }  
  }
}
