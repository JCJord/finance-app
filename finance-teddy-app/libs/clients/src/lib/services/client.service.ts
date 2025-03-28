import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client, ClientMetaData } from '../models/client.model';  // Import the Client model
import { environment } from '../../../../../environments/environment.prod'; // Adjust the path as necessary
@Injectable({
  providedIn: 'root',  // This will provide the service globally
})
export class ClientService {

  private apiUrl = environment + '/users'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  // Fetch clients
  getClients(page: number, limit: number): Observable<ClientMetaData> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<ClientMetaData>(this.apiUrl, { params });
  }

  // Add a new client
  addClient(client: Partial<Client>): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  // Update a client
  updateClient(client: Client): Observable<Client> {
    return this.http.patch<Client>(`${this.apiUrl}/${client.id}`, client);
  }

  // Delete a client
  deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${clientId}`);
  }
}