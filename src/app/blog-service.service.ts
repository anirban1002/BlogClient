import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IBlog } from './blog';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  apiUrl = "http://localhost:5018/api";
  http = inject(HttpClient)
  constructor() { }

  getAllBlogs() {
    return this.http.get<IBlog[]>(this.apiUrl + "/Blogs");
  }

  createBlog(blog: IBlog) {
    return this.http.post(this.apiUrl + '/Blogs', blog);
  }

  getBlog(blogId: number) {
    return this.http.get<IBlog>(this.apiUrl + "/Blogs/" + blogId);
  }

  updateBlog(blogId: number, blog: IBlog) {
    return this.http.put(this.apiUrl + '/Blogs/' + blogId, blog);
  }
  deleteBlog(blogId: number) {
    return this.http.delete(this.apiUrl + '/Blogs/' + blogId);
  }
}
