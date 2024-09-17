// server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const PORT = 3000;
const HOST = '127.0.0.1';

// Create the server
const server = createServer(async (req, res) => {
  // Define the path to the HTML file
  const filePath = join(process.cwd(), 'index.html');

  try {
    // Read the HTML file
    const data = await readFile(filePath, 'utf-8');

    // Set the Content-Type to text/html
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (error) {
    // If there's an error (e.g., file not found), send a 404 response
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start the server
server.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}`);
});
