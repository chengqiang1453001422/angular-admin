import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

registerLocaleData(zh);

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      DashboardComponent,
      UserComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgZorroAntdModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ReactiveFormsModule
   ],
   providers: [
      
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
