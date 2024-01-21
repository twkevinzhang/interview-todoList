
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { FileUpload } from 'graphql-upload';

export enum TodoItemsSortBy {
    CREATED_AT_ASC = "CREATED_AT_ASC",
    CREATED_AT_DESC = "CREATED_AT_DESC",
    DUE_ASC = "DUE_ASC",
    DUE_DESC = "DUE_DESC",
    CREATED_BY_ASC = "CREATED_BY_ASC",
    CREATED_BY_DESC = "CREATED_BY_DESC"
}

export class SpectaQLOption {
    key: string;
    value: string;
}

export class FileInput {
    filename: string;
    contentType: string;
    content: Upload;
}

export class StringsFilter {
    contains?: Nullable<string[]>;
    notContains?: Nullable<string[]>;
    isNull?: Nullable<boolean>;
}

export class DateRange {
    start?: Nullable<RFC3339>;
    due?: Nullable<RFC3339>;
}

export class TodoItemForm {
    taskListID?: Nullable<string>;
    title?: Nullable<string>;
    putOwnersUIDs?: Nullable<string[]>;
    putFollowersUIDs?: Nullable<string[]>;
    duration?: Nullable<DateRange>;
    description?: Nullable<string>;
    newAttachments?: Nullable<FileInput[]>;
    newComments?: Nullable<string[]>;
    isCompleted?: Nullable<boolean>;
}

export class TodoItemsFilters {
    taskListID?: Nullable<string>;
    creatorUID?: Nullable<StringsFilter>;
    ownerUID?: Nullable<StringsFilter>;
    followerUID?: Nullable<StringsFilter>;
    duration?: Nullable<DateRange>;
    isCompleted?: Nullable<boolean>;
}

export class UserForm {
    username: string;
    password: string;
    email?: Nullable<string>;
}

export abstract class IMutation {
    abstract signUp(form: UserForm): User | Promise<User>;

    abstract signIn(username: string, password: string): Auth | Promise<Auth>;

    abstract refreshToken(oldAccessToken: string): Auth | Promise<Auth>;

    abstract createTaskList(title: string): TaskList | Promise<TaskList>;

    abstract deleteTaskList(id: string, form: TodoItemForm): boolean | Promise<boolean>;

    abstract createTodoItem(form: TodoItemForm, parentID?: Nullable<string>): TodoItem | Promise<TodoItem>;

    abstract updateTodoItem(id: string, form: TodoItemForm): boolean | Promise<boolean>;

    abstract deleteTodoItem(id: string): boolean | Promise<boolean>;

    abstract deleteAttachment(id: string): boolean | Promise<boolean>;

    abstract deleteComment(id: string): boolean | Promise<boolean>;
}

export class Auth {
    accessToken: string;
}

export abstract class IQuery {
    abstract taskList(id: string): Nullable<TaskList> | Promise<Nullable<TaskList>>;

    abstract todoItem(id: string): Nullable<TodoItem> | Promise<Nullable<TodoItem>>;

    abstract todoItems(filter?: Nullable<TodoItemsFilters>, sortBy?: Nullable<TodoItemsSortBy>): TodoItem[] | Promise<TodoItem[]>;

    abstract user(uid: string): User | Promise<User>;

    abstract users(): User[] | Promise<User[]>;
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
    owners: User[];
    followers: User[];
    start?: Nullable<RFC3339>;
    due?: Nullable<RFC3339>;
    description?: Nullable<string>;
    parentID?: Nullable<string>;
    parent?: Nullable<TodoItem>;
    children: TodoItem[];
    attachments: Attachment[];
    comments: Comment[];
    isCompleted: boolean;
    createdAt: RFC3339;
    createdByUID: string;
    createdBy: User;
    updatedAt: RFC3339;
    updatedByUID: string;
    updatedBy: User;
}

export class Comment {
    id: string;
    todoItemID: string;
    content: string;
    createdAt: RFC3339;
    createdByUID: string;
    createdBy: User;
}

export class Attachment {
    id: string;
    todoItemID: string;
    name: string;
    url: string;
    createdAt: RFC3339;
    createdByUID: string;
    createdBy: User;
}

export class User {
    uid: string;
    username: string;
    nickname?: Nullable<string>;
    email?: Nullable<string>;
}

export type RFC3339 = any;
export type Upload = Promise<FileUpload>;
export type Int64 = any;
type Nullable<T> = T | null;
