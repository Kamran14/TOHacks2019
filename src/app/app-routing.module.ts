import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  { path: '', component: UploadComponent },
  { path: 'interview', component: QuestionComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}