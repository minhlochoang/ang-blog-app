import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent {
  postArray: Array<any> = [];
  categoryObj: any

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryObj = params

      this.postService.loadCategoryPosts(params['id']).subscribe(posts => {
        this.postArray = posts
      })
    })
  }
}
