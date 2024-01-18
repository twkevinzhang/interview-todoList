import { TodoItemsSortBy } from "@/graphql/types-and-hooks";

export function EnumTodoItemsSortBy(value: string): TodoItemsSortBy {
  switch (value) {
    case "CREATED_AT_ASC":
      return TodoItemsSortBy.CreatedAtAsc;
    case "CREATED_AT_DESC":
      return TodoItemsSortBy.CreatedAtDesc;
    case "CREATED_BY_ASC":
      return TodoItemsSortBy.CreatedByAsc;
    case "CREATED_BY_DESC":
      return TodoItemsSortBy.CreatedByDesc;
    case "DUE_ASC":
      return TodoItemsSortBy.DueAsc;
    case "DUE_DESC":
      return TodoItemsSortBy.DueDesc;
    default:
      throw new Error(`Unknown TodoItemsSortBy value: ${value}`);
  }
}
