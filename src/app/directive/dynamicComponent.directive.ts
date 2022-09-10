import { ComponentFactoryResolver, ComponentRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicComponent]'
})
export class DynamicComponentDirective {
  @Input() appDynamicComponent = "";
  constructor(
    private templateRef:TemplateRef<any>,
    private reslove: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) { 
    console.log("appDynaicComponent", this.viewContainerRef)
    //this.viewContainerRef.createComponent(this.templateRef)
  }

}
