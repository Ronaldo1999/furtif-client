import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface AppConfig {
  serverIP: string;
  serverDistantIP: string;
  adressIPServeur: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config = {} as AppConfig;
  loaded = false;
  constructor(private http: HttpClient) {}
  loadConfig(): Promise<void> {
    return this.http.get<AppConfig>('./assets/app.config.json').toPromise().then((data) => {
        this.config = data as AppConfig;
        this.loaded = true;
      });
  }
  getConfig(): AppConfig {
    return this.config;
  }
}
