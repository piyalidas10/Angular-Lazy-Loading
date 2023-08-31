### forRoot() and forChild() of Angular Lazy Loading Module
#### forRoot() 
```
RouterModule.forRoot(routes)
```
The forRoot static method is the method that configures the root routing module for your app. When you call RouterModule.forRoot(routes), you are asking Angular to instantiate an instance of the Router class globally. Just like Angular creates a new base AppModule to import all of your feature modules, it also provides the AppRoutingModule to import all of your child routes.

In the new app that you have created via the Angular CLI, the forRoot method is actually already being used inside of the app-routing.module.ts. In your app, you only want to use the forRoot method once. This is because this method tells Angular to instantiate an instance of the Router class under the hood, and there can be only one router in your app. The forRoot static method is a part of a pattern that ensures that you are using singleton classes.

#### forChild()
```
RouterModule.forChild(routes)
```

When you are using the forChild static method, you are basically telling Angular, "There is already a Router instance available in the app so please just register all of these routes with that instance." The forChild method is the method that you will call to register routes throughout your app and you will use it inside of the child, routing modules that you create.

The forChild static method is useful because it plays a core part of Angular module functionality by allowing you to maintain separation of concerns within your app.

#### forRoot() and forChild()

You might have noticed that the Angular CLI adds RouterModule.forRoot(routes) to the AppRoutingModule imports array. This lets Angular know that the AppRoutingModule is a routing module and forRoot() specifies that this is the root routing module. It configures all the routes you pass to it, gives you access to the router directives, and registers the Router service. Use forRoot() only once in the application, inside the AppRoutingModule.

The Angular CLI also adds RouterModule.forChild(routes) to feature routing modules. This way, Angular knows that the route list is only responsible for providing extra routes and is intended for feature modules. You can use forChild() in multiple modules.

The forRoot() method takes care of the global injector configuration for the Router. The forChild() method has no injector configuration. It uses directives such as RouterOutlet and RouterLink. For more information, see the forRoot() pattern section of the Singleton Services guide.
Call forRoot only in the root application module, AppModule. Calling it in any other module, particularly in a lazy loaded module, is contrary to the intent and is likely to produce a runtime error.

Remember to import the result; don't add it to any other @NgModule list.

Every application has exactly one starting point (root) where the main routing service should be initialized with forRoot, while routes for particular "child" features should be registered additionaly with forChild. It is extremely useful for sub modules and lazy loaded modules which do not have to be loaded at the application start.
What is the diffrence between RouterModule.forRoot() vs RouterModule.forChild()? Why is it important?
forRoot creates a module that contains all the directives, the given routes, and the router service itself.
forChild creates a module that contains all the directives and the given routes when you call RouterModule.forChild(routes), Angular check Router instance available in the app and register all of these routes with that instance, but does not include the router service. It registers the routers and uses the router service created at the root level.
This is important because location is a mutable global property. Having more than one object manipulating the location is not a good idea.

#### How does loadChildren property work?
```
const routes: Routes = [
  ...,
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
  ...
]
```

In the above example, loadChildren tells the router to fetch the HomeModule bundle assigned to it when the user visits '/home' url. (To be more precise, it will ask the module loader to find and load it.)

Router will get the router configuration from home module. It merges HomeModule router configuration with the main application configuration.Activate all the needed components.

#### Do you need a Routing Module? Why/not?

Yes if the user was expected to navigate between different URLs. The Routing Module interprets the browser's URL as an instruction to load a specific component and its view. The application has to have its main router configured and bootstraped by passing an array of routes to RouterModule.forRoot(), and since this returns a module, it has to be added to the imports meta property in the main application module.

The RouterModule:

1. separates our routing concerns from our feature module
2. provides a module to replace or remove when testing our feature module
3. provides a common place for require routing service providers including guards and resolvers
4. is not concerned with feature module declarations

#### When does a lazy loaded module is loaded?

The loadChildren property is used by the Router to map to a bundle and lazy-load it. The router will take our loadChildren string and dynamically load in a module, add its routes as child routes to the configuration dynamically and then load the requested route. This will only happen when the route is first requested and the module will be immediately be available for subsequent requests.

Note that lazy-loaded modules should be removed from modules tehy were part of since they will be loaded on demand.

#### When to use ForRoot and ForChild in Angular?

ForRoot is used when a module is "eager" (loads when the application starts). Angular creates a Router instance for all the modules that is going to be injected into the "root" of the modules. When we want to access our providers from any point in the application.
ForChild is used when a module is "lazy" (loads when the module loaded on demand). it has its own injector. specifically, when we want to deliver a provider that is visible only to the "children" modules of our module.

#### Note
Don't inject same service on both providers of forRoot() and forChild() modules, if we add it will create two instance of that service. 
Thats why routerModule has implemeted following this pattern to ensure router module got only single instance throughout the application.