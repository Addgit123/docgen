import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  upload_page(){
    this.router.navigate(['/upload']);  // define your component where you want to go
}

form_page(){
  this.router.navigate(['/form']);  // define your component where you want to go
}


  ngOnInit(): void {
  }

}
