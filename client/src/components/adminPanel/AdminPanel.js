import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminProducts from "./AdminProducts";

const AdminPanel = () => {
  const drawerWidth = 240;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nav, setNav] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3001/users/getUser", {
      withCredentials: true,
    }).then((res) => {
      dispatch(setUser(res.data.user));
      if (res.data.user.role !== 1) {
        navigate("/shop");
      }
    });
  });
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              setNav("Products");
            }}
          >
            Products
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setNav("Orders");
            }}
          >
            Orders
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setNav("Users");
            }}
          >
            Users
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {nav === "Products" && <AdminProducts />}
        {/* {nav==='Orders' && <AdminOrders />}
          {nav==='Users' && <AdminUsers />} */}
      </Box>
    </Box>
  );
};
export default AdminPanel;
