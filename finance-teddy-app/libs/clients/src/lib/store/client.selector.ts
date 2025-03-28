import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientState } from './client.reducer';

export const selectClientState = createFeatureSelector<ClientState>('clients');

export const selectLoading = createSelector(
  selectClientState,
  (state: ClientState) => state.loading  // Return the loading property from the state
);

// Selector to get all clients
export const selectAllClients = createSelector(
  selectClientState,
  (state: ClientState) => state.clientMetaData.clients
);

// Selector to get the pagination info
export const selectClientPagination = createSelector(
  selectClientState,
  (state: ClientState) => ({
    totalPages: state.clientMetaData.totalPages,
    currentPage: state.clientMetaData.currentPage
  })
);

// Selector to get error state
export const selectClientError = createSelector(
  selectClientState,
  (state: ClientState) => state.error
);

// Selector to get selected clients
export const selectSelectedClients = createSelector(
  selectClientState,
  (state: ClientState) => state.selectedClients
);
