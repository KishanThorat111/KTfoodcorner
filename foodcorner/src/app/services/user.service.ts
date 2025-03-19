// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { IUserLogin } from '../shared/interfaces/IUserLogin';
// import { HttpClient } from '@angular/common/http';
// import { USER_LOGIN_URL } from '../shared/constants/url';
// import { ToastrService } from 'ngx-toastr';
// import { User } from '../shared/model/Users';
// import { Router } from '@angular/router';

// const USER_KEY = 'User'
// @Injectable({
//   providedIn: 'root'
// })

// export class UserService {

//   private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
//   public userObservable: Observable<User>;

//   constructor(
//     private http: HttpClient, 
//     private toastrService: ToastrService,
//     private router: Router
//   ) { 
//     this.userObservable = this.userSubject.asObservable();
//   }

//   login(userLogin: IUserLogin): Observable<User> {
//     return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
//       tap({
//         next: (user) => {
//           this.setUserToLocalStorage(user);
//           this.userSubject.next(user);
//           this.toastrService.success(`Welcome to KT Foodcorner ${user.name}!`, 'Login Successful!');
//         },
//         error: (errorResponse) => {
//           this.toastrService.error(errorResponse.error, 'Login Failed!');
//         }
//       })
//     );
//   }

//   logout(): void {
//     this.userSubject.next(new User());
//     localStorage.removeItem(USER_KEY);
//     this.router.navigate(['/login']);
//   }

//   private setUserToLocalStorage(user: User): void {
//     localStorage.setItem(USER_KEY, JSON.stringify(user));
//   }

//   private getUserFromLocalStorage(): User {
//     try {
//       const userJson = localStorage.getItem(USER_KEY);
//       return userJson ? JSON.parse(userJson) as User : new User();
//     } catch (error) {
//       console.error('Error parsing user data from localStorage', error);
//       return new User();
//     }
//   }
// }




// export class UserService {

//   private userSubject = new BehaviorSubject<User>(this.getUserToLocalStorage());
//   public userObservable:Observable<User>

//   constructor(private http:HttpClient, private toastrService:ToastrService) { 
//     this.userObservable = this.userSubject.asObservable();
//   }

//   login(userLogin:IUserLogin):Observable<User>{
//     return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(tap({
//       next: (user) => {
//         this.setUserToLocalStorage(user)
//         this.toastrService.success(`Welcome to KT Foodcorner ${user.name}!`, 'Login Successful !');
//       },
//       error: (errorResponse) => {
//         this.toastrService.error(errorResponse.error, 'Login Failed!');
//       }
//     }));
//   }
//   logout(){
//     this.userSubject.next(new User());
//     localStorage.removeItem(USER_KEY);
//     window.location.reload();
//   }
//   private setUserToLocalStorage(user:User){
//     localStorage.setItem(USER_KEY,JSON.stringify(user));
//   }
//   private getUserToLocalStorage():User{
//     const userjason = localStorage.getItem(USER_KEY);
//     if(userjason)
//     return JSON.parse(userjason) as User;
//   return new User();
//   }
// }


import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/url';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/model/Users';
import { Router } from '@angular/router';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(new User());
  public userObservable: Observable<User>;

  constructor(
    private http: HttpClient, 
    private toastrService: ToastrService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object // Inject PLATFORM_ID to detect environment
  ) { 
    if (isPlatformBrowser(this.platformId)) {
      const user = this.getUserFromLocalStorage();
      this.userSubject.next(user);
    }
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          if (isPlatformBrowser(this.platformId)) {
            this.setUserToLocalStorage(user);
          }
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to KT Foodcorner ${user.name}!`, 'Login Successful!');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed!');
        }
      })
    );
  }

  logout(): void {
    this.userSubject.next(new User());
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(USER_KEY);
    }
    this.router.navigate(['/login']);
  }

  private setUserToLocalStorage(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  private getUserFromLocalStorage(): User {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const userJson = localStorage.getItem(USER_KEY);
        return userJson ? JSON.parse(userJson) as User : new User();
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        return new User();
      }
    }
    return new User();
  }
}
