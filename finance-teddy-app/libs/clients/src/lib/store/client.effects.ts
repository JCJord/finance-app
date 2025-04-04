import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { ClientMetaData, ClientService } from "../clients";
import { loadClients, loadClientsSuccess, loadClientsFailure, createClient, createClientSuccess, createClientFailure, updateClient, updateClientFailure, updateClientSuccess, deleteClient, deleteClientFailure, deleteClientSuccess } from "./client.actions";

@Injectable()
export class ClientEffects {
  loadClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadClients),
      switchMap(({ page, limit }) =>
        this.clientService.getClients(page, limit).pipe(
          map((response: ClientMetaData) => {
            const clientMetaData = response;
            return loadClientsSuccess({ clientMetaData: clientMetaData });
          }),
          catchError(error => {
            console.error('Error loading clients:', error);
            return of(loadClientsFailure({ error: error.message }));
          })
        )
      )
    )
  );

  createClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createClient),
      switchMap(({ client }) =>
        this.clientService.addClient(client).pipe(
          map((newClient) => createClientSuccess({ client: newClient })),
          catchError((error) => of(createClientFailure({ error: error.message })))
        )
      )
    )
  );

  updateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateClient),
      switchMap(({ client }) =>
        this.clientService.updateClient(client).pipe(
          map((updatedClient) => updateClientSuccess({ client: updatedClient })), // Dispatch success action
          catchError((error) => of(updateClientFailure({ error: error.message })))
        )
      )
    )
  );

  deleteClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteClient),
      switchMap(({ clientId }) =>
        this.clientService.deleteClient(clientId).pipe(
          map(() => deleteClientSuccess({ clientId })), // Dispatch success action
          catchError((error) => of(deleteClientFailure({ error: error.message })))
        )
      )
    )
  );
  
  constructor(
    private actions$: Actions,
    private clientService: ClientService
  ) {}
}
