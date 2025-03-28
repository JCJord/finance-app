import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { AuthState } from '../store/auth.reducer';
import { selectUserName } from '../store/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class PreventHomePageGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(selectUserName),
      take(1),
      map((username) => {
        if (username) {
          this.router.navigate(['/clients']);
          return false;
        }
        return true;
      })
    );
  }
}
