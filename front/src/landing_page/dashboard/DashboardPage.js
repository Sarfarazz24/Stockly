import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const DashboardPage = () => {
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openBuyDialog, setOpenBuyDialog] = useState(false);
  const [openSellDialog, setOpenSellDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [orderForm, setOrderForm] = useState({
    name: '',
    qty: '',
    price: '',
    mode: 'BUY'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [holdingsRes, positionsRes] = await Promise.all([
          axios.get(process.env.REACT_APP_API_URL || "http://localhost:5000/allHoldings", { withCredentials: true }),
          axios.get(process.env.REACT_APP_API_URL || "http://localhost:5000/allPositions", { withCredentials: true })
        ]);
        
        setHoldings(holdingsRes.data);
        setPositions(positionsRes.data);
      } catch (error) {
        toast.error("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBuyClick = (stock) => {
    setSelectedStock(stock);
    setOrderForm({
      name: stock.name,
      qty: '',
      price: stock.price,
      mode: 'BUY'
    });
    setOpenBuyDialog(true);
  };

  const handleSellClick = (stock) => {
    setSelectedStock(stock);
    setOrderForm({
      name: stock.name,
      qty: '',
      price: stock.price,
      mode: 'SELL'
    });
    setOpenSellDialog(true);
  };

  const handleOrderSubmit = async () => {
    try {
      const response = await axios.post((process.env.REACT_APP_API_URL || "http://localhost:5000") + "/newOrder", orderForm, { 
        withCredentials: true 
      });
      
      toast.success("Order placed successfully!");
      
      // Refresh data
      const [holdingsRes, positionsRes] = await Promise.all([
        axios.get(process.env.REACT_APP_API_URL || "http://localhost:5000/allHoldings", { withCredentials: true }),
        axios.get(process.env.REACT_APP_API_URL || "http://localhost:5000/allPositions", { withCredentials: true })
      ]);
      
      setHoldings(holdingsRes.data);
      setPositions(positionsRes.data);
      
      setOpenBuyDialog(false);
      setOpenSellDialog(false);
    } catch (error) {
      toast.error("Failed to place order");
      console.error("Error placing order:", error);
    }
  };

  const handleFormChange = (field) => (event) => {
    setOrderForm({
      ...orderForm,
      [field]: event.target.value
    });
  };

  // Prepare data for pie chart
  const preparePieChartData = () => {
    return holdings.map(holding => ({
      name: holding.name,
      value: holding.price * holding.qty,
      percentage: ((holding.price * holding.qty) / holdings.reduce((sum, h) => sum + (h.price * h.qty), 0) * 100).toFixed(2)
    }));
  };

  const pieChartData = preparePieChartData();
  const totalPortfolioValue = holdings.reduce((sum, holding) => sum + (holding.price * holding.qty), 0);

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B'];

  if (loading) {
    return (
      <Box className="container" style={{ padding: "2rem", textAlign: "center" }}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box className="container" style={{ padding: "2rem" }}>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Portfolio Summary and Pie Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
            <Typography variant="h6" gutterBottom color="primary">
              Portfolio Value
            </Typography>
            <Typography variant="h4" color="primary" fontWeight="bold">
              ₹{totalPortfolioValue.toLocaleString('en-IN')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Investment
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e8' }}>
            <Typography variant="h6" gutterBottom color="success.main">
              Today's P&L
            </Typography>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              +₹{Math.round(totalPortfolioValue * 0.02).toLocaleString('en-IN')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              +2.00%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
            <Typography variant="h6" gutterBottom color="warning.main">
              Total P&L
            </Typography>
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              +₹{Math.round(totalPortfolioValue * 0.15).toLocaleString('en-IN')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              +15.00%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fce4ec' }}>
            <Typography variant="h6" gutterBottom color="error.main">
              Available Margin
            </Typography>
            <Typography variant="h4" color="error.main" fontWeight="bold">
              ₹{Math.round(totalPortfolioValue * 0.3).toLocaleString('en-IN')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              30% of Portfolio
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Holdings Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Sector Allocation
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Technology', value: totalPortfolioValue * 0.4 },
                    { name: 'Banking', value: totalPortfolioValue * 0.25 },
                    { name: 'Pharma', value: totalPortfolioValue * 0.2 },
                    { name: 'Energy', value: totalPortfolioValue * 0.15 }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#82ca9d"
                  dataKey="value"
                >
                  {['#0088FE', '#00C49F', '#FFBB28', '#FF8042'].map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Holdings
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Avg. Price</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Net</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holdings.map((holding, index) => (
                <TableRow key={index}>
                  <TableCell>{holding.name}</TableCell>
                  <TableCell>{holding.qty}</TableCell>
                  <TableCell>{holding.avg}</TableCell>
                  <TableCell>{holding.price}</TableCell>
                  <TableCell>{holding.net}</TableCell>
                  <TableCell>{holding.day}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="success" 
                      size="small" 
                      onClick={() => handleBuyClick(holding)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Buy
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error" 
                      size="small"
                      onClick={() => handleSellClick(holding)}
                    >
                      Sell
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Positions
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Avg. Price</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Net</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positions.map((position, index) => (
                <TableRow key={index}>
                  <TableCell>{position.product}</TableCell>
                  <TableCell>{position.name}</TableCell>
                  <TableCell>{position.qty}</TableCell>
                  <TableCell>{position.avg}</TableCell>
                  <TableCell>{position.price}</TableCell>
                  <TableCell>{position.net}</TableCell>
                  <TableCell>{position.day}</TableCell>
                  <TableCell>{position.isLoss ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Buy Dialog */}
      <Dialog open={openBuyDialog} onClose={() => setOpenBuyDialog(false)}>
        <DialogTitle>Buy Stock</DialogTitle>
        <DialogContent>
          <TextField
            label="Stock Name"
            value={orderForm.name}
            onChange={handleFormChange('name')}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Quantity"
            type="number"
            value={orderForm.qty}
            onChange={handleFormChange('qty')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            type="number"
            value={orderForm.price}
            onChange={handleFormChange('price')}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBuyDialog(false)}>Cancel</Button>
          <Button onClick={handleOrderSubmit} variant="contained" color="success">
            Place Buy Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sell Dialog */}
      <Dialog open={openSellDialog} onClose={() => setOpenSellDialog(false)}>
        <DialogTitle>Sell Stock</DialogTitle>
        <DialogContent>
          <TextField
            label="Stock Name"
            value={orderForm.name}
            onChange={handleFormChange('name')}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Quantity"
            type="number"
            value={orderForm.qty}
            onChange={handleFormChange('qty')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            type="number"
            value={orderForm.price}
            onChange={handleFormChange('price')}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSellDialog(false)}>Cancel</Button>
          <Button onClick={handleOrderSubmit} variant="contained" color="error">
            Place Sell Order
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default DashboardPage;
