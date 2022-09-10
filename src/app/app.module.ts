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
import { FeedbackComponent } from './feedback/feedback.component';
import { FormComponent } from './form/form.component';
import { AccountDialogComponent } from './components/accountDialog/accountDialog.component';
import { TableComponent } from './table/table.component';

import { Func } from '../provides/func.service';
import { NotpageComponent } from './notpage/notpage.component';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from 'src/servers/auth.service';
import { httpInterceptorProviders } from './http-interceptors';
import { HttpService } from 'src/servers/http.service';
import { NewsArticleWriteComponent } from './newsArticleWrite/newsArticleWrite.component';
import { DictService } from 'src/servers/dict.service';

import { QuillModule } from 'ngx-quill'
import { SelectAccountComponent } from './components/selectAccount/selectAccount.component';
import { FormItemComponent } from './components/form/form-item/form-item.component';
import { FormItemInputComponent } from './components/form/form-component/form-item-input/form-item-input.component';
import { FormDynamicItemComponent } from './components/form/form-dynamic-item/form-dynamic-item.component';
import { HighlightDirective } from './highlight.directive';
import { YustyleDirective } from './directive/Yustyle.directive';
import { DynamicComponentDirective } from './directive/dynamicComponent.directive';
import { LoggerService } from 'src/provides/Logger.service';
import { APP_CONFIG } from './config/app.config';
import { MyComponentHhComponent } from './components/my-component-hh/my-component-hh.component';
registerLocaleData(zh);

//import { FooModule } from 'example-component-library'

@NgModule({
   declarations: [				
      AppComponent,
      LoginComponent,
      DashboardComponent,
      UserComponent,
      FeedbackComponent,
      FormComponent,
      AccountDialogComponent,
      TableComponent,
      NotpageComponent,
      AdminComponent,
    NewsArticleWriteComponent,
    SelectAccountComponent,
    FormItemComponent,
    FormItemInputComponent,
    FormDynamicItemComponent,
    HighlightDirective,
    YustyleDirective,
    DynamicComponentDirective,
    MyComponentHhComponent
  ],
  entryComponents: [
    SelectAccountComponent,
    FormItemComponent,
    FormItemInputComponent
  ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgZorroAntdModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
     QuillModule.forRoot(),
      //FooModule
   ],
  providers: [
    {
      provide: LoggerService, useValue: {
       name: "chengqiang"
      }
    },
    {
      provide: APP_CONFIG, useValue: {
      name: "成强"
    } },
      Func,
      AuthService,
      HttpService,
      DictService,
      httpInterceptorProviders
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
