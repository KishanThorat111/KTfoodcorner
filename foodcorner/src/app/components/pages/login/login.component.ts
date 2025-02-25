import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from "../title/title.component";
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, TitleComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmited=false;
  returnUrl='';
  
  constructor(private fb:FormBuilder, private userService:UserService, private activatedRoute:ActivatedRoute, private router:Router){}

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      email:['', Validators.required, Validators.email],
      password:['', Validators.required]
    })
    this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  get fc(){
    return this.loginForm.controls;
  }
  submit(){
    this.isSubmited=true;
    if(this.loginForm.invalid) return;

    this.userService.login({email:this.fc.email.value, password:this.fc.password.value}).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}
