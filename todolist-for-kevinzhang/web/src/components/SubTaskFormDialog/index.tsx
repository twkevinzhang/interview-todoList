import * as React from "react";
import {
  Button,
  FormControl,
  Modal,
  ModalDialog,
  Stack,
  ModalClose,
  DialogTitle,
  Input,
} from "@mui/joy";
import { TodoItem } from "@/graphql/types-and-hooks";
import dayjs from "dayjs";

export default ({
  children,
  title,
  onSubmit,
  isOpend,
  onClose,
}: {
  children: TodoItem[];
  title: string;
  onSubmit: (newSubTask: string) => void;
  onClose: () => void;
  isOpend: boolean;
}) => {
  return (
    <Modal open={isOpend} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>Sub Task List</DialogTitle>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const formJson = Object.fromEntries(formData.entries());
            onSubmit(formJson.newSubTask);
          }}
        >
          <Stack spacing={2}>
            {children.map((subTask) => (
              <FormControl key={subTask.id}>
                Sub Task {subTask.id}: {subTask.title}
              </FormControl>
            ))}
          </Stack>
          <Stack spacing={2} className="my-4">
            <FormControl>
              <Input
                name="newSubTask"
                placeholder="Type new sub task title"
                required
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};
