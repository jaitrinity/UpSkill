import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[LengthValidater]'
})
export class LengthValidater {
  constructor(private el: ElementRef) { }

  @Input() LengthValidater : any;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    //console.log(event.target.value.length);
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1){
      return;
    }
    if (event.target.value.length == this.LengthValidater) {
      // Allow only backspace
      if(e.keyCode != 8){
        e.preventDefault();
      }
    }
  }
}