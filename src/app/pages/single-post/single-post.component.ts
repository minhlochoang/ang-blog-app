import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {
  postData: any
  similarPostArray: Array<any> = []

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postService.countViews(params['id'])

      this.postService.loadPostById(params['id']).subscribe(post => {
        this.postData = post
        this.loadSimilarPost(this.postData.category.categoryId)
      })
    })
  }

  loadSimilarPost(categoryId: string) {
    this.postService.loadSimilar(categoryId).subscribe(data => {
      this.similarPostArray = data
    })
  }
}
