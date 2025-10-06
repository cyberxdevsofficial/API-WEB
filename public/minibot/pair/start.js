import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Serve main public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve Mini Bot sub-app
import minibotApp from './public/minibot/pair/index.js'; // your mini bot entry
app.use('/minibot/pair', minibotApp);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
