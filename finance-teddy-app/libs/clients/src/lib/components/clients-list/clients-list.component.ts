import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../clients';
import { ClientCardComponent } from '../client-card/client-card.component';
@Component({
  selector: 'clients-list',
  imports: [CommonModule, ClientCardComponent],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
})
export class ClientsListComponent {
  @Input() clients: Client[] = [];
  @Input() removeOnly: boolean = false;
}
