import * as React from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Select,
  Stack,
  Option,
  Textarea,
} from "@mui/joy";
import { TodoItem, TodoItemForm, User } from "@/graphql/types-and-hooks";

export default ({
  owners,
  defaultValue,
  onSubmit,
  isOpend,
  onClose,
}: {
  owners: User[];
  defaultValue?: TodoItem;
  onSubmit: (newForm: TodoItemForm) => void;
  onClose: () => void;
  isOpend: boolean;
}) => {
  return (
    <Modal open={isOpend} onClose={onClose}>
      <ModalDialog>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const formJson = Object.fromEntries(formData.entries());
            onSubmit(formJson);
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <Input
                name="title"
                placeholder="Type new title"
                defaultValue={defaultValue?.title ?? undefined}
              />
            </FormControl>
            <FormControl orientation="horizontal">
              <FormLabel>Assign to</FormLabel>
              <Stack spacing={2}>
                <Select
                  name="putOwnersUIDs"
                  sx={{ minWidth: 200 }}
                  multiple
                  defaultValue={
                    defaultValue?.owners?.map((o) => o.uid) ?? undefined
                  }
                >
                  {owners.map((owner) => (
                    <Option value={owner.uid}>{owner.username}</Option>
                  ))}
                </Select>
              </Stack>
            </FormControl>
            <FormControl orientation="horizontal">
              <FormLabel>Due</FormLabel>
              <Checkbox label="今天到期" />
            </FormControl>
            <FormControl>
              <Textarea
                minRows={2}
                name="description"
                placeholder="Type description"
                defaultValue={defaultValue?.description ?? undefined}
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};
