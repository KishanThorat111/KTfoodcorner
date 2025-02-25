import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from '../../data';
import { Food } from '../shared/model/Food';
import { Tag } from '../shared/model/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_URL } from '../shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient:HttpClient) { }
  getAll():Observable<Food[]>{
    return this.httpClient.get<Food[]>(FOODS_URL);
  }

  getAllFoodBySearchTerm(searchTerm: string) {
    return this.httpClient.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }
  getAllTags():Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(FOODS_BY_TAG_URL);
  }
  getAllFoodByTag(tag: string): Observable<Food[]> {
    return tag==="All"? this.getAll(): this.httpClient.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }
  getFoodById(foodId:string): Observable<Food>{
    return this.httpClient.get<Food>(FOODS_BY_ID_URL + foodId);
  }
}
