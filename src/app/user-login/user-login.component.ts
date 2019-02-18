import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  wrongCredentials = false;
  get val() { return this.loginForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid)
     {
        return;
     }  
     this.loading = true;
      this.authenticationService.login(this.loginForm.value)
      .subscribe(
       data =>
        {          
          if(data===true) {
            this.router.navigate(['/resourcedetails']);
            let userdetails = JSON.stringify(this.val.username.value);
            localStorage.setItem("UserName",userdetails);
          }
          else {
            this.wrongCredentials = true;
          }
         }
      );
  }

}
