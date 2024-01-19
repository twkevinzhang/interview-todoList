import * as React from "react";
import {
  Button,
  FormControl,
  Modal,
  ModalDialog,
  Stack,
  Textarea,
  ModalClose,
  DialogTitle,
  Card,
  Box,
  CardContent,
  Typography,
} from "@mui/joy";
import { Comment } from "@/graphql/types-and-hooks";
import dayjs from "dayjs";

export default ({
  comments,
  title,
  onSubmit,
  isOpend,
  onClose,
}: {
  comments: Comment[];
  title: string;
  onSubmit: (newComment: string) => void;
  onClose: () => void;
  isOpend: boolean;
}) => {
  return (
    <Modal open={isOpend} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>{title}</DialogTitle>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const formJson = Object.fromEntries(formData.entries());
            // onSubmit(formJson["newComment"]);
            onSubmit(formJson.newComment);
          }}
        >
          <Stack spacing={2}>
            {comments.map((comment) => (
              <FormControl key={comment.id}>
                <Card size="sm" className="">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box gridColumn="span 4">{comment.createdBy.username}</Box>
                    <Box gridColumn="span 8">
                      {dayjs(comment.createdAt).format("MM/DD HH:mm")}
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography level="title-md">{comment.content}</Typography>
                  </CardContent>
                </Card>
              </FormControl>
            ))}
          </Stack>
          <Stack spacing={2} className="my-4">
            <FormControl>
              <Textarea
                minRows={2}
                name="newComment"
                placeholder="Type new comment"
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};
