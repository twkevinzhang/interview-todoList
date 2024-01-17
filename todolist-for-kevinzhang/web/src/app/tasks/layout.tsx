import Container from "@mui/joy/Container";
import Grid from "@mui/joy/Grid";
import SideBar from "@/navigation/side-bar";

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
