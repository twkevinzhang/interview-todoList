"use client";

import * as React from "react";
import Table from "@/components/Table";
import { useTodoItemsQuery } from "@/graphql/types-and-hooks";

export default () => {
  const { data: todoItems, error, loading } = useTodoItemsQuery();
  if (loading) return "Loading...";
  if (error) return `Error! ${error}`;

  // return <Table></Table>
  return <div>{JSON.stringify(todoItems)}</div>;
};
