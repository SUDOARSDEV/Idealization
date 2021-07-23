import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Globallist } from 'src/app/utilities/globallist';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
declare var Toastify:any;
declare var $:any;

@Component({
  selector: 'app-courses-data',
  templateUrl: './courses-data.component.html',
  styleUrls: ['./courses-data.component.css']
})
export class CoursesDataComponent implements OnInit {

  CourseList:any;
  ColumeName:any;
  glist: Globallist = new Globallist();
  CreateCouresForm = new FormGroup({Name:new FormControl(),Price: new FormControl(), CourseImage: new FormControl()});
  Filedata:any;
  courseinfo:any;

  constructor(private apirequest: ApiRequestService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.getCoursesList();
  }

  getCoursesList(){ 
    this.apirequest.getAPI('courses').subscribe(res => {
        this.glist.printInfo(res);
        let Coursesdata:any = res;
        if(Coursesdata.status == true) {
          this.CourseList = Coursesdata.courses;
          if(this.CourseList.length != 0){
            this.ColumeName = Object.keys(this.CourseList[0]);
            this.glist.printInfo(this.ColumeName);
            this.glist.printInfo(this.CourseList); 
          } 
        }      
                
    }, error => {
     this.glist.printInfo(error);
     this.CourseList = 'error';
    }); 
  }

  Update(data:any){
    this.glist.printInfo(data);
    this.courseinfo = data;
    this.CreateCouresForm.controls['Name'].setValue(this.courseinfo?.Name);
    this.CreateCouresForm.controls['Price'].setValue(this.courseinfo?.Price);
  }

  Delete(data:any){
    this.glist.printInfo(data);
    this.courseinfo = data;
    this.apirequest.DeleteAPI('courses',this.courseinfo._id).subscribe(res => {
      this.glist.printInfo(res);
      let response: any = res;
      if(response.status == true){
        this.Message(response.message);
        this.ngOnInit();
      } else {
        this.Message(response.message);
      }
    });
  }

  Create(data:any){

    let CourseData = new FormData();
    CourseData.append("Name",data.Name);
    CourseData.append("Price",data.Price);
    CourseData.append("courseImage",this.Filedata);
    
    this.apirequest.postAPI('courses',CourseData).subscribe((res) => {
      this.glist.printInfo(res);
      let data:any = res;
      if(data.status == true){
        this.Message(data.message);
        this.ngOnInit();
        this.CreateCourseForm();
      } else {
        this.glist.printInfo(data);
      }
    });
  }

  onFileChange(file:any){
    this.glist.printInfo(file);
    this.Filedata = file.target.files[0];
  }

  CreateCourseForm() {
    this.CreateCouresForm = this.fb.group({
      'Name': [''],
      'Price': [''],
      'CourseImage': ['']
    }
    );
  }

  Message(data:any){
    Toastify({
      text: data,
      duration: 3000,
      newWindow: true,
      close: false,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      // backgroundColor: "#323232",
      stopOnFocus: true, // Prevents dismissing of toast on hover
      onClick: function(){} // Callback after click
    }).showToast();    
  }

  UpdateSend(data:any){
    let CourseData = new FormData();
    CourseData.append("CouresId",this.courseinfo._id);
    CourseData.append("Name",data.Name);
    CourseData.append("Price",data.Price);
    if(this.Filedata == undefined) {
      CourseData.append("action",'notimage');
      CourseData.append("courseImage",'');
    } else {
      CourseData.append("action",'image');
      CourseData.append("courseImage",this.Filedata);
    }
   
    
    this.apirequest.postAPI('courses/update',CourseData).subscribe((res) => {
      this.glist.printInfo(res);
      let data:any = res;
      if(data.status == true){
        this.Message(data.message);
        this.ngOnInit();
        this.CreateCourseForm();
        $("#exampleModal1").modal('hide');
      } else {
        this.glist.printInfo(data);
      }
    });
  }
}
