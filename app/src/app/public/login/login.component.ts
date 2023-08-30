import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: '',
      password: ''
    })
  }

  submit(){
    const formData = this.form.getRawValue()

    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'Y5NLzuUvHMpUQiEa2bXbnOWrmfmHV4K0Qz5Nbuyg',
      scope: '*'
    }

    this.http.post('http://localhost:8000/oauth/token', data).subscribe(
      async (result: any) => {
        this.authService.login(result.access_token);
        await this.router.navigate(['/private'])
      },
      error => {
        console.log('failed')
        console.log(error)
      }
    )
  }
}
