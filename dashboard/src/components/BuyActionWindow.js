import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import { useState, useContext } from "react";
import { Alert } from "@mui/material";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [showAlert, setShowAlert] = useState(false);
  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = async () => {
    try {
      axios.post("http://localhost:3000/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        closeBuyWindow();
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }

    try {
      const avgCost = stockPrice;
      const netChange = stockPrice * stockQuantity;
      const dayChange = 0.0;
      const isLoss = false;

      await axios.post("", {
        name: uid,
        qty: stockQuantity,
        avg: avgCost,
        price: stockPrice,
        net: netChange,
        day: dayChange,
        isLoss: isLoss,
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }

    //GeneralContext.closeBuyWindow(); // TO CLOSE THE WINDOW AFTER stock buy
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow(); // to close the window after cancel the stock
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      {showAlert && <Alert severity="success">Buy Successfully</Alert>}
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>QTY</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number "
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="button">
        <span>Margin required 140.05</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="/" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BuyActionWindow;
