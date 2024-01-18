import * as React from "react";
import { Grid, Container } from "@mui/joy";
import SideBar from "@/navigation/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="my-10" maxWidth="lg">
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={2}>
          <SideBar />
        </Grid>
        <Grid xs={10}>{children}</Grid>
      </Grid>
    </Container>
  );
}
