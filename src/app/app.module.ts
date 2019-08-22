import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' ;
import { MatInputModule, MatCardModule, MatListModule, MatDividerModule,
  MatToolbarModule, MatButtonModule, MatExpansionModule, MatMenuModule,
   MatSelectModule, MatTableModule, MatGridListModule, MatPaginatorModule } from '@angular/material';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { CustomPipe } from './custom.pipe';
import { GraphDirective } from './graph.directive';
import { PostEditComponent } from './posts/post-edit/post-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    UsersListComponent,
    MyProfileComponent,
    ProductsListComponent,
    MyCartComponent,
    CustomPipe,
    GraphDirective,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    HttpClientModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatPaginatorModule,
    //Google maps api key
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBJ_0NlmurPE3RxJ4ePbjjHUjvLBeBeLA'
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
