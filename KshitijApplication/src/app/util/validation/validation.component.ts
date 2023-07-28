import { Component, Directive, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'validation-error-msg',
  // template: ' <span style="color:red" *ngIf="erorrMsg"> <i class="bi bi-exclamation-triangle" style="font-size: 1.50em;color:red"></i>{{erorrMsg}}</span> ',
  template: ' <mat-icon *ngIf="erorrMsg" matTooltip="{{erorrMsg}} "><i class="bi bi-exclamation-triangle" style="font-size: 0.75em;color:red;"></i></mat-icon> ',
})

export class validationComponent {

  @Input() erorrMsg!: string;
  constructor(
    private elementRef: ElementRef) {
  }
  ngOnInit() {
    // console.log("input-box keys : ", this.name, this.value);
    //this.elementRef.nativeElement.innerHTML ='<h5>Hello World</h5>'; 
  }
}