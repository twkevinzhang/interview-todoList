"use client";

import * as React from "react";
import Table from "@/components/Table";
import {
  useCreateTodoItemMutation,
  useTodoItemsQuery,
  useUpdateTodoItemMutation,
  useUsersQuery,
} from "@/graphql/types-and-hooks";
import TodoItemForm from "@/components/TodoItemForm";

export default () => {
  const {
    data: todoItems,
    error: todoItemsError,
    loading: todoItemsListing,
  } = useTodoItemsQuery();
  const {
    data: users,
    error: usersError,
    loading: userListing,
  } = useUsersQuery();
  const [create, { loading: creating }] = useCreateTodoItemMutation();
  const [update, { loading: updating }] = useUpdateTodoItemMutation();
  const [isOpend, setOpened] = React.useState(true);

  const loading = React.useMemo(
    () => todoItemsListing && userListing && creating && updating,
    [todoItemsListing, userListing, creating, updating],
  );

  if (loading) return "Loading...";
  if (todoItemsError) return `Error! ${todoItemsError.message}`;
  if (usersError) return `Error! ${usersError.message}`;

  return (
    <div>
      <TodoItemForm
        owners={users?.users ?? []}
        onSubmit={(newForm) => create(newForm)}
        onClose={() => setOpened(false)}
        isOpend={isOpend}
      />
      <Table todoItems={todoItems} loading={loading}></Table>
    </div>
  );
};
