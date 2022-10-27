
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {catchError, map, Observable, of} from "rxjs";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {

  var_list: any[]=[];
  question:any[]=[];

  constructor(private http: HttpClient, private fb: FormBuilder,private router: Router) { }

  q_form= this.fb.group({
    question_list:this.fb.array([])
 })

 get form_questions() : FormArray {
  return this.q_form.get("question_list") as FormArray
}

submit()
 {
  console.log('form value is ',this.q_form.value)
  console.log('the type is ', typeof(this.q_form.value))
  this.http.post('http://127.0.0.1:5000/insert',this.q_form.value).subscribe(res =>{console.log(res)});

 
 }
  

 load(var_list:any)
{
for (let i =0;i< var_list.length;i++)
 {
  const control =  this.fb.group({
    var_id:[var_list[i]['var_id']],
    variable:[var_list[i]['variable']],
    q_id:['']
   
    
   });
  (this.q_form.get('question_list') as FormArray).push(control)
   console.log(this.q_form.value)
 }
}


  docgen_page()
  {
    this.router.navigate(['/docgen']);
  }




  ngOnInit(): void {

    //getting variables
    this.http.get<any>('http://127.0.0.1:5000/variable').subscribe(res=>{
      this.var_list=res
      console.log('the type is ',typeof(this.var_list))
      console.log('the val is ',this.var_list)
      this.load(res)
      

    })

  

    //getting questions
    this.http.get<any>('http://127.0.0.1:5000/question').subscribe(res=>{
      this.question=res
      console.log('the type is ',typeof(this.question))
      console.log('the question is ',this.question)
    })
  }

}
