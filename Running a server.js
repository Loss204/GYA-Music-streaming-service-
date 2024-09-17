// server.mjs with static file handling
import { createServer } from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { lookup } from 'node:mime-types'; // Install with `npm install mime-types`

const PORT = 3000;
const HOST = '127.0.0.1';

// Create the server
const server = createServer(async (req, res) => {
  try {
    let filePath = join(process.cwd(), req.url === '/' ? 'index.html' : req.url);
    let contentType = lookup(extname(filePath)) || 'text/plain';

    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start the server
server.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}`);
});
