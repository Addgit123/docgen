import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form, FormArray, FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {catchError, map, Observable, of} from "rxjs";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-docgen',
  templateUrl: './docgen.component.html',
  styleUrls: ['./docgen.component.css']
})
export class DocgenComponent implements OnInit {

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  doc_form= this.fb.group({
    value_list:this.fb.array([])
 })

 get form_values() : FormArray {
  return this.doc_form.get("value_list") as FormArray
}


 load(doc_list:any)
 {
 for (let i =0;i< doc_list.length;i++)
  {
   const control =  this.fb.group({
    map_id:[doc_list[i]['map_id']],
     q_id:[doc_list[i]['q_id']],
     question:[doc_list[i]['question']],
     values:[''] 
    });
   (this.doc_form.get('value_list') as FormArray).push(control)
    console.log('the value is ',this.doc_form.value)
  }
 }

 submit()
 {
  this.http.post('http://127.0.0.1:5000/receive',this.doc_form.value).subscribe(res=>{
    console.log(res)
  })
  this.router.navigate(['download'])
  
 }



 


  ngOnInit(): void {

    this.http.get('http://127.0.0.1:5000/retrieve').subscribe(res=>{
      console.log(res)
      this.load(res)
    })
  }

}
