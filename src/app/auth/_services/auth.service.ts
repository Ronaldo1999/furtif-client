import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/services/config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlserveur: string = '';
  auth: string = '';

  constructor( private http: HttpClient, private appConfigService: ConfigService ) {
    this.urlserveur = this.appConfigService.getConfig().serverIP;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post( this.urlserveur + 'api/auth/signin', { username, password, }, httpOptions );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post( this.urlserveur + 'api/auth/signup', { username, email, password, }, httpOptions );
  }
}
