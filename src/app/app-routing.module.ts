import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
    { path: 'stocks', loadChildren: () => import('./stocks/stocks.module').then((m) => m.StocksModule) }
  
  
  ]),
   
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
