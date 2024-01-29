import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featuredPostArray: Array<any> = [];
  latesetPostArray: Array<any> = [];

  constructor(
    private postService: PostsService
  ){}

  ngOnInit() {
    this.postService.loadFeatured().subscribe(val => {
      this.featuredPostArray = val;
    })

    this.postService.loadLatest().subscribe(val => {
      this.latesetPostArray = val
    })
  }

}
