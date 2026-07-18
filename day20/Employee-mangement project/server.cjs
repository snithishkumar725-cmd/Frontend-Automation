const express = require("express");
const cors = require("cors");
const multer = require("multer");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

// ── DB Helpers ────────────────────────────────────────────────────────────────
const readDB = () => {
    try {
        if (!fs.existsSync(dbPath)) {
            return { employees: [], uploads: [] };
        }
        const data = fs.readFileSync(dbPath, "utf8");
        return JSON.parse(data || '{"employees":[],"uploads":[]}');
    } catch (err) {
        console.error("Error reading database:", err);
        return { employees: [], uploads: [] };
    }
};

const writeDB = (data) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
    } catch (err) {
        console.error("Error writing to database:", err);
    }
};

// ── Employee API Routes ───────────────────────────────────────────────────────

// GET /api/employees – list all employees
app.get("/api/employees", (req, res) => {
    const db = readDB();
    res.json(db.employees);
});

// GET /api/employees/:id – get single employee
app.get("/api/employees/:id", (req, res) => {
    const db = readDB();
    const emp = db.employees.find(e => String(e.id) === String(req.params.id));
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
});

// POST /api/employees – create new employee
app.post("/api/employees", (req, res) => {
    const db = readDB();
    const maxId = db.employees.length > 0
        ? Math.max(...db.employees.map(e => parseInt(e.id) || 0))
        : 0;
    const newId = maxId + 1;
    const empData = req.body;
    const newEmp = {
        ...empData,
        id: String(newId),
        employeeId: `EMP${String(newId).padStart(3, "0")}`,
        avatar: empData.name
            ? empData.name.split(" ").map(n => n[0]).join("").toUpperCase()
            : "??",
        joinDate: empData.joinDate || new Date().toISOString().split("T")[0],
        performance: empData.performance || 0,
        projects: empData.projects || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    db.employees.push(newEmp);
    writeDB(db);
    console.log(`[POST] Employee created: ${newEmp.name} (ID: ${newId})`);
    res.status(201).json({ message: "Employee created successfully", employee: newEmp });
});

// PUT /api/employees/:id – update employee
app.put("/api/employees/:id", (req, res) => {
    const db = readDB();
    const idx = db.employees.findIndex(e => String(e.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ message: "Employee not found" });
    db.employees[idx] = {
        ...db.employees[idx],
        ...req.body,
        id: db.employees[idx].id,       // prevent id overwrite
        updatedAt: new Date().toISOString(),
    };
    writeDB(db);
    console.log(`[PUT] Employee updated: ID ${req.params.id}`);
    res.json({ message: "Employee updated successfully", employee: db.employees[idx] });
});

// DELETE /api/employees/:id – delete employee
app.delete("/api/employees/:id", (req, res) => {
    const db = readDB();
    const idx = db.employees.findIndex(e => String(e.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ message: "Employee not found" });
    const deleted = db.employees.splice(idx, 1)[0];
    writeDB(db);
    console.log(`[DELETE] Employee removed: ${deleted.name} (ID: ${deleted.id})`);
    res.json({ message: "Employee deleted successfully", employee: deleted });
});

// ── File Upload Route ─────────────────────────────────────────────────────────
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.any(), (req, res) => {
    console.log("Files received:", req.files);
    const db = readDB();
    const newUploads = (req.files || []).map(file => ({
        id: Date.now() + "_" + Math.random().toString(36).substring(2, 9),
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        destination: file.destination,
        filename: file.filename,
        path: file.path,
        size: file.size,
        uploadedAt: new Date().toISOString()
    }));
    db.uploads = [...db.uploads, ...newUploads];
    writeDB(db);
    res.json({ message: "Upload saved successfully", files: newUploads });
});

// GET /uploads – list all upload records
app.get("/uploads", (req, res) => {
    const db = readDB();
    res.json(db.uploads);
});

// ── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        console.log(`  Employee API: http://localhost:${port}/api/employees`);
        console.log(`  Uploads API:  http://localhost:${port}/uploads`);
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