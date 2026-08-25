# Kichik Akademiya — private kindergarten landing page

A single-page marketing site for a private kindergarten in Uzbekistan, built to do one job well:
turn a visitor into an enrolment lead. Parents fill in a short form and the application is
delivered straight to the school's Telegram chat, so staff can call back within minutes without
any CRM or back office.

**Live demo:** https://kichikakademiya.vercel.app

## Features

- Responsive one-page layout, Uzbek-language, mobile-first (most traffic arrives from Instagram
  and Telegram on phones).
- Enrolment form: parent name, district, child's age (3–6), phone number.
- Client-side validation with an Uzbek phone mask (`+998 XX XXX-XXXX`) and inline error snackbars.
- Submissions are posted to a Telegram chat via the Bot API — no backend, no database, zero
  hosting cost.
- Animated success state so the parent gets immediate confirmation.

## Tech stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| UI | Material UI 7 + Emotion, Tailwind CSS 4 |
| Lead delivery | Telegram Bot API |
| Hosting | Vercel |

## Running locally

```bash
npm install
cp .env.example .env    # VITE_TELEGRAM_BOT_TOKEN, VITE_TELEGRAM_CHAT_ID
npm run dev             # http://localhost:5173
npm run build           # tsc -b && vite build
```

The Telegram credentials are read from environment variables and are never committed.
