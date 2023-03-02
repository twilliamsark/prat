import { Directive, 
  ElementRef, 
  HostBinding, 
  HostListener, 
  OnInit } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') isOpen: boolean = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = 
      this.elRef.nativeElement.contains(event.target) 
        ? !this.isOpen 
        : false;
  }
  constructor(private elRef: ElementRef) {}  
  ngOnInit(): void {}
}
