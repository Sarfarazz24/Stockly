# Zerodha Trading Dashboard

A full-stack trading application with authentication, real-time portfolio tracking, and buy/sell functionality.

## 🚀 Features

- **User Authentication**: JWT-based signup/login system
- **Dashboard**: Portfolio overview with pie charts and P&L tracking
- **Trading**: Buy and sell stocks with order management
- **Real-time Updates**: Dynamic portfolio calculations
- **Responsive Design**: Material-UI based interface

## 📁 Project Structure

```
ZERODHA/
├── backend/                 # Node.js/Express API
│   ├── Controllers/         # Authentication controllers
│   ├── Routes/             # API routes
│   ├── middlewares/        # JWT middleware
│   ├── model/              # Data models
│   ├── schemas/            # MongoDB schemas
│   ├── util/               # Utility functions
│   └── index.js            # Main server file
├── front/                  # React frontend
│   ├── src/
│   │   ├── landing_page/   # Page components
│   │   │   ├── dashboard/  # Dashboard with charts
│   │   │   └── signup/     # Auth forms
│   │   └── index.js       # App entry point
│   └── public/             # Static assets
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Render account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ZERODHA
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URL and JWT secret
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd front
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🌐 Deployment on Render

### Backend Deployment

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Select the `backend` folder as root directory
   - Use the `render.yaml` configuration
   - Set environment variables:
     - `NODE_ENV`: production
     - `PORT`: 10000
     - `MONGO_URL`: Your MongoDB connection string
     - `TOKEN_KEY`: Your JWT secret key

2. **Backend URL**: `https://your-backend-name.onrender.com`

### Frontend Deployment

1. **Create a new Static Site on Render**
   - Connect your GitHub repository
   - Select the `front` folder as root directory
   - Use the `render.yaml` configuration
   - Set environment variable:
     - `NODE_ENV`: production

2. **Frontend URL**: `https://your-frontend-name.onrender.com`

### Environment Variables Configuration

**Backend (.env)**:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/zerodha
TOKEN_KEY=your_strong_jwt_secret_key_here
NODE_ENV=production
PORT=10000
```

**Frontend (.env.production)**:
```
REACT_APP_API_URL=https://your-backend-name.onrender.com
```

## 🔧 Configuration Updates

### CORS Settings
Update the CORS origins in `backend/index.js`:
```javascript
origin: ["https://your-frontend-name.onrender.com", "http://localhost:3000"]
```

### API URLs
The frontend automatically uses the production API URL when deployed:
```javascript
axios.get(process.env.REACT_APP_API_URL || "http://localhost:5000/endpoint")
```

## 📊 Application Features

### Authentication
- User signup with email validation
- Secure login with JWT tokens
- Protected routes with middleware
- Cookie-based session management

### Dashboard
- Portfolio value display
- P&L calculations (daily & total)
- Holdings distribution pie chart
- Sector allocation visualization
- Available margin tracking

### Trading
- Buy stocks with order form
- Sell stocks with validation
- Real-time portfolio updates
- Order confirmation notifications

## 🧪 Testing

Run the test suite to verify functionality:
```bash
cd backend
node test-with-cookies.js
```

## 📝 Important Notes

1. **Security**: Use a strong JWT secret key in production
2. **Database**: Ensure MongoDB Atlas allows connections from Render
3. **CORS**: Update allowed origins for your specific domains
4. **Environment**: Keep sensitive data in environment variables
5. **Build**: Frontend automatically uses production API URL when built

## 🚀 Deploy Steps Summary

1. Push code to GitHub
2. Create backend web service on Render
3. Create frontend static site on Render
4. Configure environment variables
5. Update CORS settings
6. Deploy and test both services

## 📞 Support

For issues with deployment:
1. Check Render build logs
2. Verify environment variables
3. Ensure MongoDB connectivity
4. Test API endpoints individually
5. Check CORS configuration

---

**Happy Trading! 📈💰**
