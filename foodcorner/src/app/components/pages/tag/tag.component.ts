import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/model/Tag';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent implements OnInit {
  tags?:Tag[];
  constructor(api:FoodService) {
    this.tags = api.getAllTags();
   }

  ngOnInit(): void {
  }

}
