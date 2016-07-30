import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class ServerService {
  private HEADERS = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
  }

  setHeaders() {
    const id_token = localStorage.getItem('id_token');

    if (id_token) {
      this.HEADERS.set('Authorization', `Bearer ${id_token}`);
    } else {
      this.HEADERS.delete('Authorization');
    }
  }

  post(path, data) {
    this.setHeaders();

    return this.http.post(`${BASE_URL}${path}`, JSON.stringify(data), { headers: this.HEADERS })
      .map((res: Response) => res.json());
  }

  get(path) {
    this.setHeaders();

    return this.http.get(`${BASE_URL}${path}`, { headers: this.HEADERS })
      .map((res: Response) => res.json());
  }

  put(path, data) {
    this.setHeaders();

    return this.http.put(`${BASE_URL}${path}`, JSON.stringify(data), { headers: this.HEADERS })
      .map((res: Response) => res.json());
  }

  delete(path) {
    this.setHeaders();

    return this.http.delete(`${BASE_URL}${path}`, { headers: this.HEADERS })
      .map((res: Response) => res.json());
  }
}
