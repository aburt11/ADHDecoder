import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SpeedreaderPage } from './speedreader.page';

const routes: Routes = [
  {
    path: '',
    component: SpeedreaderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SpeedreaderPage]
})
export class SpeedreaderPageModule {}
