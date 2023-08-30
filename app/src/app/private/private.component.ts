import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    this.http.get('http://localhost:8000/user', {headers: headers}).subscribe(
      result => this.user = result,
      error => {
        console.log(error)
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    )
  }
}
