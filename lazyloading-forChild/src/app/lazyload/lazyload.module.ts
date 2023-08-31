import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyloadRoutingModule } from './lazyload-routing.module';
import { LazyloadComponent } from './lazyload.component';


@NgModule({
  declarations: [
    LazyloadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LazyloadRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LazyloadModule { }
