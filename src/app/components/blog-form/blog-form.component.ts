import { Component, Output, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BlogServiceService } from '../../blog-service.service';
import { IBlog } from '../../blog';
import { ActivatedRoute, Router } from '@angular/router';
import EventEmitter from 'events';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})
export class BlogFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(BlogServiceService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toastr = inject(ToastrService)
  @Output() public message = new EventEmitter<any>();
  blogForm = this.formBuilder.group({
    userName: ['', [Validators.required]],
    text: ['', [Validators.required]]
  })
  isEdit = false
  blogId!: number;
  ngOnInit() {
    this.blogId = this.route.snapshot.params['id'];
    if (this.blogId) {
      this.isEdit = true;
      this.httpService.getBlog(this.blogId).subscribe(result => {
        console.log(result);
        this.blogForm.patchValue(result);
      })
    }
  }
  save() {
    console.log(this.blogForm.value);
    const blog: IBlog = {
      userName: this.blogForm.value.userName!,
      text: this.blogForm.value.text!
    }
    if (this.isEdit) {
      this.httpService.updateBlog(this.blogId,blog).subscribe(() => {
        console.log("Updated Successfully!");
        this.message.emit("Updated Successfully!");
        this.toastr.success("Blog Updated Succeessfully!");
        this.router.navigateByUrl("/blog-list");
      });
    } else {
      this.httpService.createBlog(blog).subscribe(() => {
        console.log("Saved Successfully!");
        this.message.emit("Saved Successfully!");
        this.toastr.success("Blog added!");
        this.router.navigateByUrl("/blog-list");
      });
    }
  }
}
