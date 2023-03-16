import { Todo } from './../../Todo';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  title!: string;
  desc!: string;
  // @Input()
  // todo!: Todo;

  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  // onClick(todo: Todo) {
  //   this.addTodo.emit(todo);
  //   console.log('onClick addTodo has been triggered!');
  // }
  onSubmit() {
    const todo = {
      sno: 8,
      title: this.title,
      desc: this.desc,
      active: true,
    };
    this.todoAdd.emit(todo);
  }
}
