import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor( private fb: FormBuilder, private http:HttpClient,private router: Router) { }
 

  CreateForm = this.fb.group({
    form_name:[''],
    form_q:this.fb.array([])
    //form_var

  })

  


  get questioncontrol()
  {
    return this.CreateForm.get('form_q') as FormArray;
  }

  ngOnInit(): void {
  }

  addQuestion(){
   const control = new FormControl('');
    (this.CreateForm.get('form_q') as FormArray).push(control)
  }

  submit()
  {
    console.log('the form data is ',this.CreateForm.value)
    this.http.post('http://127.0.0.1:5000/table',this.CreateForm.value).subscribe(res =>{console.log(res)});

    
  }

  map_page()
  {
    this.router.navigate(['/map']);
  }
  upload_page(){
    this.router.navigate(['/upload']);  // define your component where you want to go
}
 

}
