import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/model/Food';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../star-rating/star-rating.component';
import { CartService } from '../../../services/cart.service';
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent, NotFoundComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  constructor(activatedRoute:ActivatedRoute, private api:FoodService, private cartService:CartService, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      this.food = api.getFoodById(params.id);
    })
   }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}

