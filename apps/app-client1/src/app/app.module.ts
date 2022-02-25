import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { DynamicComponentsResolver } from './dynamic-component-resolver.service';
import { ReactiveFormsModule } from '@angular/forms';
import { App1Module } from './app1/app1.module';
import { Store, StoreModule } from '@ngrx/store';
import { appReducer } from './store/app-reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([]),
    ReactiveFormsModule,
    App1Module
  ],
  providers: [
    {provide: 'DEPENDENCY_RESOLVER', useClass: DynamicComponentsResolver},
    {provide: 'HOST_NAME', useValue: 'http://localhost:12345'}
],
  bootstrap: [AppComponent],
})
export class AppModule {}
