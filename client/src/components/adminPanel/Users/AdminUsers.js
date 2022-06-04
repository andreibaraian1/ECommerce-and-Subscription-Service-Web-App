import { Table } from "react-bootstrap";
import { Input, Button, Select, MenuItem } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Axios from "axios";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    Axios.get(`${process.env.REACT_APP_HOSTNAME}/users/getUsers`, {
      withCredentials: true,
    })
      .then((response) => {
        const result = response.data.sort((a, b) => a.id - b.id);
        setUsers(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (value, index) => {
    let items = [...users];
    let item = {
      ...items[index],
      role: value,
    };
    items[index] = item;
    setUsers(items);
  };
  const handleUpdate = async (id, index) => {
    await Axios.post(
      `${process.env.REACT_APP_HOSTNAME}/users/updateRole`,
      { id, role: users[index].role },
      {
        withCredentials: true,
      }
    );
    toast.success(` User was updated`, {
      duration: 1500,
      position: "top-right",
    });
    fetchUsers();
  };
  const handleSubscription = async (event) => {
    event.preventDefault();
    const days = event.target[0].value;
    const id = event.target[1].value;
    console.log(days, id);
    await Axios.post(
      `${process.env.REACT_APP_HOSTNAME}/users/updateSubscription`,
      { id, days },
      {
        withCredentials: true,
      }
    );
    toast.success(` User was updated`, {
      duration: 1500,
      position: "top-right",
    });

    fetchUsers();
  };
  return (
    <>
      <Toaster />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Personal info</th>
            <th>Telephone</th>
            <th>Role</th>
            <th>Date Joined</th>
            <th>Subscription</th>
            <th>Update</th>
            <th>Add subscription</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <div>
                  <p>
                    {user.first_name} {user.last_name}
                  </p>
                  <p>
                    {user.address} {user.city} {user.state} {user.zipcode}{" "}
                    {user.country}
                  </p>
                </div>
              </td>
              <td>{user.telephone}</td>
              <td>
                <Select
                  value={user.role}
                  onChange={(e) => {
                    handleChange(e.target.value, index);
                  }}
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={0}>User</MenuItem>
                </Select>
              </td>
              <td>{user.date_joined}</td>
              <td>{user.subscription}</td>
              <td>
                <Button onClick={() => handleUpdate(user.id, index)}>
                  Update role
                </Button>
              </td>
              <td>
                <form onSubmit={handleSubscription}>
                  <Input placeholder="Days to add" />
                  <input type="hidden" value={user.id} />
                  <Button type="submit">Add subscription</Button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default AdminUsers;
