const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// =============================================
// Set the bonus flag cookie on every request
// This is intentionally readable (not httpOnly)
// so players can steal it via XSS
// =============================================
app.use((req, res, next) => {
  res.cookie('secret', 'FLAG{cookies_are_not_just_snacks}', {
    httpOnly: false  // Intentionally vulnerable — allows JS access
  });
  next();
});

// =============================================
// XSS-VULNERABLE feedback endpoint
// NEVER do this in a real app — we intentionally
// reflect user input back without sanitizing it.
// This is for CTF education only.
// =============================================
app.post('/feedback', (req, res) => {
  const { name, message } = req.body;

  // Intentionally vulnerable — reflects raw input directly into HTML
  // A safe app would use: escapeHtml(name) and escapeHtml(message)
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Evil Corp | Feedback Received</title>
      <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&family=Barlow:wght@300;400;600&display=swap" rel="stylesheet"/>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: #06030a;
          font-family: 'Barlow', sans-serif;
          color: #c0b8cc;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card {
          background: #0d0814;
          border: 1px solid rgba(224,26,43,0.25);
          padding: 3rem;
          max-width: 600px;
          width: 90%;
          text-align: center;
        }
        .logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.15em;
          color: #f0eaf8;
          margin-bottom: 2rem;
        }
        .logo span { color: #e01a2b; }
        h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: #f0eaf8;
          margin-bottom: 1rem;
        }
        .message-display {
          background: rgba(0,0,0,0.4);
          border-left: 3px solid #e01a2b;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          text-align: left;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.8rem;
          color: #c0b8cc;
          line-height: 1.8;
        }
        .back-link {
          display: inline-block;
          margin-top: 1.5rem;
          color: #e01a2b;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-decoration: none;
        }
        .back-link:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="logo">EVIL<span>CORP</span></div>
        <h2>Feedback Received</h2>
        <p style="font-size:0.85rem; color: rgba(192,184,204,0.6);">
          Thank you for your submission. An Evil Corp representative will review your feedback and ignore it.
        </p>
        <div class="message-display">
          <div><strong style="color:#e01a2b">From:</strong> ${name}</div>
          <div style="margin-top:0.5rem"><strong style="color:#e01a2b">Message:</strong> ${message}</div>
        </div>
        <a href="/feedback.html" class="back-link">&larr; Submit another complaint</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`\n🔴 Evil Corp XSS Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from ./public`);
  console.log(`\n[GAMEMASTER NOTE] Share this URL with players on the local network.`);
  console.log(`To find your local IP: run 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux)\n`);
});
