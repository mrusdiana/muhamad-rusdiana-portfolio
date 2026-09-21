# Contact form setup

The contact form posts to `/api/contact` and sends through the Resend API. Add these server-side environment variables in `.env.local` and in the deployment environment:

```text
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL=Portfolio <hello@your-verified-domain.com>
```

Verify the sender domain in Resend first. The destination is fixed to `muhamadrusdiana452@gmail.com` in the route. Visitors' email addresses are used as `reply_to`, so replies go to them. Restart the development server after adding `.env.local`.
