import { Component, inject, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Client, deleteClient, deselectClient, selectClient, UpdateClientDialog } from '../../clients';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

@Component({
  selector: 'client-card',
  imports: [CommonModule, MatSnackBarModule, CurrencyPipe],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
})
export class ClientCardComponent {
  @Input() client!: Client;
  @Input() removeOnly: boolean = false;
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor(private store: Store){} 

  openUpdateDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UpdateClientDialog, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.client
    });
  }

  addToSelectedClients(client: Client) {
    this.store.dispatch(selectClient({ client }));
    this.openSnackBar(`Cliente ${client.name} adicionado a lista de clientes`, 'Close');
  }

  deleteClient() {
    this.store.dispatch(deleteClient({ clientId: this.client.id }));
  }

  deselectClient() {
    this.store.dispatch(deselectClient({ clientId: this.client.id }));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }
}
