import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent {
 categoryArray: Array<any> = [];
  searchQuery: string = ''
  searchResults: any[] = [];

 constructor(
  private categoryService: CategoriesService,
  private postService: PostsService
 ){}

 ngOnInit() {
  this.categoryService.loadData().subscribe(val => {
    this.categoryArray = val
  })
 }

 onSearch() {
    this.postService.search(this.searchQuery).subscribe(results => {
    console.log(results)
    this.searchResults = results;
  });
 }
}
