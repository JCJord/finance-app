import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectUserName } from '../store/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUserName).pipe(
      take(1), // Take only the first emission to avoid subscribing indefinitely
      map((userName) => {
        if (userName) {
          // If the user name exists, allow access to the route
          return true;
        } else {
          // If the user is not authenticated, redirect to the login page
          this.router.navigate(['/login']); // Adjust the route as needed
          return false;
        }
      })
    );
  }
}