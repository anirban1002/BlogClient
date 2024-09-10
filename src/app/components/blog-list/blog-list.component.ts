import { Component, inject } from '@angular/core';
import { IBlog } from '../../blog';
import { BlogServiceService } from '../../blog-service.service';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [MatTableModule, MatListModule, DatePipe, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {
  router = inject(Router);
  blogList: IBlog[] = [];
  httpService = inject(BlogServiceService);
  datepipe: DatePipe = new DatePipe('en-US');
  message?: string;
  toastr = inject(ToastrService)
  ngOnInit() {
    this.httpService.getAllBlogs().subscribe(result => {
      this.blogList = result;
      console.log(this.blogList);
    });
  }
  edit(id: number) {
    console.log(id);
    this.router.navigateByUrl('/blog/' + id);
  }
  delete(id: number) {
    console.log(id);
    this.httpService.deleteBlog(id).subscribe(() => {
      console.log("deleted");
      this.toastr.success("Blog deleted!");
      this.blogList = this.blogList.filter(x => x.id != id);
    })
  }
  receiveMessage($event: string) {
    this.message = $event
  }
}
