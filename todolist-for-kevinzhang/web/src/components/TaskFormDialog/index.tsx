import * as React from "react";
import {
  Button,
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
  SvgIcon,
  styled,
  Chip,
  ChipDelete,
} from "@mui/joy";
import {
  Attachment,
  TodoItem,
  TodoItemForm,
  User,
} from "@/graphql/types-and-hooks";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default ({
  owners,
  followers,
  defaultValue,
  onSubmit,
  isOpend,
  onClose,
  onDownloadClick,
}: {
  owners: User[];
  followers: User[];
  defaultValue?: TodoItem;
  onSubmit: (newForm: TodoItemForm) => void;
  onClose: () => void;
  isOpend: boolean;
  onDownloadClick: (a: Attachment) => void;
}) => {
  const [file, setFile] = React.useState<File | null>(null);

  return (
    <Modal open={isOpend} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>New Task</DialogTitle>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement> | any) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const formJson: any = Object.fromEntries(formData.entries());
            formJson.putOwnersUIDs = formJson["putOwnersUIDs"]?.length
              ? JSON.parse(formJson.putOwnersUIDs)
              : [];
            formJson.putFollowersUIDs = formJson["putFollowersUIDs"]?.length
              ? JSON.parse(formJson.putFollowersUIDs)
              : [];
            if (file) {
              formJson.newAttachments = [
                {
                  filename: file.name,
                  contentType: file.type,
                  content: file,
                },
              ];
              setFile(null);
            }
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
            {defaultValue?.attachments?.length ? (
              <Stack spacing={1}>
                {defaultValue?.attachments?.map((attachment, i) => (
                  <Chip
                    key={i}
                    size="lg"
                    variant="outlined"
                    onClick={() => onDownloadClick(attachment)}
                    endDecorator={
                      <ChipDelete
                        variant="plain"
                        onDelete={() => alert("You clicked the delete button!")}
                      />
                    }
                  >
                    {attachment.name}
                  </Chip>
                ))}
              </Stack>
            ) : null}
            {file ? (
              <Chip
                size="lg"
                variant="outlined"
                color="primary"
                endDecorator={<ChipDelete onDelete={() => setFile(null)} />}
              >
                {file.name}
              </Chip>
            ) : null}
            <FormControl>
              <Button
                disabled={!!file}
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                startDecorator={<SvgIcon>{/* Your SVG icon */}</SvgIcon>}
              >
                Attach an new attachment
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    event.preventDefault();
                    const selectedFile = event.target.files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  }}
                />
              </Button>
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
