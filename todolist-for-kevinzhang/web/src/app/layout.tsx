import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloWrapper } from "@/app/ApolloWrapper";
import "@/app/globals.css";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

if (process.env.NODE_ENV === "development") {
  console.info("Loading Apollo Client Dev Tools");
  loadDevMessages();
  loadErrorMessages();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={"h-full"}>
      <body className={(inter.className, "h-full")}>
        <ThemeRegistry>
          <ApolloWrapper>{children}</ApolloWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
