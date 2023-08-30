import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  loggedIn = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn)=> {
      this.loggedIn = loggedIn
    })
  }

  logout() {
    this.authService.logout();
  }

}
