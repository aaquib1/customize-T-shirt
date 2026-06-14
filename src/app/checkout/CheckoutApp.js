"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import ShirtMockup from "@/components/mockup/ShirtMockup";
import Button from "@/components/buttons/Button";
import { useToast } from "@/components/toast/ToastProvider";
import { loadCheckoutDesign, clearCheckoutDesign } from "@/utils/localStorage";
import { products, getColorHex, getProductPrice, colors } from "@/data/products";
import { upiApps } from "@/data/payments";

const EMPTY_FORM = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
};

const SHIPPING_FEE = 49;

export default function CheckoutApp() {
  const router = useRouter();
  const { showToast } = useToast();

  const [design, setDesign] = useState(undefined); // undefined = loading
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setDesign(loadCheckoutDesign());
  }, []);

  function handleFieldChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePlaceOrder(e) {
    e.preventDefault();

    const requiredFields = [
      ["fullName", "your full name"],
      ["phone", "a phone number"],
      ["addressLine1", "your address"],
      ["city", "your city"],
      ["state", "your state"],
      ["pincode", "your pincode"],
    ];

    for (const [field, label] of requiredFields) {
      if (!form[field].trim()) {
        showToast(`Please enter ${label}.`, "error");
        return;
      }
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      showToast("Please enter a valid 10-digit phone number.", "error");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      showToast("Please enter a valid 6-digit pincode.", "error");
      return;
    }

    if (!selectedPayment) {
      showToast("Please select a UPI payment app.", "error");
      return;
    }

    if (!upiId.trim().includes("@")) {
      showToast("Please enter a valid UPI ID, e.g. name@upi.", "error");
      return;
    }

    const orderId = `FS${Date.now().toString().slice(-8)}`;
    setOrder({ id: orderId, total: getTotal(design) });
    clearCheckoutDesign();
    showToast("Order placed successfully!", "success");
  }

  if (design === undefined) {
    return <div className="min-h-[60vh] bg-cream" />;
  }

  if (order) {
    return <OrderConfirmation order={order} />;
  }

  if (!design) {
    return (
      <div className="bg-cream">
        <div className="mx-auto max-w-2xl px-5 py-16 text-center md:px-8">
          <p className="font-display text-2xl font-semibold text-ink">No design selected</p>
          <p className="mt-2 text-sm text-muted">
            Head back to the studio and choose &ldquo;Buy Now&rdquo; on a design to start checkout.
          </p>
          <div className="mt-6 flex justify-center">
            <Button href="/customize">Go to studio</Button>
          </div>
        </div>
      </div>
    );
  }

  const productLabel = products.find((p) => p.id === design.product)?.label || "Garment";
  const price = getProductPrice(design.product);
  const total = price + SHIPPING_FEE;

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-5 md:px-8 md:py-12">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage-dark">Checkout</span>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Shipping & payment
        </h1>

        <form onSubmit={handlePlaceOrder} className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
          <div className="space-y-6">
            {/* Shipping address */}
            <section className="rounded-2xl border border-line bg-paper p-5 shadow-card sm:p-6">
              <h2 className="font-display text-lg font-semibold text-ink">Shipping address</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="fullName" value={form.fullName} onChange={handleFieldChange} placeholder="Jordan Lee" />
                <Field label="Phone number" name="phone" value={form.phone} onChange={handleFieldChange} placeholder="9876543210" inputMode="numeric" />
                <Field label="Address line 1" name="addressLine1" value={form.addressLine1} onChange={handleFieldChange} placeholder="House no., street" className="sm:col-span-2" />
                <Field label="Address line 2 (optional)" name="addressLine2" value={form.addressLine2} onChange={handleFieldChange} placeholder="Landmark, area" className="sm:col-span-2" />
                <Field label="City" name="city" value={form.city} onChange={handleFieldChange} placeholder="Patna" />
                <Field label="State" name="state" value={form.state} onChange={handleFieldChange} placeholder="Bihar" />
                <Field label="Pincode" name="pincode" value={form.pincode} onChange={handleFieldChange} placeholder="800001" inputMode="numeric" />
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-line bg-paper p-5 shadow-card sm:p-6">
              <h2 className="font-display text-lg font-semibold text-ink">Pay with UPI</h2>
              <p className="mt-1 text-sm text-muted">Choose your UPI app to complete payment.</p>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {upiApps.map((app) => {
                  const active = selectedPayment === app.id;
                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setSelectedPayment(app.id)}
                      aria-pressed={active}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${
                        active ? "border-sage bg-sage-light" : "border-line hover:border-sage/40"
                      }`}
                    >
                      <span
                        className="grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-white"
                        style={{ backgroundColor: app.accent }}
                      >
                        {app.initials}
                      </span>
                      <span className="text-xs font-medium text-ink">{app.label}</span>
                    </button>
                  );
                })}
              </div>

              {selectedPayment && (
                <div className="mt-4">
                  <Field
                    label="UPI ID"
                    name="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                  />
                </div>
              )}

              <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                <ShieldCheck className="h-4 w-4 text-sage" /> Payments are simulated in this demo — no real transaction is made.
              </p>
            </section>
          </div>

          {/* Order summary */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-2xl border border-line bg-paper p-5 shadow-card">
              <h2 className="font-display text-lg font-semibold text-ink">Order summary</h2>

              <div className="mt-4 flex gap-4">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-cream">
                  <ShirtMockup product={design.product} color={getColorHex(design.color)} className="h-4/5 w-4/5" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{productLabel}</p>
                  <p className="text-xs text-muted">
                    Color: {colors.find((c) => c.id === design.color)?.label || design.color} &middot; Size: {design.size}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {design.layers.length} custom layer{design.layers.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Item price</dt>
                  <dd className="text-ink">₹{price}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Shipping</dt>
                  <dd className="text-ink">₹{SHIPPING_FEE}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-2 font-display text-base font-semibold">
                  <dt className="text-ink">Total</dt>
                  <dd className="text-sage-dark">₹{total}</dd>
                </div>
              </dl>

              <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                <Truck className="h-4 w-4 text-sage" /> Estimated delivery in 3–5 business days.
              </p>
            </section>

            <button
              type="submit"
              className="w-full rounded-full bg-sage px-6 py-3.5 font-display text-sm font-medium text-cream transition-colors hover:bg-sage-dark"
            >
              Place Order &middot; ₹{total}
            </button>
          </aside>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, inputMode, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-sage"
      />
    </div>
  );
}

function getTotal(design) {
  const price = getProductPrice(design.product);
  return price + SHIPPING_FEE;
}

function OrderConfirmation({ order }) {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-xl px-5 py-16 text-center md:px-8">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-light">
          <CheckCircle2 className="h-8 w-8 text-sage-dark" />
        </div>
        <h1 className="mt-5 font-display text-2xl font-semibold text-ink md:text-3xl">
          Order placed!
        </h1>
        <p className="mt-2 text-sm text-muted">
          Your order <span className="font-semibold text-ink">#{order.id}</span> has been
          confirmed. A confirmation has been sent to your registered phone number.
        </p>
        <p className="mt-1 text-sm text-muted">
          Total paid: <span className="font-semibold text-sage-dark">₹{order.total}</span>
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/customize">Design another</Button>
          <Button href="/drafts" variant="secondary">
            View my drafts
          </Button>
        </div>
      </div>
    </div>
  );
}
