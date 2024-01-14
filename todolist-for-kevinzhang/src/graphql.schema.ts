
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class FileInput {
    filename: string;
    contentType: string;
    content: Upload;
}

export class TodoItemForm {
    taskListID?: Nullable<string>;
    title?: Nullable<string>;
    putOwnersUIDs?: Nullable<string[]>;
    putFollowersUIDs?: Nullable<string[]>;
    start?: Nullable<RFC3339>;
    due?: Nullable<RFC3339>;
    description?: Nullable<string>;
    newAttachments?: Nullable<FileInput[]>;
    newComments?: Nullable<string[]>;
    isCompleted?: Nullable<boolean>;
}

export class UserForm {
    email: string;
    name: string;
    password: string;
}

export abstract class IQuery {
    abstract taskList(id: string): Nullable<TaskList> | Promise<Nullable<TaskList>>;

    abstract todoItem(id: string): Nullable<TodoItem> | Promise<Nullable<TodoItem>>;
}

export abstract class IMutation {
    abstract createTaskList(title: string): TaskList | Promise<TaskList>;

    abstract deleteTaskList(id: string, form: TodoItemForm): boolean | Promise<boolean>;

    abstract createTodoItem(form: TodoItemForm, parentID?: Nullable<string>): TodoItem | Promise<TodoItem>;

    abstract updateTodoItem(id: string, form: TodoItemForm): boolean | Promise<boolean>;

    abstract deleteTodoItem(id: string): boolean | Promise<boolean>;

    abstract deleteAttachment(id: string): boolean | Promise<boolean>;

    abstract deleteComment(id: string): boolean | Promise<boolean>;
}

export class TaskList {
    id: string;
    title: string;
    todoItems: TodoItem[];
}

export class TodoItem {
    id: string;
    taskListID?: Nullable<string>;
    taskList?: Nullable<TaskList>;
    title?: Nullable<string>;
    ownersUID: string[];
    owners: User[];
    followersUIDs: string[];
    followers: User[];
    start?: Nullable<RFC3339>;
    due?: Nullable<RFC3339>;
    description?: Nullable<string>;
    parentID?: Nullable<string>;
    parent?: Nullable<TodoItem>;
    childrenIDs: string[];
    children: TodoItem[];
    attachmentsIDs: string[];
    attachments: Attachment[];
    commentsIDs: string[];
    comments: Comment[];
    isCompleted: boolean;
    createdAt: RFC3339;
    createdBy: User;
    updatedAt: RFC3339;
    updatedBy: User;
}

export class Comment {
    id: string;
    todoItemID: string;
    content: string;
    createdAt: RFC3339;
    createdBy: User;
}

export class Attachment {
    id: string;
    todoItemID: string;
    name: string;
    url: string;
    createdAt: RFC3339;
    createdBy: User;
}

export class User {
    uid: string;
    email: string;
    name: string;
    createdTodoItems: TodoItem[];
    ownedTodoItems: TodoItem[];
    followedTodoItems: TodoItem[];
    createdAt: RFC3339;
    updatedAt: RFC3339;
}

export type RFC3339 = any;
export type Upload = any;
type Nullable<T> = T | null;
