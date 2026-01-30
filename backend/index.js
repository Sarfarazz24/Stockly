require("dotenv").config(); // connectting the env with this file

const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser"); // to split the data we used it
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://zerodha-frontend.onrender.com", "http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//importing models
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PosititionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const authRoute = require("./Routes/AuthRoute");
const holdingRoute = require("./Routes/HoldingRoute");
const orderRoute = require("./Routes/OrderRoute");
const positionRoute = require("./Routes/PositionRoute");

const PORT = process.env.PORT || 5000; // we are giving the port from the process if it is null we assigned the port to 3002
const uri = process.env.MONGO_URL; // connecting with mongo url which is present in env file!
const { MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use("/", authRoute);
app.use("/order", orderRoute);
app.use("/holding", holdingRoute);
app.use("/position", positionRoute);

app.get("/allHoldings", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Sample data for testing without database
      const sampleHoldings = [
        { name: "TCS", qty: 10, avg: 3100, price: 3200, net: "+3.23%", day: "+2.45%" },
        { name: "INFY", qty: 5, avg: 1400, price: 1450, net: "+3.57%", day: "+1.25%" },
        { name: "RELIANCE", qty: 8, avg: 2500, price: 2600, net: "+4.00%", day: "+3.12%" }
      ];
      
      res.json(sampleHoldings);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Sample data for testing without database
      const samplePositions = [
        { product: "MIS", name: "TCS", qty: -2, avg: 3150, price: 3200, net: "+1.59%", day: "+2.45%", isLoss: false },
        { product: "CNC", name: "INFY", qty: 3, avg: 1380, price: 1450, net: "+5.07%", day: "+1.25%", isLoss: false },
        { product: "NRML", name: "RELIANCE", qty: -1, avg: 2550, price: 2600, net: "+1.96%", day: "+3.12%", isLoss: false }
      ];
      
      res.json(samplePositions);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// entering the new data like buy and sell into the database
app.post("/newOrder", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // For now, just return success (we can add database storage later)
      console.log("Order received:", req.body);
      res.status(200).json({ 
        message: "Order placed successfully",
        success: true,
        order: req.body
      });
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log("App Started!");
  //mongoose.connect(uri);
  console.log("DB is connected!");
});
