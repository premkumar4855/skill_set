import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SearchComponent } from './fragments/search/search.component';
import { AddSkillsComponent } from './fragments/add-skills/add-skills.component';
import { SkillService } from './services/skill.service';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AddSkillsComponent,
  ],
  imports: [
    ToastrModule.forRoot(), 
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxSpinnerModule

  ],
  providers: [
    SkillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
