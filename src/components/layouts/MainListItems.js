import * as React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { useRouter } from "next/navigation";

export default function MainListItems() {
  const router = useRouter();
  return (
    <>
      <ListItemButton
        onClick={() => {
          router.push("/");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          router.push("/events");
        }}
      >
        <ListItemIcon>
          <ViewCarouselIcon />
        </ListItemIcon>
        <ListItemText primary="Banners" />
      </ListItemButton>
    </>
  );
}
