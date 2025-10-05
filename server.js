import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.get('/', (req,res) => res.sendFile(path.join(__dirname,'public','index.html')));
app.get('/docs', (req,res) => res.sendFile(path.join(__dirname,'public','docs.html')));
app.get('/marketplace', (req,res) => res.sendFile(path.join(__dirname,'public','marketplace.html')));
app.get('/contact', (req,res) => res.sendFile(path.join(__dirname,'public','contact.html')));
app.get('/ai', (req,res) => res.sendFile(path.join(__dirname,'public','ai.html')));
app.use('/minibot', express.static(path.join(__dirname,'public','minibot')));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
