import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadComponent } from './upload/upload.component';
import { AppRoutingModule } from './app-routing.module';
import { QuestionComponent } from './question/question.component';
import { MessageComponent } from './message/message.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UploadComponent,
    QuestionComponent,
    MessageComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    MatRippleModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
