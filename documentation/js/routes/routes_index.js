var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"#/vp/home","pathMatch":"full"},{"path":"#/vp/home","loadChildren":"./home-module/home-module.module#HomeModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/home-module/home-routing.service.ts","module":"HomeRoutingModule","children":[{"path":"","component":"HomeComponent"}],"kind":"module"}],"module":"HomeModule"}]},{"path":"#/vp/manage","loadChildren":"./batch-module/batch.module#BatchRouteModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/batch-module/batch-routing.service.ts","module":"BatchRoutingModule","children":[{"path":"","component":"BatchViewComponent"}],"kind":"module"}],"module":"BatchRouteModule"}]}],"kind":"module"}]}
