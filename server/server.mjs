// server/server.mjs
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

// Debug: Server is starting
console.log("Starting server...");

// Configure CSP to allow Google Fonts
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'"],
                "style-src-elem": ["'self'", "https://fonts.googleapis.com"],
                "style-src": ["'self'", "https://fonts.googleapis.com"],
                "font-src": ["'self'", "https://fonts.gstatic.com"],
            },
        },
    })
);

app.use(cors());

// Serve static files from the client/public folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../client/public")));

// Endpoint to fetch data from both URLs
app.get("/api/data", async (req, res) => {
    try {
        console.log("Fetching data from external APIs...");

        const [data1, data2] = await Promise.all([
            fetch("https://data.calgary.ca/resource/ggxk-g2u3.json").then((res) => res.json()),
            fetch("https://data.calgary.ca/resource/rhkg-vwwp.json").then((res) => res.json()),
        ]);

        console.log("Data fetched successfully. Sending to client...");
        res.json({ data1, data2 });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
