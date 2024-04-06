import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  urlPieceVisibilite:string=''
 

  private baseUrl = environment.url+'file' ;

  constructor(private http: HttpClient) {
    this.urlPieceVisibilite=environment.url + 'file/piecevisibilite/'
   }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

/*   getFiles() {
    return this.http.get<ResponseFile[]>(`${this.baseUrl}/files`);
  } */

  getPieceVisibilite(id:string) {
    return this.http.get<any>(this.urlPieceVisibilite+id);
  }

  getFile(id:string) {
    const httpOptions = {
      //responseType: 'arraybuffer' as 'json'
      responseType  :  'json'        //This also worked
    };   
    return this.http.get<any>(`${this.baseUrl}/files/`+id);
  }

  deleteFile(id:string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/`+id);
  }

}
