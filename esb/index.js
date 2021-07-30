const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');


// Create Express Server
const app = express();

// Configuration
const port = 3000;
// const HOST = "localhost";
const API_LOGIN_URL = "https://saas-team31-soa-login.herokuapp.com";
const API_SERVER1_URL = "https://saas-team31-soa-questions.herokuapp.com";
const API_SERVER2_URL = "https://saas-team31-soa-analytics.herokuapp.com";




// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });


 // Proxy endpoints
app.use('/auth/login', createProxyMiddleware({
    target: API_LOGIN_URL,
    changeOrigin: true,

 }));
 app.use('/user', createProxyMiddleware({
    target: API_LOGIN_URL,
    changeOrigin: true,

 }));



app.use('/question/popular', createProxyMiddleware({
   target: API_SERVER2_URL,
   changeOrigin: true,

}));
app.use('/question/unanswered', createProxyMiddleware({
   target: API_SERVER2_URL,
   changeOrigin: true,

}));
app.use('/question/latest', createProxyMiddleware({
    target: API_SERVER2_URL,
    changeOrigin: true,

 }));
app.use('/question/keyword/:keyword', createProxyMiddleware({
   target: API_SERVER2_URL,
   changeOrigin: true,

}));
app.use('/question/user', createProxyMiddleware({
   target: API_SERVER2_URL,
   changeOrigin: true,

}));
app.use('/keyword/popular', createProxyMiddleware({
   target: API_SERVER2_URL,
   changeOrigin: true,

}));





 app.use('/question/id/:id', createProxyMiddleware({
    target: API_SERVER1_URL,
    changeOrigin: true,

 }));
 app.use('/keyword/id/:id', createProxyMiddleware({
    target: API_SERVER1_URL,
    changeOrigin: true,

 }));
 app.use('/answer', createProxyMiddleware({
    target: API_SERVER1_URL,
    changeOrigin: true,

 }));
 app.use('/question', createProxyMiddleware({
    target: API_SERVER1_URL,
    changeOrigin: true,

 }));
 app.use('/keyword', createProxyMiddleware({
    target: API_SERVER1_URL,
    changeOrigin: true,

 }));
 app.use('/healthcheck', createProxyMiddleware({
    target: API_SERVER1_URL,
    changeOrigin: true,

 }));

 // Start the Proxy
app.listen(process.env.PORT || port, () => {
    console.log(`Starting Proxy at ${process.env.PORT}`);
 });
