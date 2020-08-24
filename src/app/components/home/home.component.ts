import { TodoService } from './../../services/todo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Todo } from '../../models/todo.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Variables.
  subscription: Subscription;

  data = {
    pendings: [],
    inProgress: [],
    done: [],
  };

  constructor(
    private todoService: TodoService 
  ) {}

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    let todoTypeId = event.container.element.nativeElement["dataTodoType"];
    for (let i = 0; i < event.container.data.length; i++) {
      const obj = event.container.data[i];
      obj.OrderNumber = i + 1;
      obj.TodoTypeId = todoTypeId;
      this.updateTodo(obj);
    }
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllTodos() {
    this.subscription = this.todoService.getAllTodos()
    .subscribe( 
      (res) => {
      Object.keys(res).forEach((key) => {
        this.data[key] = res[key];
      });
    },
    (err) => {
      console.log(err);
    });
  }

  addTodo(todo) {
    const obj = new Todo();
    obj.Name = todo.value;
    obj.TodoTypeId = 1;
    obj.OrderNumber = this.data.pendings.length > 0 ? this.data.pendings[this.data.pendings.length - 1].OrderNumber + 1 : 1;
    
    console.log(obj);
    
    this.subscription = this.todoService.addTodo(obj)
    .subscribe( (res) => {
      
    },
    (err) => {
      console.log(err);
    });
  }

  updateTodo(todo) {
    this.subscription = this.todoService.updateTodo(todo)
    .subscribe( (res) => {
      
    },
    (err) => {
      console.log(err);
    });
  }

  deleteTodo(id) {
    if (confirm("Are you sure?")) {
      this.subscription = this.todoService.deleteTodo(id)
      .subscribe( (res) => {
        this.getAllTodos();
      },
      (err) => {
        console.log(err);
      }); 
    }
  }
}
