"use client";

import * as React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import ListDivider from "@mui/joy/ListDivider";
import ListSubheader from "@mui/joy/ListSubheader";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Home() {
  const pathname = usePathname();

  const list = Object.entries({
    Owned: "/tasks/owned",
    Subscribed: "/tasks/subscribed",
    Activity: "/tasks/activity",
    All: "/tasks/all",
    Created: "/tasks/created",
    Assigned: "/tasks/assigned",
    Completed: "/tasks/completed",
  }).map(([title, href]) => (
    <Link
      key={href}
      href={href}
      className={clsx({
        "bg-sky-100 text-blue-600": pathname === href,
      })}
    >
      <ListItem>
        <ListItemButton>
          <ListItemContent>{title}</ListItemContent>
        </ListItemButton>
      </ListItem>
    </Link>
  ));
  return (
    <List size="lg">
      {list[0]}
      {list[1]}
      {list[2]}
      <ListDivider />
      <ListSubheader>Quick Access</ListSubheader>
      {list[3]}
      {list[4]}
      {list[5]}
      {list[6]}
      <ListDivider />
      <ListSubheader>Task List</ListSubheader>
      <ListItem>
        <ListItemButton disabled>
          <ListItemContent>Not implement</ListItemContent>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
