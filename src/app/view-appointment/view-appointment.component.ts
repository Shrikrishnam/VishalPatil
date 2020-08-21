import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {
  private data;
 
  constructor(private userService:UserService,private router :Router) {
   }
  ngOnInit() {
   this.getfitness();
  }
  
  getfitness() {
    this.userService.getfitnessdata().subscribe(res=>this.data=res);
  }
  deleteData(id){
    
    if(confirm('Do You Really want to Delete ? ( Press Ok to confirm )')){
      this.userService.deletefitnessdata(id).subscribe(res=>{
        this.getfitness();
        console.log('record deleted');
      });
    }
  }
  editData(id){
    console.log('routing to edit ');
    this.router.navigate(['edit-appointment',id]);
  }
}
