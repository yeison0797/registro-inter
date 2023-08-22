import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.commponent.css']
})
export class CounterComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
