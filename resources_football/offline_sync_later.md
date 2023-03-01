football frontEnd repo
try to make a HTTP request in offline
the http request is saved in localStorage
next time, net is available, we read the requests from localStorage & hit the API endpoints
----------------------------------------------------------------------------------------------
Understand KalgudiLazyHttpModule

LazyHttpClient
- implements all get, post, put, delete methods...
- with different return types
- see this file ==> LazyHttpClient.js
- export class `LazyHttpClient` { }
    this is an injectable service... 

Some modules use <private httpClient: HttpClient>         // angular's http Client
Some modules use <private httpClient: LazyHttpClient>     // here network requests are saved in local Storage when they are failed

`services that use LazyHttpClient`
farmer-profile-api
qa-api
share-update-api
----------------------------------------------------------------------------------------------

We have two entities here
- `LazyApiSyncInterceptor` (pauseSync, resumeSync)
    NoopApiSyncService
    OnNetworkApiSyncService
- `LazyHttpClientInterceptor` (canCacheRequest)
    NoopInterceptorService
    FailedHttpResponseInterceptorService
- generate two InjectionTokens too... 
    {
        provide: injectionToken1,
        useClass: OnNetworkApiSyncService (or) NoopApiSyncService           // its the module that decides if it wants cache (or) not
    }

By default
- NoopApiSyncService & NoopInterceptorService ====> will be provided in providers-array
- But if a module requires, caching failed Http requests, then we use
    OnNetworkApiSyncService
    FailedHttpResponseInterceptorService

export class `LazyApiSync` {} 
- whatever service is injected (be it - NoopApiSyncService (or) OnNetworkApiSyncService)
- we use generic term `LazyApiSyncInterceptor` to refer to either of them
    its upto Angular to use one class (or) the other based on what was injected
- this lazyApiSync ===> 
    fetches the saved requests from localStorage        // only if <OnNetworkApiSyncService> got injected
    does NOTHING                                        // if <NoopApiSyncService> got injected
----------------------------------------------------------------------------------------------