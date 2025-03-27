import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '@finance-teddy-app/ui';
import { ButtonComponent } from '@finance-teddy-app/ui';

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
}
