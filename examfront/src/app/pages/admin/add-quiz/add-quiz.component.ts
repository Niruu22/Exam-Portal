import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[
    {
      cid:43,
      title:'programming'
    },
    {
      cid:43,
      title:'programming'
    }
  ];



  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestion:'',
    active: 'true',
    category:{
      cid :'',
    },
  };

  constructor(private _cat: CategoryService, private _snack:MatSnackBar, private _quiz:QuizService) { }

  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data:any)=>{
        //categories load
        this.categories=data;
        console.log(this.categories);
        
      },

      (error) => {
        Swal.fire('Error!! ', 'Error while adding quiz', 'error');
        console.log(error);
      }
    );

  }

  // 
  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    
    
     }


    // call server

    this._quiz.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success', 'quiz is added', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestion: '',
          active:'true',
          category: {
            cid: '',
          },
        };
      },

      (error) => {
        Swal.fire('Error!! ', 'Error while adding quiz', 'error');
        console.log(error);
      }
    );

}
}
