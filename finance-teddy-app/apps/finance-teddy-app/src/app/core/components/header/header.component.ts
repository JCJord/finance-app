import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserName } from '../../store/auth.selector';
import { logout } from '../../store/auth.action';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userName$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.userName$ = this.store.select(selectUserName);
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/'])
  }
}
