import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '@finance-teddy-app/ui';
import { ButtonComponent } from '@finance-teddy-app/ui';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { setUser } from '../../core/store/auth.action';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  welcomeForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private store: Store, private router: Router) {}

  onLogin() {
    const name = this.welcomeForm.value.name;
    if (name) {
      // Dispatch the action to store the user's name
      this.store.dispatch(setUser({ name }));

      // Navigate to the clients page
      this.router.navigate(['/clients']);
    }
  }
}
