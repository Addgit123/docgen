import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { SendService } from '../send.service'; 
import { FormControl } from '@angular/forms';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private send:SendService,private router: Router) { }

  fileList: any = [];
  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file)
    console.log(" this file",this.fileList)
    this.upload()
    return false
  }; 

  name = new FormData();



  upload()
  {
    for( let index=0;index<this.fileList.length;index++)
    {
      var count =0;
      this.name.append('attachment',this.fileList[index],this.fileList[index].name)


    }
    
    this.send.transfer(this.name).subscribe(res=>{
      console.log("backend ",res)
    })
  }

  form_page(){
    this.router.navigate(['/form']);  // define your component where you want to go
  }
map_page()
  {
    this.router.navigate(['/map']);
  }
  
 

  ngOnInit(): void {
  }

}
