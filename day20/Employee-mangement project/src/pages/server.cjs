const express = require("express");
const cors = require("cors");
const multer = require("multer");
const XLSX = require("xlsx");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.any(), (req, res) => {
    console.log("Files:", req.files);
    console.log("Body:", req.body);

    res.json({
        files: req.files,
        body: req.body
    });
});

const PORT = process.env.PORT || 5000;

function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE') {
            console.error(`Port ${port} in use. Trying port ${port + 1}...`);
            setTimeout(() => startServer(Number(port) + 1), 200);
        } else {
            console.error('Server error:', err);
            process.exit(1);
        }
    });
}

startServer(PORT);