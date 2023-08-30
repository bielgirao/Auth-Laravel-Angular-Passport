import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    })
  }

  submit(){
    const formData = this.form.getRawValue();

    this.http.post('http://localhost:8000/register', formData).subscribe(
      result => {
        console.log(result)
        // localStorage.setItem('token', result.access_token);
        // this.router.navigate(['/private'])
      },
      error => {
        console.log('failed')
        console.log(error)
      }
    )
  }
}
