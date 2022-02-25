import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AppRoutingModule } from './app.routing.module';
import { DynamicComponentsResolver } from './dynamic-component-resolver.service';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([]),
  ],
  providers: [
    {provide: 'DEPENDENCY_RESOLVER', useClass: DynamicComponentsResolver},
    {provide: 'HOST_NAME', useValue: 'http://localhost:1234'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
