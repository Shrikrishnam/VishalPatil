import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {UserService} from '../_services/user.service';
export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) { }
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  public obj: Contact ;
  success=false;
  constructor(private fb: FormBuilder,private userService:UserService,private router:Router) { }

  resetForm(){
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      phonenumber: ["", [Validators.required]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      message:["",[Validators.required]]
    });
  }
  ngOnInit() {
    this.success=false;
    this.resetForm();
  }

  onSubmit() {
    this.obj = { ...this.contactForm.value, ...this.obj };
    this.userService.postcontactdata(this.obj).subscribe(res=>{
      this.success=true;
      this.resetForm();
      
    });
  
    if (this.contactForm.valid) {
      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );
    }
    
  
  }
}
