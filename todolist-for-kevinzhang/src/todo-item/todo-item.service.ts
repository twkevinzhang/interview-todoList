import { Injectable } from '@nestjs/common';
import { TodoItemForm, TodoItem } from 'src/graphql.schema';

@Injectable()
export class TodoItemService {
  constructor() {}

  async findOne(id: string): Promise<TodoItem | null> {
    return Promise.reject('Method not implemented.');
  }

  async findAll(): Promise<TodoItem[]> {
    return Promise.reject('Method not implemented.');
  }

  async create(form: TodoItemForm): Promise<TodoItem> {
    return Promise.reject('Method not implemented.');
  }

  async update(id: string, form: TodoItemForm): Promise<TodoItem> {
    return Promise.reject('Method not implemented.');
  }

  async delete(id: string): Promise<TodoItem> {
    return Promise.reject('Method not implemented.');
  }
}
