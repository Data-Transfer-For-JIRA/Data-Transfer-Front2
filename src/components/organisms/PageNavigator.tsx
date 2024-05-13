import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/system";
import DrawerItemList from "../atoms/DrawerItemList";

type props = {
  naviOpen: boolean;
  handleDrawerClose: () => void;
};

const commonContentsList = [
  { value: "프로젝트 조회", link: "/main" },
  { value: "프로젝트 생성", link: "/create-project" },
  { value: "프로젝트 연결", link: "/link-project" },
];

const adminContentsList = [
  { value: "프로젝트 정보 수정", link: "/fix-project" },
  { value: "프로젝트 삭제", link: "/del-project" },
];

export default function PageNavigator({ naviOpen, handleDrawerClose }: props) {
  return (
    <Drawer anchor="left" open={naviOpen} onClose={handleDrawerClose}>
      <Box
        component="nav"
        sx={{ width: 250 }}
        role="presentation"
        onClick={handleDrawerClose}
      >
        <DrawerItemList items={commonContentsList} />
        <Divider />
        <DrawerItemList items={adminContentsList} />
      </Box>
    </Drawer>
  );
}
