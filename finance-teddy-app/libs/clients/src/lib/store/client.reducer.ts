import { createReducer, on } from '@ngrx/store';
import { loadClients, loadClientsSuccess, loadClientsFailure, createClient, updateClient, deleteClient, clearSelectedClients, deselectClient, selectClient } from './client.actions';
import { Client, ClientMetaData } from '../models/client.model';

export interface ClientState {
  clientMetaData: ClientMetaData;
  error: string | null;
  selectedClients: Client[];
  loading: boolean;
}

export const initialState: ClientState = {
  clientMetaData: { 
    clients: [] as Client[],
    totalPages: 0,
    currentPage: 1
  },
  selectedClients: [] as Client[],
  error: null,
  loading: false,
};

export const clientReducer = createReducer(
  initialState,
  on(loadClients, state => ({ ...state, loading: true })),  
  on(loadClientsSuccess, (state, { clientMetaData }) => ({
    ...state,
    clientMetaData,
    loading: false,
  })),
  on(loadClientsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(createClient, (state, { client }) => ({
    ...state,
    clientMetaData: {
      ...state.clientMetaData,
      clients: [...state.clientMetaData.clients, client]
    }
  })),
  on(updateClient, (state, { client }) => ({
    ...state,
    clientMetaData: {
      ...state.clientMetaData,
      clients: state.clientMetaData.clients.map(c => c.id === client.id ? client : c)
    }
  })),
  on(deleteClient, (state, { clientId }) => ({
    ...state,
    clientMetaData: {
      ...state.clientMetaData,
      clients: state.clientMetaData.clients.filter(c => c.id !== clientId)
    }
  })),
  on(selectClient, (state, { client }) => {
    // Check if the client is already in the selectedClients array
    const isClientAlreadySelected = state.selectedClients.some(existingClient => existingClient.id === client.id);
    
    // If not, add it to the selectedClients array
    if (!isClientAlreadySelected) {
      return {
        ...state,
        selectedClients: [...state.selectedClients, client]
      };
    }

    // If the client is already selected, just return the current state without changes
    return state;
  }),
  on(deselectClient, (state, { clientId }) => ({
    ...state,
    selectedClients: state.selectedClients.filter(c => c.id !== clientId)
  })),
  on(clearSelectedClients, (state) => ({
    ...state,
    selectedClients: []
  }))
);
