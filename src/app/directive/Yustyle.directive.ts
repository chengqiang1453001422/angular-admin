import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appYustyle]'
})
export class YustyleDirective {
  @Input() appYustyle = 'green';
  constructor(
    private el: ElementRef
  ) { 
    console.log("appYustyle", this.appYustyle)
    this.el.nativeElement.style.color = this.appYustyle;
  }

}
