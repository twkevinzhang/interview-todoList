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
  Button,
  Checkbox,
} from "@mui/joy";
import {
  TodoItem,
  TodoItemsSortBy,
  User,
  useUpdateTodoItemMutation,
} from "@/graphql/types-and-hooks";
import dayjs from "dayjs";

export default ({
  users,
  todoItems,
  queryParams,
  onSelectCreators,
  onSelectOwners,
  onSelectSortBy,
  onCreateClick,
  onMessageClick,
  onSubTaskCreate,
  onEditClick,
  onDeleteClick,
  categoryWithMyUID,
}: {
  users: User[];
  todoItems: Partial<TodoItem>[];
  queryParams: URLSearchParams;
  onSelectCreators: (newCreatorsUIDs: string[] | null) => void;
  onSelectOwners: (newOwnersUIDs: string[] | null) => void;
  onSelectSortBy: (newSortBy: string | null) => void;
  onCreateClick: () => void;
  onMessageClick: (todoItemID: string) => void;
  onSubTaskCreate: (todoItemID: string) => void;
  onEditClick: (todoItemID: string) => void;
  onDeleteClick: (todoItemID: string) => void;
  categoryWithMyUID: { [key: string]: string };
}) => {
  const sortby_options = {
    [TodoItemsSortBy.CreatedAtAsc]: "依據建立時間正序",
    [TodoItemsSortBy.CreatedAtDesc]: "依據建立時間倒序",
    [TodoItemsSortBy.DueAsc]: "依據任務到期時間正序",
    [TodoItemsSortBy.DueDesc]: "依據任務到期時間倒序",
    [TodoItemsSortBy.CreatedByAsc]: "依據創建者正序",
    [TodoItemsSortBy.CreatedByDesc]: "依據創建者倒序",
  };
  const [update] = useUpdateTodoItemMutation();

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
    event?.preventDefault();
    onSelectSortBy(newValue);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    item: Partial<TodoItem>,
  ) {
    event?.preventDefault();
    update({
      variables: {
        form: {
          isCompleted: event.target.checked,
        },
        id: item.id!,
      },
      refetchQueries: ["todoItems", "todoItem"],
    });
  }

  const [creators, setCreators] = React.useState<string[]>([]);
  const [owners, setOwners] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (categoryWithMyUID["created"]) {
      setCreators([categoryWithMyUID["created"]]);
    } else {
      setCreators(queryParams.get("creators")?.split(",") ?? []);
    }

    if (categoryWithMyUID["assigned"]) {
      setOwners([categoryWithMyUID["assigned"]]);
    } else {
      setOwners(queryParams.get("owners")?.split(",") ?? []);
    }
  }, [categoryWithMyUID]);

  const sortby = queryParams.get("sortby") ?? "";

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
                value={creators}
                multiple
                sx={{ minWidth: 200 }}
                onChange={handleCreators}
                disabled={!!categoryWithMyUID["created"]}
              >
                {users.map((user) => (
                  <Option key={user.uid} value={user.uid}>
                    {user.username}
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
                value={owners}
                multiple
                sx={{ minWidth: 200 }}
                onChange={handleOwners}
                disabled={!!categoryWithMyUID["assigned"]}
              >
                {users.map((user) => (
                  <Option key={user.uid} value={user.uid}>
                    {user.username}
                  </Option>
                ))}
              </Select>
            </Stack>
          </FormControl>
          <FormControl orientation="horizontal">
            <FormLabel>Sort by</FormLabel>
            <Stack spacing={2}>
              <Select
                name="sortBy"
                sx={{ minWidth: 200 }}
                value={sortby}
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
        <Box>
          <Button size="lg" onClick={onCreateClick}>
            New Task
          </Button>
        </Box>
      </Box>
      <Table hoverRow>
        <thead>
          <tr>
            {[
              "已完成",
              "標題",
              "截止時間",
              "建立者",
              "建立時間",
              "任務 ID",
            ].map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map((item, i) => (
            <tr key={i}>
              <td>
                <Checkbox
                  label={""}
                  size="sm"
                  checked={item.isCompleted == true}
                  onChange={(e) => handleChange(e, item)}
                />
              </td>
              <td>{item.title}</td>
              <td>{item.due ? dayjs(item.due).format("YYYY/MM/DD") : null}</td>
              <td>{item.createdBy?.username}</td>
              <td>
                {item.createdAt
                  ? dayjs(item.createdAt).format("YYYY/MM/DD HH:mm:ss")
                  : null}
              </td>
              <td>{item.id}</td>
              <td>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onClick={() => onSubTaskCreate(item.id!)}
                  >
                    NewSubTask
                  </Button>
                  <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    onClick={() => onMessageClick(item.id!)}
                  >
                    Comment
                  </Button>
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
