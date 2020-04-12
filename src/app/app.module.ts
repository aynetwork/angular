import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { CrisisListComponent } from './list-component/list-component.component';
import { HeroDetailComponent } from './detail-component/detail-component.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFormComponent } from './search-form/search-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BackButtonDirective } from './back-button.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  { path: 'search', component: SearchFormComponent, data : {animation: 'SearchPage'}},
  { path: 'crisis-center', component: CrisisListComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent
      }
    ],
    data: {animation: 'HomePage'}
  },
  { path: 'crisis-center/:id',      component: HeroDetailComponent, data : {animation: 'AboutPage'} },
  { path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    CrisisListComponent,
    HeroDetailComponent,
    PageNotFoundComponent,
    SearchFormComponent,
    BackButtonDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
