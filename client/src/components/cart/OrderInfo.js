import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import Axios from "axios";
import { useFetch } from "../../api/useFetch";
import { useNavigate } from "react-router-dom";
import styles from "./OrderInfo.module.css";

const OrderInfo = ({ total, products }) => {
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("Romania");
  const [region, setRegion] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [valid, setValid] = useState(true);

  const { fetcher } = useFetch();
  const sendOrder = async () => {
    if (
      !firstName ||
      !lastName ||
      !city ||
      !zip ||
      !country ||
      !region ||
      !shippingAddress
    ) {
      setMessage("All values required");
      return;
    }
    const shipping = {
      firstName,
      lastName,
      city,
      zip,
      country,
      shippingAddress,
      region,
    };
    try {
      const result = await Axios.post(
        `${process.env.REACT_APP_HOSTNAME}/order/sendOrder`,
        { shipping, total, paymentMethod },
        { withCredentials: true }
      );
      if (result.status === 200) {
        if (result.data?.url) {
          window.location.href = result.data.url;
        } else {
          navigate("/"); //navigate to order
          fetcher();
        }
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    if (paymentMethod === "Cash") {
      for (const product of products) {
        if (product.category === "subscription") return setValid(false);
      }
    }
    setValid(true);
  }, [paymentMethod, products]);

  return (
    <>
      {message && <p className={styles.errorMessage}>{message}</p>}
      {!valid && (
        <p className={styles.errorMessage}>
          Subscriptions cannot be ordered with cash
        </p>
      )}
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setMessage("");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setMessage("");
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={shippingAddress}
            onChange={(e) => {
              setShippingAddress(e.target.value);
              setMessage("");
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            variant="standard"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setMessage("");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setMessage("");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value);
              setMessage("");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setMessage("");
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={paymentMethod}
              label="Payment Method"
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value={"Card"}>Card</MenuItem>
              <MenuItem value={"Cash"}>Cash</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="end">
        <Button onClick={sendOrder} disabled={!valid}>
          Send Order
        </Button>
      </Stack>
    </>
  );
};
export default OrderInfo;
