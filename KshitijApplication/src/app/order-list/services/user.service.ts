import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtRequest, Role, User } from 'src/app/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private router: Router, private httpClient: HttpClient) { }
  url: string = 'http://localhost:9000/';


  // login(user: User) {
  // return this.httpClient.post<User>(this.url +"user", user);
  // }

  getRoles(): Observable<any> {
    return this.httpClient.get(this.url + "getUserRoles")
  }

  register(user: User) {
    return this.httpClient.post(this.url + "createUser", user,
      {
        headers: this.requestHeader,
      }
    );
  }
  register1(user: any) {
    return this.httpClient.post(this.url + "registerNewUser", user,
      {
        headers: this.requestHeader,
      }
    );
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.url + "getAllUsers")
  }
  login(jwtRequest: JwtRequest) {
    return this.httpClient.post<any>(this.url + "authenticate", jwtRequest, {
      headers: this.requestHeader,
    });
  }
  getUserById(id: string) {
    return this.httpClient.get<any>(`${this.url}${'getUserById?userName='}${id}`);
  }
  getUserByRoleName(name: String) {
    return this.httpClient.get<any>(this.url + "getUserByRoleName/" + name)
  }
  deleteUser(id: number) {
    return this.httpClient.delete(this.url + "deleteUser/" + id);
  }
  // updateLoanByLoanNumber(loanNumber:number){
  // return this.httpClient.put<Loan>(this.url+"getLoanByLoanNumber/"+loanNumber,Loan);
  // }
  // updateAccountByAccountNumber(accountNumber:number){
  // return this.httpClient.put<Loan>(this.url+"getAccountByAccountNumber/"+accountNumber,Loan);
  // }

  public roleMatch(allowedRoles: string | any[]): any {
    let isMatch = false;
    const userRoles: Role[] = JSON.parse(localStorage.getItem('roles') || '{}');



    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          console.log(i + " " + j + " isndie");
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
      return isMatch;
    }
  }

}