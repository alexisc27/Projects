const app = require('./app');
const http = require('http');
const { PORT } = require('./config');

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});