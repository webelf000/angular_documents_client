import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
  AfterViewInit,
  OnChanges
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[background-image]'
})
export class BackgroundImageDirective implements AfterViewInit, OnChanges {
  private el: HTMLElement;
  // tslint:disable-next-line:no-input-rename
  @Input('background-image') backgroundImage: string;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.el = this.elRef.nativeElement;
  }

  ngAfterViewInit() {
    this.setBackgroundImage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['backgroundImage']) {
      this.setBackgroundImage();
    }
  }

  setBackgroundImage() {
    this.renderer.setStyle(
      this.el,
      'backgroundImage',
      `url(${this.backgroundImage})`
    );
  }
}
