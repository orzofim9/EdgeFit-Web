import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from "@angular/router";
import { ContactComponent } from './pages/contact/contact.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AboutComponent } from './pages/about/about.component';


const routes: Routes = [
    { path: '', component: PostCreateComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}