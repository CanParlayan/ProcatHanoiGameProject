# Tower of Hanoi — Web Game

A group web-game project based on the **Tower of Hanoi** puzzle, with single-player and multiplayer-related pages.

## Features and architecture

- Browser-based Hanoi puzzle UI.
- Separate single-player, multiplayer, and lobby pages.
- Node.js server code using Express and Socket.IO.
- Redis/MySQL integration code in the repository.

The project uses older web dependencies and includes development artifacts. Treat it as an **archived-era student project**, not a hardened production service.

## Repository layout

- `index.html` — Entry page.
- `singleplayer.html` / `multiplayer.html` — Game modes.
- `lobby.html` — Multiplayer lobby.
- `src/` — Frontend assets and scripts.
- `server.js`, `db.js` — Backend and data-access code.
- `package.json` — Node.js dependencies.

## Inspecting or running locally

Install Node.js and dependencies:

```bash
git clone https://github.com/CanParlayan/ProcatHanoiGameProject.git
cd ProcatHanoiGameProject
npm install
```

There is currently no `npm start` script declared in `package.json`. Review the server's database and Redis requirements, and configure an isolated development environment before attempting multiplayer setup. Static pages can be inspected independently, although browser and server features may need a local HTTP server.

## Original team

The site's credits list **Gökçe Koçak, Halil Can Parlayan, Kerem Aktaş, Ömer Pirim, and Yusuf Alakuş**.

**Security note:** Do not connect the legacy backend directly to a public network without a dependency and configuration review.
