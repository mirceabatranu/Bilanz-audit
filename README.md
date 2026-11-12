# BBA site-uri

Three bilingual (RO/EN) sites for Buchhaltung & Bilanz Audit, hosted on one Firebase project:

| Domain | Hosting target | Firebase site ID |
|---|---|---|
| infractiunifiscale.ro | `infractiuni` | `infractiunifiscale` |
| atragerearaspunderii.ro | `atragere` | `atragerearaspunderii` |
| litigiimunca.ro | `litigii` | `litigiimunca` |

## How it fits together

- `src/pages/<domain>.html` holds the page content in both languages (elements tagged `lang="ro"` / `lang="en"`). **Edit content here.**
- `npm run build` writes `dist/<domain>/` with `/` (RO), `/en/` (EN), `/confidentialitate/`, `/en/privacy/`, `404.html`, `sitemap.xml`, `robots.txt`, `llms.txt` and `favicon.svg`.
- Every site's form posts to `/api/contact`, which Firebase Hosting forwards to the `contact` Cloud Function (`functions/index.js`, region `europe-west1`). The function saves the message to the Firestore collection `mesajeContact` and emails it through Resend to `bilanzaudit@gmail.com`.
- Firestore rules block all browser access. Only the function writes.

## One-time setup

1. **Firebase project.** In https://console.firebase.google.com create the project and switch it to the **Blaze** plan (needed for Cloud Functions; this traffic stays in the free quota, but add a small budget alert). Create a **Firestore** database in an EU location (e.g. `eur3` or `europe-west1`).
2. **Point this folder at it.** If the project ID is not `bba-site-uri`, replace it in `.firebaserc` (both places).
   ```
   firebase login
   firebase use bba-site-uri
   ```
3. **Create the three hosting sites.** If a site ID is taken, pick another and update `.firebaserc`.
   ```
   firebase hosting:sites:create infractiunifiscale
   firebase hosting:sites:create atragerearaspunderii
   firebase hosting:sites:create litigiimunca
   ```
4. **Resend.** Create an account at https://resend.com, add `infractiunifiscale.ro` as a domain and add the DNS records it shows in Cloudflare (DNS only). Create an API key, then store it as a secret (the command asks you to paste it, so it never lands in a file):
   ```
   firebase functions:secrets:set RESEND_API_KEY
   ```
   The sender defaults to `formular@infractiunifiscale.ro` and the recipient to `bilanzaudit@gmail.com`. To change them, create `functions/.env` with `MAIL_FROM=...` and `MAIL_TO=...` (comma-separate several recipients).
5. **Deploy everything.**
   ```
   npm run deploy
   ```
   Test each `https://<site-id>.web.app` and send a form message.
6. **Custom domains (Cloudflare).** Firebase console → Hosting → each site → *Add custom domain*. Add the apex domain (e.g. `litigiimunca.ro`) and `www` set to redirect to it. Copy the TXT and A records Firebase shows into Cloudflare DNS with the proxy **off** (grey cloud, "DNS only"). Delete any older A/AAAA/CNAME records for the same names first. The SSL certificate usually appears within an hour.
7. **Google Search Console.** Add each domain as a *Domain* property (verification through Cloudflare is automatic) and submit `https://<domain>/sitemap.xml`. Bing Webmaster Tools can import the sites straight from Search Console.

## Day to day

- Change text or design: edit `src/pages/<domain>.html`, then `npm run deploy:sites` (pages only) or `npm run deploy` (pages and function).
- Local preview with working form: `npm run preview` (Firebase emulators).
- Read messages: Firebase console → Firestore → `mesajeContact`. `emailStatus` shows `sent` or `failed`.
