import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService 
{
  private _SignupURL = "http://localhost:6500/api/Insertsignupdata"; 
  private _DashboardURL = "http://localhost:6500/api/DashBoard";

  constructor(private _http : HttpClient)
  {

  }

  SignupDataInsert(Data : any)
  {
    console.log(Data);
    return this._http.post(this._SignupURL, Data);
  }

  GetDashBoardData()
  {
    return this._http.get<any>(this._DashboardURL)
  }
}
