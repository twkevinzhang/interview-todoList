"use client";

import * as React from "react";
import Table from "@/components/Table";
import {
  TodoItemForm,
  useCreateTodoItemMutation,
  useDeleteTodoItemMutation,
  useTodoItemsQuery,
  useTodoItemLazyQuery,
  useUpdateTodoItemMutation,
  useUsersQuery,
  TodoItem,
} from "@/graphql/types-and-hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { EnumTodoItemsSortBy } from "@/utils/enum";
import TaskForm from "@/components/TaskForm";
import CommentFormDialog from "@/components/CommentFormDialog";

export default ({ params }: { params: { category: string } }) => {
  const { category } = params;
  const { uid } = localStorage;
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
        followerUID: {
          contains: category === "subscribed" ? [uid] : null,
        },
      },
      sortBy: queryParams.has("sortby")
        ? EnumTodoItemsSortBy(queryParams.get("sortby")!)
        : null,
    },
  });
  const [getTodoItem] = useTodoItemLazyQuery();

  const {
    data: usersQuery,
    error: usersError,
    loading: userListing,
  } = useUsersQuery();

  const [create, { loading: creating }] = useCreateTodoItemMutation();
  const [update, { loading: updating }] = useUpdateTodoItemMutation();
  const [del, { loading: deleting }] = useDeleteTodoItemMutation();
  const [isCreateDialogOpened, setCreateDialogOpened] = React.useState(false);
  const [editingTodoItem, setEditingTodoItem] =
    React.useState<Partial<TodoItem> | null>(null);
  const [commentingTodoItem, setCommentingTodoItem] =
    React.useState<Partial<TodoItem> | null>(null);

  const loading = React.useMemo(
    () => todoItemsListing && userListing && creating && updating && deleting,
    [todoItemsListing, userListing, creating, updating, deleting],
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
    router.push(`/tasks/${category}?${params.toString()}`);
  }

  function pushQueryParam(name: string, value: string | null) {
    const params = new URLSearchParams(queryParams.toString());
    if (value?.length) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`/tasks/${category}?${params.toString()}`);
  }

  function handleCreateSubmit(newForm: TodoItemForm) {
    create({ variables: { form: newForm }, refetchQueries: ["todoItems"] });
    setCreateDialogOpened(false);
  }

  function handleMessage(todoItemID: string) {
    getTodoItem({ variables: { id: todoItemID } }).then((res) => {
      setCommentingTodoItem(res.data?.todoItem ?? null);
    });
  }

  function handleMessageSubmit(todoItemID: string, newComment: string) {
    update({
      variables: {
        form: {
          newComments: [newComment],
        },
        id: todoItemID,
      },
      refetchQueries: ["todoItems", "todoItem"],
    });
    setCommentingTodoItem(null);
  }

  function handleEdit(todoItemID: string) {
    getTodoItem({ variables: { id: todoItemID } }).then((res) => {
      setEditingTodoItem(res.data?.todoItem ?? null);
    });
  }

  function handleEditSubmit(newForm: TodoItemForm) {
    update({
      variables: { form: newForm, id: editingTodoItem!.id! },
      refetchQueries: ["todoItems", "todoItem"],
    });
    setEditingTodoItem(null);
  }

  function handleDel(todoItemID: string) {
    del({ variables: { id: todoItemID }, refetchQueries: ["todoItems"] });
  }

  return (
    <div>
      <TaskForm
        owners={usersQuery?.users ?? []}
        followers={usersQuery?.users ?? []}
        onSubmit={handleCreateSubmit}
        onClose={() => setCreateDialogOpened(false)}
        isOpend={isCreateDialogOpened}
      />
      <TaskForm
        owners={usersQuery?.users ?? []}
        followers={usersQuery?.users ?? []}
        defaultValue={editingTodoItem}
        onSubmit={handleEditSubmit}
        onClose={() => setEditingTodoItem(null)}
        isOpend={!!editingTodoItem}
      />
      <CommentFormDialog
        comments={commentingTodoItem?.comments ?? []}
        title={commentingTodoItem?.title ?? ""}
        onSubmit={(newComment: string) =>
          handleMessageSubmit(commentingTodoItem!.id!, newComment)
        }
        onClose={() => setCommentingTodoItem(null)}
        isOpend={!!commentingTodoItem}
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
        onCreateClick={() => setCreateDialogOpened(true)}
        onMessageClick={handleMessage}
        onEditClick={handleEdit}
        onDeleteClick={(todoItemID: string) => {
          handleDel(todoItemID);
        }}
        categoryWithMyUID={{
          [category]: uid,
        }}
      ></Table>
    </div>
  );
};
