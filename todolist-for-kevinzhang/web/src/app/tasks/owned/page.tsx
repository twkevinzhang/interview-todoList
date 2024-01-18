"use client";

import * as React from "react";
import Table from "@/components/Table";
import { useTodoItemsQuery, useUsersQuery } from "@/graphql/types-and-hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { EnumTodoItemsSortBy } from "@/utils/enum";

export default () => {
  const queryParams = useSearchParams();
  const {
    data: todoItemsQuery,
    error,
    loading,
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
  const { data: usersQuery } = useUsersQuery();
  if (loading) return "Loading...";
  if (error) return `Error! ${error}`;

  const router = useRouter();
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

  return (
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
      onEditClick={(todoItemID: string) => {
        // TODO: implement
        console.log("edit " + todoItemID);
      }}
      onDeleteClick={(todoItemID: string) => {
        // TODO: implement
        console.log("del " + todoItemID);
      }}
    ></Table>
  );
};
