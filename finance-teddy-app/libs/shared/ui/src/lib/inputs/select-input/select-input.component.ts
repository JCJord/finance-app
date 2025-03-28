import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'lib-select-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
]
})
export class SelectInputComponent {
  constructor(private formGroup: FormGroupDirective) { }

  @Input()
  name!: string;

  @Input()
  label?: string;

  @Input()
  id?: string;

  @Input()
  options!: Array<Option>;

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

  optionIdentifier(index: number, option: Option) {
      return option.value;
  }
}

export type Option = {
  label: string,
  value: string | number | null
}