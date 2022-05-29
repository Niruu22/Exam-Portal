import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack:MatSnackBar) { }

  public user = {
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('User_Name is Required !!','',{
        duration:3000,
      });
      return;
    }
    
    if (this.user.password == '' || this.user.password == null) {
      // alert('User is required !!');
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

      //add userservice
      
      this.userService.addUser(this.user).subscribe(

        (data:any)=>{
          //sucess
          console.log(data);
         //alert('Sucess');
         Swal.fire('Successfully done !!', 'User is added ' , 'success');
         
          
        },
        (error)=>{
          //error
          console.log(error);
          //alert('Something went wrong');
          this.snack.open('Something Went wrong !!','',{
            duration:3000,
          });
          
        }

      );


  }

}
