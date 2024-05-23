const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());
app.use(helmet()); // Add security headers
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information
const PORT = process.env.PORT || 5000;


const rateLimit = 20;
const interval = 60 * 1000; // 1 min

const requestCounts = {}

setInterval(() =>{
    Object.keys(requestCounts).forEach((ip) =>{
        requestCounts[ip] = 0;
    }
)},interval) // reset after every interval 


const rateLimitAndTimeout = (req,res,next) =>{
    const ip = req.ip
    console.log("This is ur IP : ",ip);

    requestCounts[ip] = (requestCounts[ip] || 0)+1
    if(requestCounts[ip] > rateLimit){
        return res.status(429).json({
            code: 429,
            status: "Error",
            message: "Rate limit exceeded.",
            data: null,
          });
    }

    // Set timeout for each request (example: 15 seconds)
    req.setTimeout(15000, () => {
        console.log("Denied");
        res.status(504).json({
          code: 504,
          status: "Error",
          message: "Gateway timeout.",
          data: null,
        });
        req.abort(); // Abort the request
      });

      next();
}

// Apply the rate limit and timeout middleware to all requests
app.use(rateLimitAndTimeout);


const services = [
    { route: '/api/auth', target: 'http://localhost:8001' }, // User auth service
    { route: '/api/live', target: 'http://localhost:8000' }, // Live streaming service
]

services.forEach(({ route, target }) => {
    const proxyOptions = {
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${route}`]: "",
      },
    };
    console.log(proxyOptions);
  
    app.use(route, createProxyMiddleware(proxyOptions));
  });

  app.use((_req, res) => {
    res.status(404).json({
      code: 404,
      status: "Error",
      message: "Route not found.",
      data: null,
    });
   });


app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
  });