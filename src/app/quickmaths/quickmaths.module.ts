import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuickmathsPage } from './quickmaths.page';

const routes: Routes = [
  {
    path: '',
    component: QuickmathsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuickmathsPage]
})
export class QuickmathsPageModule {}
