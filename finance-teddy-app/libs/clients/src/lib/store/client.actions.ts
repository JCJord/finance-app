import { createAction, props } from '@ngrx/store';
import { Client } from '../models/client.model';
import { ClientMetaData } from '../models/client.model';

// Action for loading clients with pagination
export const loadClients = createAction(
  '[Client] Load Clients',
  props<{ page: number; limit: number }>()  // Pass pagination parameters
);

// Action for loading clients success
export const loadClientsSuccess = createAction(
  '[Client] Load Clients Success',
  props<{ clientMetaData: ClientMetaData }>()  // Now includes pagination info
);

// Action for loading clients failure
export const loadClientsFailure = createAction(
  '[Client] Load Clients Failure',
  props<{ error: string }>()
);

// Action for creating a client
export const createClient = createAction(
  '[Client] Create Client',
  props<{ client: Client }>()
);

export const createClientSuccess = createAction(
  '[Client] Create Client Success',
  props<{ client: Client }>()
);

export const createClientFailure = createAction(
  '[Client] Create Client Failure',
  props<{ error: string }>()
);

// Action for updating a client
export const updateClient = createAction(
  '[Client] Update Client',
  props<{ client: Client }>()
);

export const updateClientSuccess = createAction(
  '[Client] Update Client Success',
  props<{ client: Client }>()
);

export const updateClientFailure = createAction(
  '[Client] Update Client Failure',
  props<{ error: string }>()
);

// Action for deleting a client
export const deleteClient = createAction(
  '[Client] Delete Client',
  props<{ clientId: number }>()
);

export const deleteClientSuccess = createAction(
  '[Client] Delete Client Success',
  props<{ clientId: number }>()
);

export const deleteClientFailure = createAction(
  '[Client] Delete Client Failure',
  props<{ error: string }>()
);

// Action to add a selected client
export const selectClient = createAction(
  '[Client] Select Client',
  props<{ client: Client }>()
);

// Action to remove a selected client
export const deselectClient = createAction(
  '[Client] Deselect Client',
  props<{ clientId: number }>()
);

// Action to clear all selected clients
export const clearSelectedClients = createAction(
  '[Client] Clear Selected Clients'
);