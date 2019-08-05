import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' ;
import { MatInputModule, MatToolbarModule, MatButtonModule,MatExpansionModule,MatMenuModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    //Google maps api key
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB_QKXBX8kCEWW7k5toiRA4PWTElJNw-48'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
