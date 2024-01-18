"use client";
import * as React from "react";
import {
  Box,
  Table,
  Select,
  Option,
  FormLabel,
  FormControl,
  Stack,
  Checkbox,
  Button,
} from "@mui/joy";
import { TodoItem, TodoItemsSortBy, User } from "@/graphql/types-and-hooks";
import dayjs from "dayjs";

export default ({
  users,
  todoItems,
  queryParams,
  onSelectCreators,
  onSelectOwners,
  onSelectSortBy,
  onEditClick,
  onDeleteClick,
}: {
  users: User[];
  todoItems: Partial<TodoItem>[];
  queryParams: URLSearchParams;
  onSelectCreators: (newCreatorsUIDs: string[] | null) => void;
  onSelectOwners: (newOwnersUIDs: string[] | null) => void;
  onSelectSortBy: (newSortBy: string | null) => void;
  onEditClick: (todoItemID: string) => void;
  onDeleteClick: (todoItemID: string) => void;
}) => {
  const columns = ["title", "due", "createdBy", "createdAt", "id"];
  const sortby_options = {
    [TodoItemsSortBy.CreatedAtAsc]: "依據建立時間正序",
    [TodoItemsSortBy.CreatedAtDesc]: "依據建立時間倒序",
    [TodoItemsSortBy.DueAsc]: "依據任務到期時間正序",
    [TodoItemsSortBy.DueDesc]: "依據任務到期時間倒序",
    [TodoItemsSortBy.CreatedByAsc]: "依據創建者正序",
    [TodoItemsSortBy.CreatedByDesc]: "依據創建者倒序",
  };

  function handleCreators(
    event: React.SyntheticEvent | null,
    newValue: string[] | null,
  ) {
    event?.preventDefault();
    onSelectCreators(newValue);
  }

  function handleOwners(
    event: React.SyntheticEvent | null,
    newValue: string[] | null,
  ) {
    event?.preventDefault();
    onSelectOwners(newValue);
  }

  function handleSortBy(
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) {
    console.log(newValue);
    event?.preventDefault();
    onSelectSortBy(newValue);
  }

  const creators = queryParams.get("creators")?.split(",") ?? [""];
  const owners = queryParams.get("owners")?.split(",") ?? [""];
  const sortby = queryParams.get("sortby") ?? "";

  return (
    <div>
      <Box
        sx={{
          display: "grid",
          rowGap: 1,
        }}
      >
        <FormControl orientation="horizontal">
          <FormLabel>Creator contains</FormLabel>
          <Stack spacing={2}>
            <Select
              name="listOfCreators"
              defaultValue={creators}
              multiple
              sx={{ minWidth: 200 }}
              onChange={handleCreators}
            >
              {users.map((user) => (
                <Option key={user.uid} value={user.uid}>
                  {user.uid}
                </Option>
              ))}
            </Select>
          </Stack>
        </FormControl>
        <FormControl orientation="horizontal">
          <FormLabel>Assigned by contains</FormLabel>
          <Stack spacing={2}>
            <Select
              name="listOfOwner"
              defaultValue={owners}
              multiple
              sx={{ minWidth: 200 }}
              onChange={handleOwners}
            >
              {users.map((user) => (
                <Option key={user.uid} value={user.uid}>
                  {user.uid}
                </Option>
              ))}
            </Select>
          </Stack>
        </FormControl>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <FormLabel>Due</FormLabel>
          <Stack spacing={2} direction="row">
            <Checkbox label="from 2024-01-17 10:00" />
            <Checkbox label="to 2024-01-17 11:00" />
          </Stack>
        </Box>

        <FormControl orientation="horizontal">
          <FormLabel>Sort by</FormLabel>
          <Stack spacing={2}>
            <Select
              name="sortBy"
              sx={{ minWidth: 200 }}
              defaultValue={sortby}
              onChange={handleSortBy}
            >
              {Object.entries(sortby_options).map(([k, v]) => (
                <Option key={k} value={k}>
                  {v}
                </Option>
              ))}
            </Select>
          </Stack>
        </FormControl>
      </Box>
      <Table hoverRow>
        <thead>
          <tr>
            {columns.map((column) => {
              return <th key={column}>{column}</th>;
            })}
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.due ? dayjs(item.due).format("YYYY/MM/DD") : null}</td>
              <td>{item.createdBy?.username}</td>
              <td>
                {item.createdAt
                  ? dayjs(item.createdAt).format("YYYY/MM/DD")
                  : null}
              </td>
              <td>{item.id}</td>
              <td>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onClick={() => onEditClick(item.id!)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="soft"
                    color="danger"
                    onClick={() => onDeleteClick(item.id!)}
                  >
                    Delete
                  </Button>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
