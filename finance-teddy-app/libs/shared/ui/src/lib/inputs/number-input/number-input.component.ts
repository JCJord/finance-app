import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'lib-number-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class NumberInputComponent {
  constructor(private formGroup: FormGroupDirective) { }

  @Input() name!: string;
  @Input() label?: string;
  @Input() id!: string;
  @Input() size: 'md' | 'lg' = 'md';

  control!: UntypedFormControl;

  ngOnInit(): void {
    this.control = this.formGroup.form.get(this.name) as UntypedFormControl;

    if(this.id == undefined) this.id = this.generateUniqueId();
  }

  generateUniqueId(): string {
    return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }

  hasError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrors(): string {
    return this.control.errors!['required'] ? 'This field is required' : '';
  }
}
