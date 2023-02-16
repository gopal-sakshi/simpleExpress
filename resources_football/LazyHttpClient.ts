export interface Observable<T> { blah?: string }
export interface HttpEvent<T> { blah?: string }
export interface HttpResponse<T> { blah?: string }
export interface T { blah?: string }
export class LazyHttpClient {


  get(url, options: { headers, observe, params, reportProgress, responseType, withCredentials }): Observable<ArrayBuffer>;

  get(): Observable<ArrayBuffer>
  get(): Observable<Blob>;
  get(): Observable<string>;
  get(): Observable<HttpEvent<ArrayBuffer>>;
  get(): Observable<HttpEvent<Blob>>;
  get(): Observable<HttpEvent<string>>;
  get(): Observable<HttpEvent<Object>>;
  get(): Observable<HttpEvent<T>>;
  get(): Observable<HttpResponse<ArrayBuffer>>;
  get(): Observable<HttpResponse<Blob>>;
  get(): Observable<HttpResponse<string>>;
  get(): Observable<HttpResponse<Object>>;
  get(): Observable<HttpResponse<T>>;
  get(): Observable<Object>;
  get(): Observable<T>;
  get(): Observable<any> { return {} }             // only this is implemented
  /*******************************************************************************************/

  delete(): Observable<ArrayBuffer>
  // ... same many delete() methods ...
  delete(): any { }
  /*******************************************************************************************/

  // ... same many post() methods ...
  post(): Observable<any> { return {} }       // if error, we save the Http Request in local storage
  /*******************************************************************************************/
}