import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from "@angular/router";
import { ContactComponent } from './pages/contact/contact.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
    { path: '', component: PostCreateComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}