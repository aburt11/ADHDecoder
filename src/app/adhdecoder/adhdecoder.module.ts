import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ADHDecoderPage } from './adhdecoder.page';




const routes: Routes = [
  {
    path: '',
    component: ADHDecoderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    RouterModule.forChild(routes)
  ],
  declarations: [ADHDecoderPage]
})
export class ADHDecoderPageModule {}
