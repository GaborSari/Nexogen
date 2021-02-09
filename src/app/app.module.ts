import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonService } from 'src/services/common.service';
import { TruckService } from 'src/services/truck.service';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.router';
import { ErrorsComponent } from './errors.component/errors.component';
import { TimelineComponent } from './timeline.component/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorsComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    TruckService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
