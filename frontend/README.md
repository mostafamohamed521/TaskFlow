# TaskFlow Frontend

Plain HTML, CSS and vanilla JavaScript (ES modules). No framework, no build step.

## Run locally

ES modules need an HTTP server; opening files with `file://` will not run the scripts.

**VS Code Live Server:** open the `frontend` folder, right-click `index.html` → *Open with Live Server*.

**Python:**

```bash
cd frontend
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

## Where things are

| Area | Location |
| --- | --- |
| Landing + public pages | `index.html`, `pages/public/` |
| Authentication (11 pages) | `pages/auth/` |
| Onboarding (4 steps) | `pages/onboarding/` |
| Account Settings (6 pages) | `pages/app/settings/` |
| Overview (temporary) | `pages/app/dashboard/index.html` |
| Client Portal (temporary) | `pages/client-portal/index.html` |
| Design tokens | `css/foundation/tokens.css` |
| Layouts | `css/layouts/` (auth + onboarding) |
| Shared components | `css/components/` |
| Page styles | `css/pages/auth/`, `css/pages/onboarding/` |
| Responsive rules | `css/responsive/` |
| Shared JS modules | `js/modules/` |
| Onboarding state | `js/pages/onboarding/onboarding-state.js` |
| Mock services (replace with API) | `js/services/mock/` |
| Artwork | `public/assets/illustrations/` |

Details: `../docs/`.

## Demo mode

There is no backend. Everything in `js/services/mock/` simulates outcomes:

- Sign in with any valid email and any password. The password `wrong` simulates invalid credentials.
- `team@demo.example` and `freelancer@demo.example` already have a workspace; `client@demo.example` goes to the
  Client Portal; any other address goes to onboarding (or resumes it).
- An account that finished onboarding in this browser goes straight to its workspace next time.
- No email is sent, no token is validated, no password is stored.
- Settings are saved per account in this browser. See `../docs/SETTINGS-MOCK-BEHAVIOR.md`.

## Try the settings

Sign in as `freelancer@demo.example` (any password), then open the avatar menu → **My Profile**.

## Receiving contact messages

Edit `js/data/site-config.js`:

- `contactEmail: 'you@example.com'` sends messages through FormSubmit (confirm the activation email on the first message).
- or `contactEndpoint: 'https://formspree.io/f/xxxx'` for any form service that accepts a JSON POST.

With both empty, the form only shows a demo confirmation.
