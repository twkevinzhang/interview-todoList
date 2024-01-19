import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  RFC3339: { input: any; output: any; }
  Upload: { input: any; output: any; }
  Int64: { input: any; output: any; }
};

export type Query = {
  __typename?: 'Query';
  /** 傳入 taskList id 取得指定 TaskList */
  taskList?: Maybe<TaskList>;
  todoItem?: Maybe<TodoItem>;
  todoItems: Array<TodoItem>;
  user: User;
  users: Array<User>;
};


export type QueryTaskListArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTodoItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTodoItemsArgs = {
  filter?: InputMaybe<TodoItemsFilters>;
  sortBy?: InputMaybe<TodoItemsSortBy>;
};


export type QueryUserArgs = {
  uid: Scalars['String']['input'];
};

export type TaskList = {
  __typename?: 'TaskList';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  todoItems: Array<TodoItem>;
};

/** TodoItem 是最重要的 model，代表一個待辦事項 */
export type TodoItem = {
  __typename?: 'TodoItem';
  /** TodoItem 可以有多個附件，也可能是空陣列 */
  attachments: Array<Attachment>;
  /** TodoItem 可以是一個巢狀的結構，children 是子任務 */
  children: Array<TodoItem>;
  /** TodoItem 可以有多個留言，也可能是空陣列 */
  comments: Array<Comment>;
  /** 建立時間 */
  createdAt: Scalars['RFC3339']['output'];
  /** 建立者 */
  createdBy: User;
  /** 建立者 UID */
  createdByUID: Scalars['String']['output'];
  /** 內文 */
  description?: Maybe<Scalars['String']['output']>;
  /** 到期日，可能因為沒有設定而是 null */
  due?: Maybe<Scalars['RFC3339']['output']>;
  /** 有多個關注人，也可能是空陣列 */
  followers: Array<User>;
  id: Scalars['ID']['output'];
  /** 是否完成 */
  isCompleted: Scalars['Boolean']['output'];
  /** 有多個執行人，也可能是空陣列 */
  owners: Array<User>;
  /** TodoItem 可以是一個巢狀的結構，parent 是父任務 */
  parent?: Maybe<TodoItem>;
  /** TodoItem 可以是一個巢狀的結構，parent 是父任務 */
  parentID?: Maybe<Scalars['ID']['output']>;
  /** 開始日期，可能因為沒有設定而是 null */
  start?: Maybe<Scalars['RFC3339']['output']>;
  /** TodoItem 可以隸屬於一個 TaskList */
  taskList?: Maybe<TaskList>;
  /** TodoItem 可以隸屬於一個 TaskList */
  taskListID?: Maybe<Scalars['ID']['output']>;
  /** 不一定有 title */
  title?: Maybe<Scalars['String']['output']>;
  /** 最後更新時間 */
  updatedAt: Scalars['RFC3339']['output'];
  /** 最後更新者 */
  updatedBy: User;
  /** 最後更新者 UID */
  updatedByUID: Scalars['String']['output'];
};

export type Attachment = {
  __typename?: 'Attachment';
  createdAt: Scalars['RFC3339']['output'];
  createdBy: User;
  createdByUID: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  todoItemID: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  uid: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['RFC3339']['output'];
  createdBy: User;
  createdByUID: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  todoItemID: Scalars['ID']['output'];
};

/** 用於篩選 todoItems 的回傳資料 */
export type TodoItemsFilters = {
  creatorUID?: InputMaybe<StringsFilter>;
  duration?: InputMaybe<DateRange>;
  followerUID?: InputMaybe<StringsFilter>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  ownerUID?: InputMaybe<StringsFilter>;
  taskListID?: InputMaybe<Scalars['ID']['input']>;
};

/** StringsFilter */
export type StringsFilter = {
  /** 如果不為 null，代表回傳字串需包含 */
  contains?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 如果為 true，代表回傳字串需為 null */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** 如果不為 null，代表回傳字串不可包含 */
  notContains?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** DateRange */
export type DateRange = {
  /** 到期日 */
  due?: InputMaybe<Scalars['RFC3339']['input']>;
  /** 開始日期 */
  start?: InputMaybe<Scalars['RFC3339']['input']>;
};

/** 用於排序 todoItems 的回傳資料 */
export enum TodoItemsSortBy {
  /** 依據建立時間正序 */
  CreatedAtAsc = 'CREATED_AT_ASC',
  /** 依據建立時間倒序 */
  CreatedAtDesc = 'CREATED_AT_DESC',
  /** 依據創建者正序 */
  CreatedByAsc = 'CREATED_BY_ASC',
  /** 依據創建者倒序 */
  CreatedByDesc = 'CREATED_BY_DESC',
  /** 依據任務到期時間正序 */
  DueAsc = 'DUE_ASC',
  /** 依據任務到期時間倒序 */
  DueDesc = 'DUE_DESC'
}

export type Mutation = {
  __typename?: 'Mutation';
  createTaskList: TaskList;
  createTodoItem: TodoItem;
  deleteAttachment: Scalars['Boolean']['output'];
  deleteComment: Scalars['Boolean']['output'];
  deleteTaskList: Scalars['Boolean']['output'];
  deleteTodoItem: Scalars['Boolean']['output'];
  refreshToken: Auth;
  signIn: Auth;
  signUp: User;
  updateTodoItem: Scalars['Boolean']['output'];
};


export type MutationCreateTaskListArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateTodoItemArgs = {
  form: TodoItemForm;
  parentID?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteAttachmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskListArgs = {
  form: TodoItemForm;
  id: Scalars['ID']['input'];
};


export type MutationDeleteTodoItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRefreshTokenArgs = {
  oldAccessToken: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  form: UserForm;
};


export type MutationUpdateTodoItemArgs = {
  form: TodoItemForm;
  id: Scalars['ID']['input'];
};

export type TodoItemForm = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<DateRange>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  /** 上傳附件，這不會覆蓋舊附件 */
  newAttachments?: InputMaybe<Array<FileInput>>;
  /** 新增留言內容。新增後的格式為 `{ content: '傳入的字串', createdByUID: '從 request 的 token 解析'}`，如需刪除，請呼叫 mutation `deleteAttachment` */
  newComments?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 指派關注人，這將覆蓋舊資料 */
  putFollowersUIDs?: InputMaybe<Array<Scalars['String']['input']>>;
  /** 指派執行人，這將覆蓋舊資料 */
  putOwnersUIDs?: InputMaybe<Array<Scalars['String']['input']>>;
  taskListID?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FileInput = {
  content: Scalars['Upload']['input'];
  contentType: Scalars['String']['input'];
  filename: Scalars['String']['input'];
};

export type Auth = {
  __typename?: 'Auth';
  accessToken: Scalars['String']['output'];
};

export type UserForm = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SpectaQlOption = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type SignInMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'Auth', accessToken: string } };

export type TodoItemsQueryVariables = Exact<{
  filter?: InputMaybe<TodoItemsFilters>;
  sortBy?: InputMaybe<TodoItemsSortBy>;
}>;


export type TodoItemsQuery = { __typename?: 'Query', todoItems: Array<{ __typename?: 'TodoItem', id: string, title?: string | null, createdAt: any, due?: any | null, isCompleted: boolean, createdBy: { __typename?: 'User', uid: string, username: string }, comments: Array<{ __typename?: 'Comment', id: string, content: string }>, children: Array<{ __typename?: 'TodoItem', id: string, title?: string | null }> }> };

export type TodoItemQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TodoItemQuery = { __typename?: 'Query', todoItem?: { __typename?: 'TodoItem', id: string, title?: string | null, createdAt: any, due?: any | null, description?: string | null, owners: Array<{ __typename?: 'User', uid: string, username: string }>, followers: Array<{ __typename?: 'User', uid: string, username: string }>, comments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, createdBy: { __typename?: 'User', uid: string, username: string } }>, children: Array<{ __typename?: 'TodoItem', id: string, title?: string | null }>, attachments: Array<{ __typename?: 'Attachment', id: string, name: string, url: string }> } | null };

export type CreateTodoItemMutationVariables = Exact<{
  form: TodoItemForm;
  parentID?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateTodoItemMutation = { __typename?: 'Mutation', createTodoItem: { __typename?: 'TodoItem', id: string } };

export type UpdateTodoItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  form: TodoItemForm;
}>;


export type UpdateTodoItemMutation = { __typename?: 'Mutation', updateTodoItem: boolean };

export type DeleteTodoItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTodoItemMutation = { __typename?: 'Mutation', deleteTodoItem: boolean };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', uid: string, username: string }> };


export const SignInDocument = gql`
    mutation signIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    accessToken
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const TodoItemsDocument = gql`
    query todoItems($filter: TodoItemsFilters, $sortBy: TodoItemsSortBy) {
  todoItems(filter: $filter, sortBy: $sortBy) {
    createdBy {
      uid
      username
    }
    id
    title
    createdAt
    due
    isCompleted
    comments {
      id
      content
    }
    children {
      id
      title
    }
  }
}
    `;

/**
 * __useTodoItemsQuery__
 *
 * To run a query within a React component, call `useTodoItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodoItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodoItemsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      sortBy: // value for 'sortBy'
 *   },
 * });
 */
export function useTodoItemsQuery(baseOptions?: Apollo.QueryHookOptions<TodoItemsQuery, TodoItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodoItemsQuery, TodoItemsQueryVariables>(TodoItemsDocument, options);
      }
export function useTodoItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodoItemsQuery, TodoItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodoItemsQuery, TodoItemsQueryVariables>(TodoItemsDocument, options);
        }
export function useTodoItemsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TodoItemsQuery, TodoItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TodoItemsQuery, TodoItemsQueryVariables>(TodoItemsDocument, options);
        }
export type TodoItemsQueryHookResult = ReturnType<typeof useTodoItemsQuery>;
export type TodoItemsLazyQueryHookResult = ReturnType<typeof useTodoItemsLazyQuery>;
export type TodoItemsSuspenseQueryHookResult = ReturnType<typeof useTodoItemsSuspenseQuery>;
export type TodoItemsQueryResult = Apollo.QueryResult<TodoItemsQuery, TodoItemsQueryVariables>;
export const TodoItemDocument = gql`
    query todoItem($id: ID!) {
  todoItem(id: $id) {
    id
    title
    createdAt
    due
    owners {
      uid
      username
    }
    description
    followers {
      uid
      username
    }
    comments {
      id
      content
      createdBy {
        uid
        username
      }
      createdAt
    }
    children {
      id
      title
    }
    attachments {
      id
      name
      url
    }
  }
}
    `;

/**
 * __useTodoItemQuery__
 *
 * To run a query within a React component, call `useTodoItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodoItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodoItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTodoItemQuery(baseOptions: Apollo.QueryHookOptions<TodoItemQuery, TodoItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodoItemQuery, TodoItemQueryVariables>(TodoItemDocument, options);
      }
export function useTodoItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodoItemQuery, TodoItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodoItemQuery, TodoItemQueryVariables>(TodoItemDocument, options);
        }
export function useTodoItemSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TodoItemQuery, TodoItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TodoItemQuery, TodoItemQueryVariables>(TodoItemDocument, options);
        }
export type TodoItemQueryHookResult = ReturnType<typeof useTodoItemQuery>;
export type TodoItemLazyQueryHookResult = ReturnType<typeof useTodoItemLazyQuery>;
export type TodoItemSuspenseQueryHookResult = ReturnType<typeof useTodoItemSuspenseQuery>;
export type TodoItemQueryResult = Apollo.QueryResult<TodoItemQuery, TodoItemQueryVariables>;
export const CreateTodoItemDocument = gql`
    mutation createTodoItem($form: TodoItemForm!, $parentID: ID) {
  createTodoItem(form: $form, parentID: $parentID) {
    id
  }
}
    `;
export type CreateTodoItemMutationFn = Apollo.MutationFunction<CreateTodoItemMutation, CreateTodoItemMutationVariables>;

/**
 * __useCreateTodoItemMutation__
 *
 * To run a mutation, you first call `useCreateTodoItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoItemMutation, { data, loading, error }] = useCreateTodoItemMutation({
 *   variables: {
 *      form: // value for 'form'
 *      parentID: // value for 'parentID'
 *   },
 * });
 */
export function useCreateTodoItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoItemMutation, CreateTodoItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTodoItemMutation, CreateTodoItemMutationVariables>(CreateTodoItemDocument, options);
      }
export type CreateTodoItemMutationHookResult = ReturnType<typeof useCreateTodoItemMutation>;
export type CreateTodoItemMutationResult = Apollo.MutationResult<CreateTodoItemMutation>;
export type CreateTodoItemMutationOptions = Apollo.BaseMutationOptions<CreateTodoItemMutation, CreateTodoItemMutationVariables>;
export const UpdateTodoItemDocument = gql`
    mutation updateTodoItem($id: ID!, $form: TodoItemForm!) {
  updateTodoItem(id: $id, form: $form)
}
    `;
export type UpdateTodoItemMutationFn = Apollo.MutationFunction<UpdateTodoItemMutation, UpdateTodoItemMutationVariables>;

/**
 * __useUpdateTodoItemMutation__
 *
 * To run a mutation, you first call `useUpdateTodoItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoItemMutation, { data, loading, error }] = useUpdateTodoItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      form: // value for 'form'
 *   },
 * });
 */
export function useUpdateTodoItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoItemMutation, UpdateTodoItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTodoItemMutation, UpdateTodoItemMutationVariables>(UpdateTodoItemDocument, options);
      }
export type UpdateTodoItemMutationHookResult = ReturnType<typeof useUpdateTodoItemMutation>;
export type UpdateTodoItemMutationResult = Apollo.MutationResult<UpdateTodoItemMutation>;
export type UpdateTodoItemMutationOptions = Apollo.BaseMutationOptions<UpdateTodoItemMutation, UpdateTodoItemMutationVariables>;
export const DeleteTodoItemDocument = gql`
    mutation deleteTodoItem($id: ID!) {
  deleteTodoItem(id: $id)
}
    `;
export type DeleteTodoItemMutationFn = Apollo.MutationFunction<DeleteTodoItemMutation, DeleteTodoItemMutationVariables>;

/**
 * __useDeleteTodoItemMutation__
 *
 * To run a mutation, you first call `useDeleteTodoItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoItemMutation, { data, loading, error }] = useDeleteTodoItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTodoItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoItemMutation, DeleteTodoItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTodoItemMutation, DeleteTodoItemMutationVariables>(DeleteTodoItemDocument, options);
      }
export type DeleteTodoItemMutationHookResult = ReturnType<typeof useDeleteTodoItemMutation>;
export type DeleteTodoItemMutationResult = Apollo.MutationResult<DeleteTodoItemMutation>;
export type DeleteTodoItemMutationOptions = Apollo.BaseMutationOptions<DeleteTodoItemMutation, DeleteTodoItemMutationVariables>;
export const UsersDocument = gql`
    query users {
  users {
    uid
    username
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;