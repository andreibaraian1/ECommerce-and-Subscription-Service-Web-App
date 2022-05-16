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
import AdminProducts from "./Products/AdminProducts";
import AdminOrders from "./Orders/AdminOrders";
import AdminUsers from "./Users/AdminUsers";
import QRCheck from "./QR/QRCheck";

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
            disabled={nav === "Products"}
            onClick={() => {
              setNav("Products");
            }}
          >
            Products
          </ListItem>
          <ListItem
            button
            disabled={nav === "Orders"}
            onClick={() => {
              setNav("Orders");
            }}
          >
            Orders
          </ListItem>
          <ListItem
            button
            disabled={nav === "Users"}
            onClick={() => {
              setNav("Users");
            }}
          >
            Users
          </ListItem>
          <Divider />
          <ListItem
            button
            disabled={nav === "QR"}
            onClick={() => {
              setNav("QR");
            }}
          >
            Go to QR Checker
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              navigate("/shop");
            }}
          >
            Go back to shop
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {nav === "Products" && <AdminProducts />}
        {nav === "Orders" && <AdminOrders />}
        {nav === "Users" && <AdminUsers />}
        {nav === "QR" && <QRCheck />}
      </Box>
    </Box>
  );
};
export default AdminPanel;
