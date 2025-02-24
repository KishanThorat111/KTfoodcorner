import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stars">
      <span *ngFor="let star of starsArray; let i = index"
            [class.filled]="i < value"
            [style.color]="i < value ? checkedColor : uncheckedColor"
            class="star"
            [style.cursor]="readOnly ? 'default' : 'pointer'">
        ★
      </span>
    </div>
  `,
  styles: [`
    .stars {
      display: inline-block;
      font-size: 22px;
    }
    .star {
      cursor: pointer;
    }
    .filled {
      color: gold;
    }
  `]
})
export class StarRatingComponent {
  @Input() value: number = 0;
  @Input() totalstars: number = 5;
  @Input() checkedColor: string = 'red';
  @Input() uncheckedColor: string = 'black';
  @Input() readOnly: boolean = false;  // ✅ Added readOnly property
  starsArray = Array(5).fill(0);
}
