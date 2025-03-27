import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() size: 'md' | 'lg' = 'md'; 
  @Input() variant: 'solid' | 'outline' = 'solid'; 
  @Input() disabled: boolean = false;
}
