import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/model/Food';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../star-rating/star-rating.component';
import { SearchComponent } from "../search/search.component";
import { TagComponent } from "../tag/tag.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { Observable } from 'rxjs';



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
    let foodsObservable:Observable<Food[]>
    activatedRoute.params.subscribe((params)=>{
      if (params.searchTerm)
      foodsObservable = this.api.getAllFoodBySearchTerm(params.searchTerm)
      else if(params.tag)
      foodsObservable=this.api.getAllFoodByTag(params.tag)
      else
      foodsObservable = api.getAll()
      foodsObservable.subscribe((serverFoods)=>{
        this.foods = serverFoods
      })
   })
  
  }
  ngOnInit(){}

}
