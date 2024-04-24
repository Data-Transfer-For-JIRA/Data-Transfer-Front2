import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

type itemObject = {
  value: string;
  link: string;
};

type props = {
  items: itemObject[];
};
export default function DrawerItemList({ items }: props) {
  const navigator = useNavigate();
  const handleLink = (urlLink: string) => {
    navigator(urlLink);
  };
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton>
            <ListItemText
              primary={item.value}
              onClick={() => handleLink(item.link)}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
