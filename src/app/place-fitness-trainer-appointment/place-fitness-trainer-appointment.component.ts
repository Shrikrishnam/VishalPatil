import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'

})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  obj: Fitness;
  update = null;
  formTitle = "Apply for Fitness Trainer Appointment";
  namePattern = "[a-zA-Z]{1,}";
  agePattern = "(1[89]|[2-5][0-9]|60)";
  pincodePattern = "^[0-9]{6,6}$";
  emailPattern = "/\S+@\S+\.\S+/";

  fitnessForm: FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
   

  }


  ngOnInit() {
    this.update = null;
    this.formTitle = "Apply for Fitness Trainer Appointment";
    this.fitnessForm = this.formBuilder.group({
      id: [],
      firstname: [null, [Validators.required, Validators.pattern(this.namePattern)]],
      lastname: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      age: ['', [Validators.required, Validators.pattern(this.agePattern)]],
      email: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      phonenumber: ['', [Validators.required]],
      streetaddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern(this.pincodePattern)]],
      trainerpreference: ['', [Validators.required]],
      physiotherapist: ['', [Validators.required]],
      packages: ['', [Validators.required]],
      inr: [null, [Validators.required]],
      paisa: [null, [Validators.required]]


    });
    this.fitnessForm.get('packages').valueChanges.subscribe(value => {
      if (value == 'one_time_assessment') {
        this.fitnessForm.patchValue({
          inr: 300,
          paisa: 80
        })
      } else if (value == 'one_week_assessment') {
        this.fitnessForm.patchValue({
          inr: 1300,
          paisa: 50
        })

      } else {
        this.fitnessForm.patchValue({
          inr: 5000,
          paisa: 70
        })

      }
    });
    this.route.paramMap.subscribe(param => {
      const aid = param.get('id');
      
      this.update = aid;
      if (aid) {
        this.getData(aid);
      }
    });

  }
  getData(id) {
    this.userService.getdata(id).subscribe(res => this.editAppointment(res), (err) => { console.log(err) });
  }
  editAppointment(data) {
    this.formTitle = "Edit Fitness Trainer Appointment";
    this.fitnessForm.patchValue({
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      age: data.age,
      email: data.email,
      phonenumber: data.phonenumber,
      streetaddress: data.streetaddress,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
      trainerpreference: data.trainerpreference,
      physiotherapist: data.physiotherapist,
      packages: data.packages,
      inr: data.inr,
      paisa: data.paisa
    });
  }

  onSubmit() {
    if (this.update) {
      this.obj = { ...this.fitnessForm.value, ...this.obj };

      this.userService.updatefitnessdata(this.fitnessForm.value).subscribe(res => {
        console.log('updated successfully ');
        alert('updated successfully');
        this.update = null;
        this.formTitle = "Apply for Fitness Trainer Appointment";
        this.router.navigateByUrl("view-appointment");
      }
      );
    } else {

      this.obj = { ...this.fitnessForm.value, ...this.obj };
      this.userService.postfitnessdata(this.obj).subscribe(res => {
        console.log('appointment placed successfully');
        alert('appointment successfully placed');
        this.router.navigateByUrl("view-appointment");
      }
      );

    }

  }

}
