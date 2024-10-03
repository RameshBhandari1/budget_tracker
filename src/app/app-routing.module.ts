import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "./core-module/guards/auth.guard";
import {loginGuard} from "./core-module/guards/login.guard";

const routes: Routes = [
  {
    // Default route
    path: '',
    pathMatch: 'full',
    // Redirects to the dashboard on root access
    redirectTo: 'home/dashboard',
  },
  {
    // Authentication module route
    path: 'auth',
    // Lazy loading AuthModule
    loadChildren: () =>
      import('./auth-module/auth.module').then((m) => m.AuthModule),
    // Guard to protect the authentication routes
    canActivate: [loginGuard],
    // Runs guards on parameter or query parameter changes
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    // Feature module route
    path: 'home',
    // Lazy loading FeatureModule
    loadChildren: () =>
      import('./feature-module/feature.module').then((m) => m.FeatureModule),
    // Guard to protect the authentication routes
    canActivate: [authGuard],
    // Runs guards on parameter or query parameter changes
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    // Wildcard route for handling undefined paths
    path: '**', redirectTo: 'home/dashboard', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
