import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/model/Food';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../star-rating/star-rating.component';
import { SearchComponent } from "../search/search.component";
import { TagComponent } from "../tag/tag.component";
import { NotFoundComponent } from "../not-found/not-found.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, StarRatingComponent, SearchComponent, TagComponent, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  foods:Food[] = [];
  constructor(private api:FoodService, activatedRoute:ActivatedRoute) {
    activatedRoute.params.subscribe((params)=>{
      if (params.searchTerm)
      this.foods = this.api.getAllFoodBySearchTerm(params.searchTerm)
      else if(params.tag)
      this.foods=this.api.getAllFoodByTag(params.tag)
      else
      this.foods = api.getAll()
   })
  
  }
  ngOnInit(){}

}
