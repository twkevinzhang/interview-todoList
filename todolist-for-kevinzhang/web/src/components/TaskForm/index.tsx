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
  ModalClose,
  DialogTitle,
} from "@mui/joy";
import { TodoItem, TodoItemForm, User } from "@/graphql/types-and-hooks";

export default ({
  owners,
  followers,
  defaultValue,
  onSubmit,
  isOpend,
  onClose,
}: {
  owners: User[];
  followers: User[];
  defaultValue?: TodoItem;
  onSubmit: (newForm: TodoItemForm) => void;
  onClose: () => void;
  isOpend: boolean;
}) => {
  return (
    <Modal open={isOpend} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>New Task</DialogTitle>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const formJson = Object.fromEntries(formData.entries());
            formJson.putOwnersUIDs = formJson["putOwnersUIDs"]?.length
              ? JSON.parse(formJson.putOwnersUIDs)
              : [];
            formJson.putFollowersUIDs = formJson["putFollowersUIDs"]?.length
              ? JSON.parse(formJson.putFollowersUIDs)
              : [];
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
                    <Option key={owner.uid} value={owner.uid}>
                      {owner.username}
                    </Option>
                  ))}
                </Select>
              </Stack>
            </FormControl>
            <FormControl>
              <Textarea
                minRows={2}
                name="description"
                placeholder="Type description"
                defaultValue={defaultValue?.description ?? undefined}
              />
            </FormControl>
            <FormControl orientation="horizontal">
              <FormLabel>Subscribed</FormLabel>
              <Stack spacing={2}>
                <Select
                  name="putFollowersUIDs"
                  sx={{ minWidth: 200 }}
                  multiple
                  defaultValue={
                    defaultValue?.followers?.map((o) => o.uid) ?? undefined
                  }
                >
                  {followers.map((follower) => (
                    <Option key={follower.uid} value={follower.uid}>
                      {follower.username}
                    </Option>
                  ))}
                </Select>
              </Stack>
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};
