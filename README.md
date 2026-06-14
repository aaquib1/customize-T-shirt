# Forma Studio — Custom T-Shirt Design Platform

A frontend-only Next.js 15 (App Router) project for browsing apparel
templates and designing custom t-shirts, hoodies, sweatshirts, and
oversized tees in a Canva-style studio — including text, stickers,
image uploads, saved drafts, and a UPI checkout flow. Built with
JavaScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    page.js              Landing page (server component, SEO metadata)
    layout.js            Root layout, fonts, global metadata, ToastProvider
    sitemap.js           Generated sitemap
    robots.js            Generated robots.txt
    customize/
      layout.js          Route metadata for /customize
      page.js            Server wrapper (Suspense boundary)
      CustomizeApp.js    Client component — all studio state
    drafts/
      layout.js          Route metadata for /drafts
      page.js            Server entry point
      DraftsApp.js        Client component — saved draft list
    checkout/
      layout.js          Route metadata for /checkout
      page.js            Server entry point
      CheckoutApp.js     Client component — shipping + UPI payment

  components/
    navbar/              Navbar, Footer, Logo
    hero/                Animated hero visual (mockup + floating badges)
    typing-text/         Typewriter heading component
    product-card/        Template preview card
    mockup/              Shared SVG garment illustrations
    customization-panel/ Studio sidebars, canvas, and controls
      ProductSelector.js   Garment type
      ColorPicker.js       Circular swatch color picker (24 colors)
      SizeSelector.js      Size buttons
      CanvasPreview.js     Live mockup + draggable layers
      TextPanel.js         Add/edit text layers
      StickerPanel.js      Preset + custom sticker layers
      PositionControls.js  Move/center/reset selected layer
    upload-image/        Validated image upload (multi-image)
    toast/               Global toast notifications (ToastProvider)
    stats/               Hero stats row
    buttons/             Shared Button component (green primary CTA)

  sections/              Landing page sections (hero, how-it-works,
                         templates, pricing, testimonials, faq, contact)

  data/                  Static content: products, colors, sizes,
                         hero copy, stickers, UPI payment apps
  hooks/                 useTypingEffect (typewriter animation)
  utils/                 localStorage helpers + design state factories
```

## How the customizer works

All studio state lives in a single `design` object inside
`CustomizeApp.js`, managed with `useState`:

```js
{
  product: "tshirt",   // tshirt | hoodie | sweatshirt | oversized
  color: "white",      // one of 24 colors, see data/products.js
  size: "M",
  layers: [
    { id, type: "text",    content, fontSize, fontWeight, color, align, x, y },
    { id, type: "sticker", content: "🔥", fontSize, x, y },        // preset emoji
    { id, type: "sticker", src, scale, x, y },                      // custom upload
    { id, type: "image",   src, scale, x, y }
  ]
}
```

- `x` / `y` are percentages of the canvas, so layers stay correctly
  positioned at any screen size.
- All layer types are draggable directly on the canvas (Framer Motion
  `drag`), and can be nudged with the **Design Position** controls
  (Move Up / Move Down / Center / Reset).
- Image and sticker uploads are validated (`src/utils/designState.js`
  — PNG/JPG only, 5MB max) with toast error messages on failure.

### Drafts

- **Save Draft** stores the current design as a named entry in
  `localStorage` (`src/utils/localStorage.js`) and is also
  auto-saved as you work, so reloading `/customize` restores your
  last session.
- `/drafts` lists every saved draft with a live mockup preview, and
  lets you **Edit** (reopens `/customize?draft=<id>`), **Buy Now**, or
  **Delete** each one.

### Buy Now / Checkout

- **Buy Now** (on `/customize` and `/drafts`) stores the selected
  design for checkout and navigates to `/checkout`.
- `/checkout` collects a shipping address and a UPI payment method
  (PhonePe, Google Pay, Paytm, CRED, Amazon Pay, or any other UPI
  app) + UPI ID. All fields are validated client-side with toast
  errors. Submitting shows an order confirmation screen — no real
  payment is processed.

State is intentionally kept simple with `useState` — if the studio
grows (undo/redo history, multi-page designs, collaborative editing),
consider migrating to Zustand at that point rather than upfront.

## Connecting a Node.js backend later

- Replace the functions in `src/utils/localStorage.js`
  (`saveDraft`, `getDrafts`, `loadCurrentDesign`,
  `saveCheckoutDesign`, etc.) with calls to your API
  (e.g. `POST /api/designs`, `GET /api/designs/:id`), keeping the same
  `design` object shape.
- `CheckoutApp.js`'s `handlePlaceOrder` is the single place to swap in
  a real order + payment API call (e.g. `POST /api/orders`, then
  redirect to a real UPI intent or payment gateway).
- The contact form in `src/sections/contact/ContactSection.js` already
  has a `handleSubmit` placeholder ready for a `POST /api/contact`
  call.
- Product, color, and size data in `src/data/products.js` can be
  swapped for data fetched from a CMS or database.
- Image/sticker uploads are currently stored as base64 data URLs;
  swap the `FileReader` step in `ImageUpload.js` / `StickerPanel.js`
  for an upload to your storage provider and store the returned URL.

## SEO

- Metadata, Open Graph, and Twitter cards are defined via the Next.js
  Metadata API in `src/app/layout.js` and `src/app/page.js`.
- `src/app/sitemap.js` and `src/app/robots.js` generate
  `/sitemap.xml` and `/robots.txt` automatically.
- `/customize`, `/drafts`, and `/checkout` are marked `noindex` since
  they're interactive tools, not content pages.

## Responsive design

- The customizer reflows to a single column on mobile/tablet, with
  the live canvas shown first, followed by garment options and then
  the customization tools.
- The color picker, sticker grid, and payment options all wrap into
  fewer columns on narrow screens.
- Toast notifications stack at the bottom-center on mobile and
  bottom-right on larger screens.
