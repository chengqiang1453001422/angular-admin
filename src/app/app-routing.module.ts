import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormComponent } from './form/form.component';
import { LoginComponent }      from './login/login.component';
import { TableComponent } from './table/table.component';
import { UserComponent } from './user/user.component';

import { AuthGuard } from './auth/auth.guard';
import { NotpageComponent } from './notpage/notpage.component';
import { AdminComponent } from './admin/admin.component';
import { NewsArticleWriteComponent } from './newsArticleWrite/newsArticleWrite.component';
const routes: Routes = [
	{ path: '', redirectTo: '/system', pathMatch: 'full' },
	{ 
		path: 'system', 
		component: AdminComponent, 
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				canActivateChild: [AuthGuard],
				children: [
					{ path: '', component: DashboardComponent },
					{ path: 'newsArticleWrite', component: NewsArticleWriteComponent },
					{ path: 'feedback', component: FeedbackComponent },
					{ path: 'form', component: FormComponent },
					{ path: 'table', component: TableComponent },
				]
			}
		] 
	},
	{ path: 'login', component: LoginComponent },
	{ path: '**', component: NotpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
