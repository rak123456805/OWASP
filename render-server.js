import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// List of all microservices and their ports
const microservices = [
    { name: 'broken-access-control', path: 'server/broken-access-control/server.js', port: 4000 },
    { name: 'cryptographic-failures', path: 'server/cryptographic-failures/server.js', port: 5001 },
    { name: 'injection', path: 'server/injection/server.js', port: 5100 },
    { name: 'insecure-design', path: 'server/insecure-design/server.js', port: 5200 },
    { name: 'security-logging-failures', path: 'server/security-logging-failures/server.js', port: 5600 },
    { name: 'security-misconfiguration', path: 'server/security-misconfiguration/server.js', port: 5300 },
    { name: 'server-side-request-forgery', path: 'server/server-side-request-forgery/server.js', port: 5500 },
    { name: 'software-data-integrity', path: 'server/software-data-integrity/server.js', port: 5400 },
    { name: 'vulnerable-components', path: 'server/vulnerable-components/server.js', port: 5002 },
    { name: 'chatbot', path: 'server/chatbot/server.js', port: 5700 },
];

// 1. Start all microservices as child processes
microservices.forEach((service) => {
    console.log(`Starting service: ${service.name} on port ${service.port}...`);
    const child = spawn('node', [service.path], {
        env: { ...process.env, PORT: service.port },
        stdio: 'inherit',
        shell: true
    });

    child.on('error', (err) => {
        console.error(`Failed to start service ${service.name}:`, err);
    });
});

// 2. Setup Proxy for each microservice
// Matches /proxy/:port/* and routes to localhost:port/*
app.use('/proxy/:port', (req, res, next) => {
    const targetPort = req.params.port;
    return createProxyMiddleware({
        target: `http://localhost:${targetPort}`,
        changeOrigin: true,
        pathRewrite: {
            [`^/proxy/${targetPort}`]: '',
        },
        // Don't crash if service isn't ready yet
        onError: (err, req, res) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Proxy Error: ' + err.message);
        }
    })(req, res, next);
});

// 3. Serve Frontend Build (from 'dist' directory)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for SPA (React Router)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 XploitSim Gateway Server is running!`);
    console.log(`🔗 Port: ${PORT}`);
    console.log(`📂 Serving frontend from /dist`);
    console.log(`🌉 Proxying /proxy/:port to localhost:port`);
    console.log(`===============================================`);
});
