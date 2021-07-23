import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Globallist } from 'src/app/utilities/globallist';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
declare var Toastify:any;
declare var $:any;

@Component({
  selector: 'app-instructor-data',
  templateUrl: './instructor-data.component.html',
  styleUrls: ['./instructor-data.component.css']
})
export class InstructorDataComponent implements OnInit {
  
  CourseList:any;
  InstructorList:any;
  ColumeName:any;
  glist: Globallist = new Globallist();
  CreateInstructorForm = new FormGroup({Name:new FormControl(),CourseId: new FormControl()});
  instructorinfo:any;

  constructor(private apirequest: ApiRequestService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getInstructorList();
    this.getCoursesList();
  }

  getInstructorList(){
    this.apirequest.getAPI('instructor').subscribe(res => {
      this.glist.printInfo(res);
      let Instructordata:any = res;
      if(Instructordata.status == true) {
        this.InstructorList = Instructordata.instructor;
        if(this.InstructorList.length != 0){
          this.ColumeName = Object.keys(this.InstructorList[0]);
          this.glist.printInfo(this.ColumeName);
          this.glist.printInfo(this.InstructorList);  
        } 
      }      
              
  }, error => {
   this.glist.printInfo(error);
   this.InstructorList = 'error';
  }); 
  }

  Update(data:any){
    this.glist.printInfo(data);
    this.instructorinfo = data;
    let int_Id:any = this.instructorinfo?.CourseId;
    this.CreateInstructorForm.controls['Name'].setValue(this.instructorinfo?.Name);
    this.CreateInstructorForm.controls['CourseId'].setValue(int_Id?._id);
  }

  Delete(data:any){
    this.glist.printInfo(data);
    this.instructorinfo = data;
    this.apirequest.DeleteAPI('instructor',this.instructorinfo._id).subscribe(res => {
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

  Create(data:any){
    this.glist.printInfo(data);
    
    let CourseData = {
      Name: data.Name,
      CourseId: data.CourseId
    }
    
    this.apirequest.postAPI('instructor',CourseData).subscribe((res) => {
      this.glist.printInfo(res);
      let data:any = res;
      if(data.status == true){
        this.Message(data.message);
        this.ngOnInit();
        this.CreateInstructorsForm();
      } else {
        this.glist.printInfo(data);
      }
    });
  }

  CreateInstructorsForm() {
    this.CreateInstructorForm = this.fb.group({
      'Name': [''],
      'CourseId': ['']
    }
    );
  }

  UpdateSend(data:any){
    let InstructorData = [
      {"propName":"Name","value":  data.Name},
      {"propName":"CourseId","value":  data.CourseId}
    ]
    
    this.apirequest.patchAPI('instructor/'+this.instructorinfo._id,InstructorData).subscribe((res) => {
      this.glist.printInfo(res);
      let data:any = res;
      if(data.status == true){
        this.Message(data.message);
        this.ngOnInit();
        this.CreateInstructorsForm();
        $("#updateIns").modal('hide');
      } else {
        this.glist.printInfo(data);
      }
    });
  }

  getCoursesList(){ 
    this.apirequest.getAPI('courses').subscribe(res => {
        this.glist.printInfo(res);
        let Coursesdata:any = res;
        if(Coursesdata.status == true) {
          this.CourseList = Coursesdata.courses;  
        }      
                
    }, error => {
     this.glist.printInfo(error);
     this.CourseList = 'error';
    }); 
  }

  changeSuit(data:any){
    console.log(data.value);
    
  }

}
