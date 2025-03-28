import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { clearSelectedClients, Client, ClientCardSkeletonComponent, ClientsListComponent, CreateClientDialog, loadClients, selectAllClients, selectClientPagination, selectLoading, selectSelectedClients } from '@finance-teddy-app/clients';
import { ButtonComponent, PaginatorComponent, SelectInputComponent } from '@finance-teddy-app/ui';
import { Store } from '@ngrx/store';
import { Observable, startWith, tap, withLatestFrom } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, ClientsListComponent, ButtonComponent, PaginatorComponent, MatDialogModule, ClientCardSkeletonComponent, SelectInputComponent, ReactiveFormsModule],
  selector: 'app-clientsMfe-entry',
  templateUrl: './entry.component.html',
})
export class RemoteEntryComponent {
  clients$: Observable<Client[]>;
  pagination$: Observable<{ totalPages: number; currentPage: number }>;
  selectedClients$: Observable<Client[]>;
  loading$!: Observable<boolean>;
  clientsPerPageOptions: Array<{ value: number, label: string }> = [{ value: 16, label: '16' }, { value: 8, label: '8' },{ value: 10, label: '10' }];
  limit: number = 16;

  clientPerPageForm = new FormGroup({
    clientPerPage: new FormControl(16),
  })

  readonly dialog = inject(MatDialog);

  isSelectedView = false;
  
  constructor(
    private store: Store, 
    private router: Router
  ) {
    this.clients$ = this.store.select(selectAllClients);
    this.pagination$ = this.store.select(selectClientPagination);
    this.selectedClients$ = this.store.select(selectSelectedClients);
    this.loading$ = this.store.select(selectLoading);
  }
  
  ngOnInit() {
    // Initial load of clients
    this.store.dispatch(loadClients({ page: 1, limit: 16 }));
    
    // Check if in selected view
    this.isSelectedView = this.router.url.includes('selectedClients');
  
    // Listen for form value changes with current page from pagination
    this.clientPerPageForm.get('clientPerPage')?.valueChanges
      .pipe(
        startWith(16),
        withLatestFrom(this.pagination$),
        tap(([limit, pagination]) => {
          const currentPage = pagination.currentPage || 1;
          
          this.store.dispatch(loadClients({ 
            page: currentPage, 
            limit: limit as number 
          }));
        })
      )
      .subscribe();
  }
  
  onPageChange(page: number, limit: number = this.limit): void {
    this.store.dispatch(loadClients({ page, limit: limit }));
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateClientDialog, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  clearAllSelectedClients() {
    this.store.dispatch(clearSelectedClients());
  }
}
