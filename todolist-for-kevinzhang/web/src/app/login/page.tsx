"use client";

import * as React from "react";
import { Box, Button, Input, Stack } from "@mui/joy";
import { useSignInMutation } from "@/graphql/types-and-hooks";
import { useRouter } from "next/navigation";

export default () => {
  const [username, password] = ["user", "password"];
  const router = useRouter();
  const [signIn, { loading, error }] = useSignInMutation();
  if (error) return `Error! ${error}`;

  function login(form: { username: string; password: string }) {
    signIn({
      variables: {
        username: form.username,
        password: form.password,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data?.signIn.accessToken ?? "");
      })
      .then(() => {
        router.push("/tasks");
      });
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const formJson = Object.fromEntries(formData.entries());
          login(formJson);
        }}
      >
        <Stack spacing={1}>
          <Input
            name="username"
            required
            defaultValue={username}
            disabled={loading}
          />
          <Input
            name="password"
            required
            slotProps={{
              input: { type: "password" },
            }}
            defaultValue={password}
            disabled={loading}
          />
          <Button type="submit" loading={loading}>
            登入
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
