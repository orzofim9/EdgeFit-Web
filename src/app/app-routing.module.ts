import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from "@angular/router";
import { ContactComponent } from './pages/contact/contact.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';


const routes: Routes = [
    { path: '', component: PostCreateComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'users', component: UsersListComponent },
    { path: 'myprofile', component: MyProfileComponent },
    { path: 'products', component: ProductsListComponent },
    { path: 'mycart', component: MyCartComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}
