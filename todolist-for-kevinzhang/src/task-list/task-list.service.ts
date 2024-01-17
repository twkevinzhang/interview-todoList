import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { TaskList } from 'src/graphql.schema';
import { TaskListRepo } from 'src/task-list/task-list.repo';

@Injectable()
export class TaskListService {
  constructor(private taskListRepo: TaskListRepo) {}

  async taskList(id: string): Promise<TaskList> {
    const result = await this.taskListRepo.findByID(id);
    if (!result) {
      throw new NotFoundException();
    }
    return this.toOutput(result);
  }

  async create(form: {}): Promise<TaskList> {
    throw new NotImplementedException();
  }

  toOutput(from: { id: string; title: string }): TaskList {
    return {
      ...new TaskList(),
      id: from.id,
      title: from.title,
    };
  }
}
