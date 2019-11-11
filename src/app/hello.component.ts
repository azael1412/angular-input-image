import { Component, forwardRef, HostBinding, Input, HostListener, ElementRef, OnInit  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  template: ' <input class="file-input" type="file">',
   selector: 'app-custom-input',
providers: [     
{       provide: NG_VALUE_ACCESSOR, 
        useExisting: forwardRef(() => HelloComponent ),
        multi: true     
}   
]
})
export class HelloComponent implements ControlValueAccessor, OnInit {
constructor(private host: ElementRef) { }

ngOnInit(): void {
  console.log('HelloComponent initialized');
}
onChange: Function;
onTouch: any = () => {}
private file: File | null = null;
base64textString : string = "";
@HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
  console.log(event);
       const file = event && event.item(0);
       console.log(file)
      if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
    console.log(this.base64textString);
    //this.onChange(file);
    //this.onChange(this.base64textString);
    this.file = file;
    //const file = evt.target.files[0];
  
  }
val= "" // this is the updated value that the class accesses
/*set value(val){  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
this.val = val
this.onChange(val)
this.onTouch(val)
}*/

// this method sets the value programmatically
writeValue(value: any){ 
    this.host.nativeElement.value = '';
    this.val = value
    this.file = null;
    //this.value = value
}
// upon UI element value changes, this method gets triggered
registerOnChange(fn: any){
  console.log('registerOnChange called')
  console.log(fn);
this.onChange = fn
if(this.onChange)
{
  console.log(this.onChange)
}
}
// upon touching the element, this method gets triggered
registerOnTouched(fn: any){
this.onTouch = fn
}
 handleReaderLoaded(e) {
    this.base64textString = 'data:image/png;base64,' + btoa(e.target.result);
    console.log('HE HANDLEADO EL EVENTO LOAD xd')
    console.log(this.base64textString)
    this.onChange(this.base64textString);
  }
}
