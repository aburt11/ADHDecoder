import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'speedreader', loadChildren: './speedreader/speedreader.module#SpeedreaderPageModule' },
  { path: 'adhdecoder', loadChildren: './adhdecoder/adhdecoder.module#ADHDecoderPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'neural-rank', loadChildren: './neural-rank/neural-rank.module#NeuralRankPageModule' },  { path: 'progress-tracker', loadChildren: './progress-tracker/progress-tracker.module#ProgressTrackerPageModule' },
  { path: 'quickmaths', loadChildren: './quickmaths/quickmaths.module#QuickmathsPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
