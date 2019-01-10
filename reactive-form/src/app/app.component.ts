import { Component, OnInit } from '@angular/core';
//import { FormGroup,FormControl, Form, Validators} from '@angular/forms';
import { FormBuilder,Validators,FormGroup,FormArray } from '@angular/forms'
import { forbiddenNameValidator } from './shared/user.name.validator';
import { passwordValidator } from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-form';
 constructor(private fb:FormBuilder){};
  /* resgistrationForm = new FormGroup({
    userName :new FormControl('vishwas'),
    password  :new FormControl(''),
    confirmPassword :new FormControl(''),
    address : new FormGroup({
      state  :new FormControl(''),
      city :new FormControl(''),
      district  :new FormControl(''),
      postalCode :new FormControl('')
    }),
  }) */
  get userNmae(){
    return this.resgistrationForm.get('userName');
  }
  get email(){
    return this.resgistrationForm.get('email');
  }

  get alternateEmails(){
   return this.resgistrationForm.get('alternateEmails') as FormArray;

  }
  addalternateEmail(){
    this.alternateEmails.push(this.fb.control(''));
  }
  resgistrationForm :FormGroup ;
  ngOnInit(){
    this.resgistrationForm = this.fb.group({
      userName:['',[Validators.required,Validators.minLength(3),forbiddenNameValidator(/password/)]],
      email:[''],
      subscribe:[false],
      password:[''],
      confirmPassword:[''],
      address: this.fb.group({
          state:[''],
          city:[''],
          district:[''],
          postalCode:['']
      }),
      alternateEmails:this.fb.array([])
    },{validator:passwordValidator});
    
    this.resgistrationForm.get('subscribe').valueChanges
    .subscribe(checkedvalue => {
      const email =this.resgistrationForm.get('email');
      if(checkedvalue){
       
        email.setValidators(Validators.required);

      }else{
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
  }
 

 

   loadApiData(){
    this.resgistrationForm.patchValue({
      userName:'rahul singh',
      password:'test',
      confirmPassword:'test'
     /* address:{
        city:'city',
        state: 'state',
        district:'district',
        postalCode:'212301' 
      } */
    })
  
  }
} 
