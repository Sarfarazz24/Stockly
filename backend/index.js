require("dotenv").config(); // connectting the env with this file

const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser"); // to split the data we used it
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//importing models
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PosititionsModel");
const { OrdersModel } = require("./model/OrdersModel");

app.use(cors());

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
  let allholdings = await HoldingsModel.find({});
  res.json(allholdings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// entering the new data like buy and sell into the database
app.post("/newOrder", async (req, res) => {
  let newOrders = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  newOrders.save();
  res.send("data saved!");
});

app.listen(PORT, () => {
  console.log("App Started!");
  //mongoose.connect(uri);
  console.log("DB is connected!");
});
