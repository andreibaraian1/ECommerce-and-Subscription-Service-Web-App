import Axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModal, setModalMessage } from "../../actions";
import { TextField, Typography, Button } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import QRCode from "react-qr-code";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [subscription, setSubscription] = useState(false);
  const [subscriptionDate, setSubscriptionDate] = useState("");
  const [QR, setQR] = useState(null);
  const [visible, setVisible] = useState(false);
  //form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_HOSTNAME}/users/getUserInfo`, {
      withCredentials: true,
    }).then((res) => {
      if (res.data?.error) {
        dispatch(setModal());
        dispatch(setModalMessage(res.data.error));
        navigate("/");
        return;
      } else {
        setUser(res.data);
        setFormData(res.data);
        const today = new Date();
        const subscriptionDate = new Date(res.data.subscription);
        if (subscriptionDate > today) {
          setSubscription(true);
          setSubscriptionDate(subscriptionDate.toLocaleDateString("en-GB"));
        }
      }
    });
  }, [dispatch, navigate]);
  const setFormData = (user) => {
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
    setTelephone(user?.telephone);
    setAddress(user?.address);
    setCity(user?.city);
    setCountry(user?.country);
    setZipcode(user?.zipcode);
    setState(user?.state);
  };

  const handleSubmit = async () => {
    const user = {
      firstName,
      lastName,
      telephone,
      address,
      city,
      country,
      zipcode,
      state,
    };
    const updateUser = await Axios.post(
      `${process.env.REACT_APP_HOSTNAME}/users/updateUserInfo`,
      { user },
      { withCredentials: true }
    );
    console.log(updateUser);
  };
  const handleQR = async () => {
    const getQR = await Axios.get(
      `${process.env.REACT_APP_HOSTNAME}/users/getQRToken`,
      {
        withCredentials: true,
      }
    );
    setQR(getQR.data);
  };
  return (
    <Container>
      <Row>
        <Col>
          <Typography variant="h5">User {user.username}</Typography>
          <Typography variant="h5">
            {subscription ? (
              <div>
                <p>Subscription active</p>
                <p>Expires in {subscriptionDate}</p>
                {!QR && <Button onClick={handleQR}>Get QR Code</Button>}
                {QR && <QRCode value={QR} />}
              </div>
            ) : (
              <div>No subscription active</div>
            )}
          </Typography>
        </Col>
        <Button onClick={() => setVisible((prev) => !prev)}>
          {visible
            ? "Hide personal information"
            : "Change personal information"}
        </Button>
        {visible && (
          <>
            <Col>
              <Typography>Username</Typography>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                variant="outlined"
                value={user.username}
              />
              <Typography>First Name</Typography>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Typography>Last Name</Typography>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Typography>Telephone</Typography>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                label="Telephone"
                variant="outlined"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
              <Typography>email</Typography>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                variant="outlined"
                value={user.email}
              />
            </Col>
            <Col>
              <Typography>Address</Typography>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Typography>City</Typography>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                label="City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Typography>State</Typography>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                label="State"
                variant="outlined"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <Typography>Zipcode</Typography>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                label="Zipcode"
                variant="outlined"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
              <Typography>Country</Typography>
              <TextField
                style={{ width: "200px", margin: "5px" }}
                type="text"
                label="Country"
                variant="outlined"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save User data
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Profile;
