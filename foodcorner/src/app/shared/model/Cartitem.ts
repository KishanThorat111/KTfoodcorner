import { Food } from "./Food";


// export class CartItem{
//   constructor(public food:Food){ }
//   quantity:number = 1 ;
//   price:number = this.food.price;
// }
export class CartItem {
    quantity: number = 1;
    price: number;
  
    constructor(public food: Food) {
      this.price = food.price; // Assign inside the constructor
    }
  }
  