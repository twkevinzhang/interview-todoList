"use client";

import * as React from "react";
import Table from "@/components/Table";
import {
  TodoItemForm,
  useCreateTodoItemMutation,
  useTodoItemsQuery,
  useUpdateTodoItemMutation,
  useUsersQuery,
} from "@/graphql/types-and-hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { EnumTodoItemsSortBy } from "@/utils/enum";
import TaskForm from "@/components/TaskForm";

export default () => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const {
    data: todoItemsQuery,
    error: todoItemsError,
    loading: todoItemsListing,
  } = useTodoItemsQuery({
    variables: {
      filter: {
        creatorUID: {
          contains: queryParams.has("creators")
            ? queryParams.get("creators")?.split(",")
            : null,
        },
        ownerUID: {
          contains: queryParams.has("owners")
            ? queryParams.get("owners")?.split(",")
            : null,
        },
      },
      sortBy: queryParams.has("sortby")
        ? EnumTodoItemsSortBy(queryParams.get("sortby")!)
        : null,
    },
  });
  const {
    data: usersQuery,
    error: usersError,
    loading: userListing,
  } = useUsersQuery();

  const [create, { loading: creating }] = useCreateTodoItemMutation();
  const [update, { loading: updating }] = useUpdateTodoItemMutation();
  const [isOpend, setOpened] = React.useState(false);

  const loading = React.useMemo(
    () => todoItemsListing && userListing && creating && updating,
    [todoItemsListing, userListing, creating, updating],
  );

  if (loading) return "Loading...";
  if (todoItemsError) return `Error! ${todoItemsError.message}`;
  if (usersError) return `Error! ${usersError.message}`;

  function pushQueryParams(name: string, value: string[] | null) {
    const params = new URLSearchParams(queryParams.toString());
    if (value?.length) {
      params.set(name, value.join(","));
    } else {
      params.delete(name);
    }
    router.push("/tasks/owned?" + params.toString());
  }

  function pushQueryParam(name: string, value: string | null) {
    const params = new URLSearchParams(queryParams.toString());
    if (value?.length) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push("/tasks/owned?" + params.toString());
  }

  function handleCreate(newForm: TodoItemForm) {
    create({ variables: { form: newForm }, refetchQueries: ["todoItems"] });
    setOpened(false);
  }

  return (
    <div>
      <TaskForm
        owners={usersQuery?.users ?? []}
        onSubmit={handleCreate}
        onClose={() => setOpened(false)}
        isOpend={isOpend}
      />
      <Table
        users={usersQuery?.users ?? []}
        todoItems={todoItemsQuery?.todoItems ?? []}
        queryParams={new URLSearchParams(queryParams.toString())}
        onSelectCreators={(newValue: string[] | null) =>
          pushQueryParams("creators", newValue)
        }
        onSelectOwners={(newValue: string[] | null) =>
          pushQueryParams("owners", newValue)
        }
        onSelectSortBy={(newValue: string | null) =>
          pushQueryParam("sortby", newValue)
        }
        onCreateClick={() => setOpened(true)}
        onEditClick={(todoItemID: string) => {
          // TODO: implement
          console.log("edit " + todoItemID);
        }}
        onDeleteClick={(todoItemID: string) => {
          // TODO: implement
          console.log("del " + todoItemID);
        }}
      ></Table>
    </div>
  );
};
