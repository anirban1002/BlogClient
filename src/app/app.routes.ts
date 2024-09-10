import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';

export const routes: Routes = [
  {
    path: "",
    component: BlogListComponent
  },
  {
    path: "blog-list",
    component: BlogListComponent
  },
  {
    path: "create-blog",
    component: BlogFormComponent
  }
  ,
  {
    path: "blog/:id",
    component: BlogFormComponent
  }
];
