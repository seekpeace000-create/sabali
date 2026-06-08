import React, { useReducer, useState, useMemo, useEffect, useRef } from "react";
import {
  LayoutDashboard, Boxes, ShoppingCart, Users, Truck, FileText, BarChart3,
  Settings as SettingsIcon, Search, Plus, Bell, LogOut, Check, X, ArrowRight,
  Menu, AlertTriangle, Package, TrendingUp, TrendingDown, Shield, Globe, Zap,
  Building2, ChevronRight, Wallet, Receipt, ClipboardList, CircleDollarSign,
  Layers, Server, Lock, Gauge
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell
} from "recharts";

/* ============================ DESIGN TOKENS / CSS ============================ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap');

:root{
  --ink:#15201C; --bg-deep:#10211C; --brand:#1C4A3F; --brand-700:#16382F; --brand-900:#0E241E;
  --accent:#F0A92C; --accent-600:#D8941B; --teal:#2FA37D; --sand:#F4EFE4; --paper:#FFFFFF;
  --paper-2:#FBFAF6; --line:#E7E0D2; --line-2:#EFEADD; --line-dark:rgba(255,255,255,.10);
  --muted:#6E7B73; --muted-2:#9AA39B; --danger:#C5503B; --danger-bg:#FBEAE5;
  --shadow:0 1px 2px rgba(16,33,28,.05), 0 8px 24px -12px rgba(16,33,28,.18);
}
*{box-sizing:border-box}
.sb-root{font-family:'Inter',system-ui,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased;line-height:1.5}
.sb-root *::selection{background:var(--accent);color:var(--brand-900)}
.disp{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-.02em;line-height:1.02}
.mono{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}
button{font-family:inherit;cursor:pointer}
input,select,textarea{font-family:inherit;font-size:14px}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:6px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}

/* buttons */
.btn{display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:14px;border-radius:10px;
  padding:10px 16px;border:1px solid transparent;transition:.15s ease;white-space:nowrap}
.btn-pri{background:var(--accent);color:var(--brand-900);border-color:var(--accent-600)}
.btn-pri:hover{background:var(--accent-600)}
.btn-dark{background:var(--brand);color:#fff}
.btn-dark:hover{background:var(--brand-700)}
.btn-ghost{background:transparent;color:var(--ink);border-color:var(--line)}
.btn-ghost:hover{background:var(--paper-2);border-color:var(--muted-2)}
.btn-onbrand{background:rgba(255,255,255,.08);color:#fff;border-color:var(--line-dark)}
.btn-onbrand:hover{background:rgba(255,255,255,.15)}
.btn-sm{padding:7px 12px;font-size:13px;border-radius:8px}
.btn-danger{background:var(--danger-bg);color:var(--danger);border-color:#F0CcC4}
.btn:disabled{opacity:.5;cursor:not-allowed}

.tag{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:.08em;
  text-transform:uppercase;padding:5px 10px;border-radius:999px}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--accent-600)}

/* badges */
.badge{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;padding:3px 9px;border-radius:999px;white-space:nowrap}
.badge-green{background:#E4F1EA;color:#1C6B4F}
.badge-amber{background:#FCEFD3;color:#9C6A11}
.badge-red{background:var(--danger-bg);color:var(--danger)}
.badge-grey{background:#EDEAE0;color:var(--muted)}

/* cards / inputs */
.card{background:var(--paper);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow)}
.field label{display:block;font-size:12px;font-weight:600;color:var(--muted);margin-bottom:6px;letter-spacing:.01em}
.input{width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink)}
.input:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px rgba(28,74,63,.12)}

/* table */
.tbl{width:100%;border-collapse:collapse;font-size:14px}
.tbl th{text-align:left;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);
  font-weight:700;padding:12px 16px;border-bottom:1px solid var(--line)}
.tbl td{padding:13px 16px;border-bottom:1px solid var(--line-2);vertical-align:middle}
.tbl tbody tr:last-child td{border-bottom:none}
.tbl tbody tr:hover{background:var(--paper-2)}
.tbl-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:16px;background:var(--paper)}

/* modal */
.overlay{position:fixed;inset:0;background:rgba(14,36,30,.55);backdrop-filter:blur(3px);z-index:60;
  display:flex;align-items:center;justify-content:center;padding:20px;animation:fade .2s ease}
.modal{background:var(--paper);border-radius:20px;width:100%;max-width:560px;max-height:92vh;overflow:auto;
  box-shadow:0 30px 80px -20px rgba(16,33,28,.45);animation:rise .25s cubic-bezier(.2,.8,.2,1)}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}

/* app shell */
.shell{display:flex;min-height:100vh;background:var(--sand)}
.side{width:248px;flex:0 0 248px;background:var(--brand-900);color:#fff;display:flex;flex-direction:column;
  position:sticky;top:0;height:100vh}
.side a, .nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:10px;color:rgba(255,255,255,.72);
  font-size:14px;font-weight:500;transition:.12s;border:1px solid transparent;width:100%;text-align:left;background:none}
.nav-item:hover{background:rgba(255,255,255,.06);color:#fff}
.nav-item.on{background:rgba(240,169,44,.14);color:#fff;border-color:rgba(240,169,44,.3)}
.nav-item.on svg{color:var(--accent)}
.main{flex:1;min-width:0;display:flex;flex-direction:column}
.topbar{height:64px;background:rgba(255,255,255,.8);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);
  display:flex;align-items:center;gap:16px;padding:0 24px;position:sticky;top:0;z-index:30}
.content{padding:28px 28px 56px;max-width:1280px;width:100%;margin:0 auto}

/* stat */
.stat{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:18px 20px;box-shadow:var(--shadow)}
.stat .lbl{font-size:12px;font-weight:600;color:var(--muted);letter-spacing:.02em}
.stat .val{font-size:26px;font-weight:700;margin-top:6px;letter-spacing:-.02em}

/* marketing */
.hero{background:radial-gradient(120% 120% at 80% -10%, #1C4A3F 0%, #10211C 60%);color:#fff;position:relative;overflow:hidden}
.weave{position:absolute;inset:0;opacity:.5;pointer-events:none}
.feat{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:22px;transition:.18s;box-shadow:var(--shadow)}
.feat:hover{transform:translateY(-3px);border-color:var(--brand)}
.feat .ic{width:42px;height:42px;border-radius:11px;display:grid;place-items:center;background:#E8F0EB;color:var(--brand);margin-bottom:14px}
.price{background:var(--paper);border:1px solid var(--line);border-radius:20px;padding:28px;display:flex;flex-direction:column}
.price.pop{border-color:var(--brand);box-shadow:0 24px 60px -28px rgba(28,74,63,.5)}
.tline{display:flex;align-items:flex-start;gap:9px;font-size:14px;color:var(--ink);padding:7px 0}
.tline svg{color:var(--teal);flex:0 0 auto;margin-top:2px}
.scrim{position:fixed;inset:0;background:rgba(14,36,30,.5);z-index:55}

/* provisioning */
.prov-step{display:flex;align-items:center;gap:12px;padding:11px 0;font-size:14px;color:var(--muted);transition:.3s}
.prov-step.done{color:var(--ink)}
.prov-dot{width:22px;height:22px;border-radius:50%;border:2px solid var(--line);display:grid;place-items:center;flex:0 0 auto}
.prov-step.done .prov-dot{background:var(--teal);border-color:var(--teal);color:#fff}
.prov-step.active .prov-dot{border-color:var(--accent);animation:spin 1s linear infinite;border-top-color:transparent}
@keyframes spin{to{transform:rotate(360deg)}}

.grid{display:grid;gap:20px}
.hide-mobile{} 
@media(max-width:880px){
  .side{position:fixed;z-index:50;transform:translateX(-100%);transition:.25s;box-shadow:0 0 60px rgba(0,0,0,.4)}
  .side.open{transform:none}
  .hide-mobile{display:none!important}
  .content{padding:18px 16px 48px}
}
.fadein{animation:fade .35s ease}
.mobile-only{display:none!important}
@media(max-width:880px){.mobile-only{display:inline-flex!important}}
`;

/* ============================ HELPERS ============================ */
const CUR = { USD: "$", EUR: "€", GBP: "£", NGN: "₦", EGP: "E£", KES: "KSh", XOF: "CFA" };
const uid = (() => { let n = 1000; return () => ++n; })();
const todayISO = () => new Date().toISOString().slice(0, 10);
const fmtDate = (iso) => new Date(iso + "T00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

/* ============================ SEED DATA ============================ */
function seed() {
  const products = [
    { id: 201, sku: "SBL-COF-12", name: "Single-Origin Coffee 1kg", category: "Beverage", cost: 9.5, price: 21, stock: 120, reorder: 40 },
    { id: 202, sku: "SBL-TEA-08", name: "Hibiscus Tea 250g", category: "Beverage", cost: 3.2, price: 8.5, stock: 28, reorder: 35 },
    { id: 203, sku: "SBL-SHEA-05", name: "Shea Butter Jar 500ml", category: "Cosmetic", cost: 6.0, price: 18, stock: 64, reorder: 30 },
    { id: 204, sku: "SBL-BAG-01", name: "Woven Tote Bag", category: "Textile", cost: 11, price: 39, stock: 15, reorder: 20 },
    { id: 205, sku: "SBL-SPICE-09", name: "Suya Spice Blend 200g", category: "Food", cost: 2.4, price: 7, stock: 210, reorder: 60 },
    { id: 206, sku: "SBL-OIL-02", name: "Cold-Pressed Palm Oil 1L", category: "Food", cost: 5.5, price: 13, stock: 9, reorder: 25 },
  ];
  const customers = [
    { id: 301, name: "Adisa Grocers", contact: "Bisi Okoro", email: "bisi@adisagrocers.com", city: "Lagos", since: "2024-02-11" },
    { id: 302, name: "Marché Tilene", contact: "Awa Diop", email: "awa@tilene.sn", city: "Dakar", since: "2024-05-03" },
    { id: 303, name: "Nile Pantry", contact: "Karim Fahmy", email: "karim@nilepantry.eg", city: "Cairo", since: "2024-08-19" },
    { id: 304, name: "Highlands Café Co.", contact: "Wanjiru Kamau", email: "w.kamau@highlands.co.ke", city: "Nairobi", since: "2025-01-22" },
  ];
  const suppliers = [
    { id: 401, name: "Kintampo Farms", contact: "Yaw Mensah", email: "supply@kintampo.gh", lead: 7 },
    { id: 402, name: "Atlas Packaging", contact: "Salima Bennani", email: "orders@atlaspack.ma", lead: 12 },
    { id: 403, name: "Volta Textiles", contact: "Efua Asante", email: "sales@voltatex.gh", lead: 18 },
  ];
  const employees = [
    { id: 501, name: "Fatou Ndiaye", role: "Operations Lead", dept: "Operations", salary: 4200, start: "2023-09-01" },
    { id: 502, name: "Tunde Bakare", role: "Sales Manager", dept: "Sales", salary: 3800, start: "2024-01-15" },
    { id: 503, name: "Mariam Haddad", role: "Accountant", dept: "Finance", salary: 3500, start: "2024-03-20" },
    { id: 504, name: "Joseph Otieno", role: "Warehouse Associate", dept: "Operations", salary: 1900, start: "2024-07-10" },
  ];
  const orders = [
    { id: 601, customer: 301, date: "2026-05-28", status: "Fulfilled", lines: [{ p: 201, q: 20 }, { p: 205, q: 30 }] },
    { id: 602, customer: 303, date: "2026-06-02", status: "Fulfilled", lines: [{ p: 203, q: 12 }] },
    { id: 603, customer: 304, date: "2026-06-05", status: "Processing", lines: [{ p: 201, q: 10 }, { p: 204, q: 6 }] },
  ];
  const invoices = [
    { id: 701, order: 601, customer: 301, date: "2026-05-28", due: "2026-06-27", amount: 630, status: "Paid" },
    { id: 702, order: 602, customer: 303, date: "2026-06-02", due: "2026-07-02", amount: 216, status: "Unpaid" },
    { id: 703, order: 603, customer: 304, date: "2026-06-05", due: "2026-07-05", amount: 444, status: "Unpaid" },
  ];
  const purchases = [
    { id: 801, supplier: 401, date: "2026-05-20", status: "Received", product: 201, qty: 100, cost: 950 },
    { id: 802, supplier: 403, date: "2026-06-04", status: "Ordered", product: 204, qty: 40, cost: 440 },
  ];
  const trend = [
    { m: "Jan", rev: 14200 }, { m: "Feb", rev: 16800 }, { m: "Mar", rev: 15400 },
    { m: "Apr", rev: 19200 }, { m: "May", rev: 22600 }, { m: "Jun", rev: 9100 },
  ];
  return { products, customers, suppliers, employees, orders, invoices, purchases, trend };
}

/* ============================ REDUCER ============================ */
function reducer(state, a) {
  switch (a.type) {
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, { ...a.p, id: uid() }] };
    case "ADD_CUSTOMER":
      return { ...state, customers: [...state.customers, { ...a.c, id: uid(), since: todayISO() }] };
    case "ADD_SUPPLIER":
      return { ...state, suppliers: [...state.suppliers, { ...a.s, id: uid() }] };
    case "ADD_EMPLOYEE":
      return { ...state, employees: [...state.employees, { ...a.e, id: uid() }] };
    case "PAY_INVOICE":
      return { ...state, invoices: state.invoices.map(i => i.id === a.id ? { ...i, status: "Paid" } : i) };
    case "CREATE_ORDER": {
      const id = uid();
      const amount = a.lines.reduce((s, l) => {
        const p = state.products.find(x => x.id === l.p); return s + (p ? p.price * l.q : 0);
      }, 0);
      const order = { id, customer: a.customer, date: todayISO(), status: "Fulfilled", lines: a.lines };
      const products = state.products.map(p => {
        const ln = a.lines.find(l => l.p === p.id);
        return ln ? { ...p, stock: Math.max(0, p.stock - ln.q) } : p;
      });
      const inv = { id: uid(), order: id, customer: a.customer, date: todayISO(),
        due: new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10), amount, status: "Unpaid" };
      const trend = state.trend.map((t, i) => i === state.trend.length - 1 ? { ...t, rev: t.rev + amount } : t);
      return { ...state, orders: [order, ...state.orders], products, invoices: [inv, ...state.invoices], trend };
    }
    case "RECEIVE_PO":
      return {
        ...state,
        purchases: state.purchases.map(p => p.id === a.id ? { ...p, status: "Received" } : p),
        products: state.products.map(p => {
          const po = state.purchases.find(x => x.id === a.id);
          return po && po.product === p.id ? { ...p, stock: p.stock + po.qty } : p;
        })
      };
    case "CREATE_PO": {
      const prod = state.products.find(p => p.id === a.product);
      const po = { id: uid(), supplier: a.supplier, date: todayISO(), status: "Ordered",
        product: a.product, qty: a.qty, cost: prod ? prod.cost * a.qty : 0 };
      return { ...state, purchases: [po, ...state.purchases] };
    }
    case "SET_SETTINGS":
      return { ...state, company: { ...state.company, ...a.patch } };
    default: return state;
  }
}

/* ============================ SMALL UI ============================ */
const Modal = ({ title, sub, onClose, children, wide }) => (
  <div className="overlay" onClick={onClose}>
    <div className="modal" style={wide ? { maxWidth: 720 } : {}} onClick={e => e.stopPropagation()}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "22px 24px 0" }}>
        <div>
          <h3 className="disp" style={{ fontSize: 21, fontWeight: 700 }}>{title}</h3>
          {sub && <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>{sub}</p>}
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ padding: 8 }}><X size={16} /></button>
      </div>
      <div style={{ padding: "18px 24px 24px" }}>{children}</div>
    </div>
  </div>
);
const Field = ({ label, children }) => (
  <div className="field" style={{ marginBottom: 14 }}><label>{label}</label>{children}</div>
);
const Badge = ({ status }) => {
  const map = { Paid: "green", Fulfilled: "green", Received: "green", Active: "green",
    Unpaid: "amber", Processing: "amber", Ordered: "amber", Pending: "amber",
    Overdue: "red", Low: "red" };
  return <span className={`badge badge-${map[status] || "grey"}`}>{status}</span>;
};
const Logo = ({ size = 30, light }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="11" fill="var(--brand)" />
      <path d="M27 13.5c-1.6-2-4.2-3-7-3-3.9 0-7 2.3-7 5.6 0 6.4 13.4 3.6 13.4 9.6 0 2.3-2.4 3.8-5.4 3.8-2.7 0-5-1.1-6.5-3"
        stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="13" cy="27.5" r="2.1" fill="var(--accent)" />
      <circle cx="27" cy="12.5" r="2.1" fill="#fff" />
    </svg>
    <span className="disp" style={{ fontSize: size * 0.66, fontWeight: 800, color: light ? "#fff" : "var(--ink)" }}>Sabali</span>
  </div>
);

/* ============================ MARKETING ============================ */
function Marketing({ onStart }) {
  const features = [
    { ic: <Boxes size={20} />, t: "Inventory & Warehousing", d: "Real-time stock across locations, reorder points, and automatic low-stock alerts." },
    { ic: <ShoppingCart size={20} />, t: "Sales & Orders", d: "Quote to cash in one flow. Orders draw down stock and raise invoices instantly." },
    { ic: <Receipt size={20} />, t: "Accounting & Invoicing", d: "Receivables, payables, and a ledger that always ties back to operations." },
    { ic: <Users size={20} />, t: "CRM", d: "Every customer, contact, and order history in a single, searchable record." },
    { ic: <Truck size={20} />, t: "Purchasing", d: "Raise purchase orders, track lead times, and receive stock against them." },
    { ic: <BarChart3 size={20} />, t: "Reporting", d: "Live dashboards and exports built from the same data your team works in." },
  ];
  const why = [
    { ic: <Server size={18} />, t: "Your own private environment", d: "Every account is provisioned its own isolated instance and database. No shared tables, no noisy neighbours." },
    { ic: <Zap size={18} />, t: "Live in minutes, not months", d: "Sign up and your environment is built automatically. Walk in with sample data already wired up." },
    { ic: <Globe size={18} />, t: "Built for multi-currency trade", d: "Sell across borders with currency-aware pricing, invoicing, and reporting." },
    { ic: <Lock size={18} />, t: "You own your data", d: "Export everything, any time. Isolation by design keeps your books yours." },
  ];
  const tiers = [
    { name: "Starter", price: 39, blurb: "For a single team finding its feet.", pop: false,
      feats: ["1 environment", "Up to 3 users", "Inventory, Sales & Invoicing", "Email support"] },
    { name: "Growth", price: 99, blurb: "For operators scaling across functions.", pop: true,
      feats: ["1 environment", "Up to 15 users", "All modules incl. Purchasing & CRM", "Multi-currency", "Priority support"] },
    { name: "Scale", price: 249, blurb: "For multi-location businesses.", pop: false,
      feats: ["Unlimited users", "Multiple warehouses", "Advanced reporting & exports", "Dedicated onboarding"] },
  ];
  return (
    <div className="fadein">
      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(16,33,28,.82)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line-dark)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo light />
          <nav className="hide-mobile" style={{ display: "flex", gap: 28, color: "rgba(255,255,255,.8)", fontSize: 14, fontWeight: 500 }}>
            <a href="#features">Features</a><a href="#why">Why Sabali</a><a href="#pricing">Pricing</a>
          </nav>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-onbrand btn-sm" onClick={onStart}>Sign in</button>
            <button className="btn btn-pri btn-sm" onClick={onStart}>Start free trial</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <svg className="weave" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 14 }).map((_, i) => (
            <path key={i} d={`M${-200 + i * 110} 700 Q ${i * 110} 200 ${300 + i * 110} -100`} stroke="rgba(240,169,44,.10)" strokeWidth="1.5" fill="none" />
          ))}
        </svg>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "84px 24px 96px", position: "relative" }}>
          <div style={{ maxWidth: 720 }}>
            <span className="tag" style={{ background: "rgba(240,169,44,.16)", color: "var(--accent)" }}><Layers size={13} /> The operations platform for growing trade</span>
            <h1 className="disp" style={{ fontSize: "clamp(40px,6.5vw,68px)", fontWeight: 800, color: "#fff", marginTop: 22 }}>
              Run your whole business<br />on one calm system.
            </h1>
            <p style={{ color: "rgba(255,255,255,.78)", fontSize: 19, marginTop: 20, maxWidth: 560 }}>
              Sabali brings inventory, sales, purchasing, accounting and people into a single
              place — each account on its own private cloud environment. Patience, built in.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
              <button className="btn btn-pri" onClick={onStart} style={{ padding: "13px 22px", fontSize: 15 }}>
                Build my environment <ArrowRight size={17} />
              </button>
              <a href="#features" className="btn btn-onbrand" style={{ padding: "13px 22px", fontSize: 15 }}>See the modules</a>
            </div>
            <p className="mono" style={{ color: "rgba(255,255,255,.5)", fontSize: 12.5, marginTop: 18 }}>14-day trial · no card · your data stays yours</p>
          </div>
          {/* floating mini dashboard */}
          <div className="hide-mobile" style={{ position: "absolute", right: 24, top: 96, width: 360 }}>
            <div className="card" style={{ padding: 18, transform: "rotate(1.5deg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>Revenue · last 6 mo</span>
                <span className="badge badge-green"><TrendingUp size={12} /> +18%</span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={seed().trend}>
                  <defs><linearGradient id="h" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1C4A3F" stopOpacity={.35} /><stop offset="100%" stopColor="#1C4A3F" stopOpacity={0} />
                  </linearGradient></defs>
                  <Area dataKey="rev" stroke="#1C4A3F" strokeWidth={2.5} fill="url(#h)" />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
                <div style={{ background: "var(--paper-2)", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>Open orders</div>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 700 }}>12</div>
                </div>
                <div style={{ background: "var(--paper-2)", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>Low stock</div>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: "var(--danger)" }}>3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT BAR */}
      <div style={{ background: "var(--brand-900)", borderTop: "1px solid var(--line-dark)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 24px", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", color: "#fff" }}>
          {[["6", "core modules, one login"], ["< 2 min", "to provision an environment"], ["100%", "data isolation per account"], ["30+", "currencies supported"]].map(([n, l]) => (
            <div key={l}><div className="disp" style={{ fontSize: 30, fontWeight: 800, color: "var(--accent)" }}>{n}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{l}</div></div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" style={{ background: "var(--sand)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <span className="eyebrow">One platform</span>
          <h2 className="disp" style={{ fontSize: "clamp(30px,4vw,44px)", fontWeight: 800, marginTop: 10, maxWidth: 620 }}>
            Every part of the business, talking to every other part.
          </h2>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 40 }}>
            {features.map(f => (
              <div className="feat" key={f.t}>
                <div className="ic">{f.ic}</div>
                <h3 className="disp" style={{ fontSize: 19, fontWeight: 700 }}>{f.t}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 8 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" style={{ background: "var(--paper)", padding: "80px 24px", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 44 }}>
          <div style={{ maxWidth: 600 }}>
            <span className="eyebrow">Why Sabali</span>
            <h2 className="disp" style={{ fontSize: "clamp(30px,4vw,44px)", fontWeight: 800, marginTop: 10 }}>
              The ERP that respects your time and your data.
            </h2>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
            {why.map(w => (
              <div key={w.t} style={{ display: "flex", gap: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--brand)", color: "var(--accent)", display: "grid", placeItems: "center", flex: "0 0 auto" }}>{w.ic}</div>
                <div><h3 className="disp" style={{ fontSize: 17, fontWeight: 700 }}>{w.t}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 5 }}>{w.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: "var(--sand)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
            <span className="eyebrow">Simple monthly pricing</span>
            <h2 className="disp" style={{ fontSize: "clamp(30px,4vw,44px)", fontWeight: 800, marginTop: 10 }}>Pay monthly. Cancel anytime.</h2>
            <p style={{ color: "var(--muted)", marginTop: 12 }}>Each plan includes a dedicated environment built just for you.</p>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 44, alignItems: "stretch" }}>
            {tiers.map(t => (
              <div className={"price" + (t.pop ? " pop" : "")} key={t.name}>
                {t.pop && <span className="tag" style={{ background: "var(--brand)", color: "var(--accent)", alignSelf: "flex-start", marginBottom: 14 }}>Most popular</span>}
                <h3 className="disp" style={{ fontSize: 22, fontWeight: 700 }}>{t.name}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 4, minHeight: 40 }}>{t.blurb}</p>
                <div style={{ margin: "16px 0", display: "flex", alignItems: "flex-end", gap: 4 }}>
                  <span className="disp" style={{ fontSize: 44, fontWeight: 800 }}>${t.price}</span>
                  <span style={{ color: "var(--muted)", marginBottom: 8 }}>/mo</span>
                </div>
                <div style={{ flex: 1 }}>
                  {t.feats.map(f => <div className="tline" key={f}><Check size={16} />{f}</div>)}
                </div>
                <button className={"btn " + (t.pop ? "btn-dark" : "btn-ghost")} onClick={onStart} style={{ marginTop: 18, justifyContent: "center" }}>
                  Start with {t.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero" style={{ padding: "0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 24px", textAlign: "center", position: "relative" }}>
          <h2 className="disp" style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#fff" }}>Ready to run calmer?</h2>
          <p style={{ color: "rgba(255,255,255,.75)", marginTop: 12, fontSize: 17 }}>Build your environment now and explore Sabali with sample data.</p>
          <button className="btn btn-pri" onClick={onStart} style={{ marginTop: 24, padding: "13px 24px", fontSize: 15 }}>Start free trial <ArrowRight size={17} /></button>
        </div>
      </section>

      <footer style={{ background: "var(--brand-900)", color: "rgba(255,255,255,.6)", padding: "32px 24px", fontSize: 13 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <Logo light size={26} />
          <span>© {new Date().getFullYear()} Sabali. A prototype — built to be explored.</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================ SIGNUP / PROVISIONING ============================ */
function Signup({ onClose, onProvisioned }) {
  const [stage, setStage] = useState("form"); // form | provisioning
  const [form, setForm] = useState({ company: "", email: "", currency: "USD", plan: "Growth" });
  const [step, setStep] = useState(0);
  const steps = ["Reserving subdomain", "Spinning up your instance", "Provisioning database", "Loading sample data", "Securing your environment"];

  useEffect(() => {
    if (stage !== "provisioning") return;
    if (step >= steps.length) { const t = setTimeout(() => onProvisioned(form), 700); return () => clearTimeout(t); }
    const t = setTimeout(() => setStep(s => s + 1), 750);
    return () => clearTimeout(t);
  }, [stage, step]);

  const slug = (form.company || "your-co").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "your-co";

  if (stage === "provisioning") {
    return (
      <Modal title="Building your environment" sub={`${slug}.sabali.cloud`} onClose={() => {}}>
        <div style={{ padding: "4px 0" }}>
          {steps.map((s, i) => (
            <div key={s} className={"prov-step " + (i < step ? "done" : i === step ? "active" : "")}>
              <div className="prov-dot">{i < step ? <Check size={13} /> : null}</div>{s}
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
          In production this provisions an isolated instance + database per tenant. Here it's simulated.
        </p>
      </Modal>
    );
  }
  return (
    <Modal title="Create your Sabali account" sub="We'll build a private environment for your business." onClose={onClose}>
      <Field label="Business name">
        <input className="input" placeholder="e.g. Sahel Trading Co." value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })} autoFocus />
        <p className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 7 }}>{slug}.sabali.cloud</p>
      </Field>
      <Field label="Work email">
        <input className="input" type="email" placeholder="you@business.com" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Currency">
          <select className="input" value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })}>
            {Object.keys(CUR).map(c => <option key={c} value={c}>{c} ({CUR[c]})</option>)}
          </select>
        </Field>
        <Field label="Plan">
          <select className="input" value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value })}>
            {["Starter", "Growth", "Scale"].map(p => <option key={p}>{p}</option>)}
          </select>
        </Field>
      </div>
      <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
        disabled={!form.company || !form.email} onClick={() => setStage("provisioning")}>
        Build my environment <ArrowRight size={16} />
      </button>
      <p style={{ fontSize: 12.5, color: "var(--muted)", textAlign: "center", marginTop: 12 }}>
        14-day free trial · no payment details needed
      </p>
    </Modal>
  );
}

/* ============================ APP MODULES ============================ */
const sym = (s) => CUR[s.company.currency] || "$";
const money = (s, n) => sym(s) + Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Stat({ lbl, val, delta, icon, danger }) {
  return (
    <div className="stat">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div className="lbl">{lbl}</div>
        <div style={{ color: danger ? "var(--danger)" : "var(--brand)", opacity: .8 }}>{icon}</div>
      </div>
      <div className="val mono" style={danger ? { color: "var(--danger)" } : {}}>{val}</div>
      {delta != null && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6, fontSize: 12.5, fontWeight: 600, color: delta >= 0 ? "var(--teal)" : "var(--danger)" }}>
          {delta >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{Math.abs(delta)}% vs last month
        </div>
      )}
    </div>
  );
}

function Dashboard({ s }) {
  const nameOf = (id, list) => (list.find(x => x.id === id) || {}).name || "—";
  const invValue = s.products.reduce((a, p) => a + p.cost * p.stock, 0);
  const outstanding = s.invoices.filter(i => i.status === "Unpaid").reduce((a, i) => a + i.amount, 0);
  const collected = s.invoices.filter(i => i.status === "Paid").reduce((a, i) => a + i.amount, 0);
  const openOrders = s.orders.filter(o => o.status !== "Fulfilled").length + s.orders.length;
  const low = s.products.filter(p => p.stock <= p.reorder);
  const cat = useMemo(() => {
    const m = {}; s.products.forEach(p => m[p.category] = (m[p.category] || 0) + p.cost * p.stock);
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  }, [s.products]);
  const COLORS = ["#1C4A3F", "#2FA37D", "#F0A92C", "#D8941B", "#6E7B73", "#8FB7A6"];
  return (
    <div className="grid">
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))" }}>
        <Stat lbl="Revenue collected" val={money(s, collected)} delta={18} icon={<CircleDollarSign size={18} />} />
        <Stat lbl="Outstanding receivables" val={money(s, outstanding)} icon={<Wallet size={18} />} />
        <Stat lbl="Inventory value" val={money(s, invValue)} icon={<Boxes size={18} />} />
        <Stat lbl="Low-stock items" val={low.length} danger={low.length > 0} icon={<AlertTriangle size={18} />} />
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Revenue trend</div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={s.trend} margin={{ left: -16 }}>
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1C4A3F" stopOpacity={.3} /><stop offset="100%" stopColor="#1C4A3F" stopOpacity={0} />
              </linearGradient></defs>
              <CartesianGrid stroke="#EFEADD" vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 12, fill: "#6E7B73" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6E7B73" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => money(s, v)} />
              <Area dataKey="rev" stroke="#1C4A3F" strokeWidth={2.5} fill="url(#g)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Inventory by category</div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={cat} dataKey="value" nameKey="name" innerRadius={52} outerRadius={86} paddingAngle={3}>
                {cat.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => money(s, v)} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {cat.map((e, i) => <span key={e.name} style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: COLORS[i % COLORS.length] }} />{e.name}</span>)}
          </div>
        </div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "16px 20px", fontWeight: 700, borderBottom: "1px solid var(--line-2)" }}>Recent orders</div>
          <table className="tbl"><tbody>
            {s.orders.slice(0, 5).map(o => (
              <tr key={o.id}>
                <td className="mono" style={{ color: "var(--muted)" }}>#{o.id}</td>
                <td>{nameOf(o.customer, s.customers)}</td>
                <td style={{ color: "var(--muted)" }}>{fmtDate(o.date)}</td>
                <td style={{ textAlign: "right" }}><Badge status={o.status} /></td>
              </tr>
            ))}
          </tbody></table>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "16px 20px", fontWeight: 700, borderBottom: "1px solid var(--line-2)", display: "flex", alignItems: "center", gap: 8 }}>
            <AlertTriangle size={16} style={{ color: "var(--danger)" }} /> Needs reordering
          </div>
          {low.length === 0 ? <div style={{ padding: 20, color: "var(--muted)", fontSize: 14 }}>All stock above reorder points.</div> :
            <table className="tbl"><tbody>
              {low.map(p => (
                <tr key={p.id}><td>{p.name}</td>
                  <td className="mono" style={{ color: "var(--danger)" }}>{p.stock} left</td>
                  <td className="mono" style={{ color: "var(--muted)", textAlign: "right" }}>reorder ≤ {p.reorder}</td></tr>
              ))}
            </tbody></table>}
        </div>
      </div>
    </div>
  );
}

function Inventory({ s, dispatch }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ sku: "", name: "", category: "Food", cost: "", price: "", stock: "", reorder: "" });
  const add = () => {
    dispatch({ type: "ADD_PRODUCT", p: { sku: f.sku, name: f.name, category: f.category, cost: +f.cost, price: +f.price, stock: +f.stock, reorder: +f.reorder } });
    setOpen(false); setF({ sku: "", name: "", category: "Food", cost: "", price: "", stock: "", reorder: "" });
  };
  return (
    <>
      <Toolbar title={`${s.products.length} products`} onAdd={() => setOpen(true)} addLabel="Add product" />
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>SKU</th><th>Product</th><th>Category</th><th>Cost</th><th>Price</th><th>In stock</th><th>Status</th></tr></thead>
          <tbody>
            {s.products.map(p => (
              <tr key={p.id}>
                <td className="mono" style={{ color: "var(--muted)" }}>{p.sku}</td>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td><span className="badge badge-grey">{p.category}</span></td>
                <td className="mono">{money(s, p.cost)}</td>
                <td className="mono">{money(s, p.price)}</td>
                <td className="mono" style={p.stock <= p.reorder ? { color: "var(--danger)", fontWeight: 700 } : {}}>{p.stock}</td>
                <td>{p.stock <= p.reorder ? <Badge status="Low" /> : <Badge status="Active" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <Modal title="Add product" onClose={() => setOpen(false)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="SKU"><input className="input" value={f.sku} onChange={e => setF({ ...f, sku: e.target.value })} /></Field>
            <Field label="Category">
              <select className="input" value={f.category} onChange={e => setF({ ...f, category: e.target.value })}>
                {["Food", "Beverage", "Cosmetic", "Textile", "Other"].map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Product name"><input className="input" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            <Field label="Cost"><input className="input" type="number" value={f.cost} onChange={e => setF({ ...f, cost: e.target.value })} /></Field>
            <Field label="Price"><input className="input" type="number" value={f.price} onChange={e => setF({ ...f, price: e.target.value })} /></Field>
            <Field label="Stock"><input className="input" type="number" value={f.stock} onChange={e => setF({ ...f, stock: e.target.value })} /></Field>
            <Field label="Reorder ≤"><input className="input" type="number" value={f.reorder} onChange={e => setF({ ...f, reorder: e.target.value })} /></Field>
          </div>
          <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center" }} disabled={!f.name || !f.sku} onClick={add}>Save product</button>
        </Modal>
      )}
    </>
  );
}

function Sales({ s, dispatch }) {
  const [open, setOpen] = useState(false);
  const [cust, setCust] = useState(s.customers[0]?.id);
  const [lines, setLines] = useState([{ p: s.products[0]?.id, q: 1 }]);
  const nameOf = (id, list) => (list.find(x => x.id === id) || {}).name || "—";
  const total = lines.reduce((a, l) => { const p = s.products.find(x => x.id === +l.p); return a + (p ? p.price * l.q : 0); }, 0);
  const submit = () => {
    dispatch({ type: "CREATE_ORDER", customer: +cust, lines: lines.map(l => ({ p: +l.p, q: +l.q })) });
    setOpen(false); setLines([{ p: s.products[0]?.id, q: 1 }]);
  };
  return (
    <>
      <Toolbar title={`${s.orders.length} orders`} onAdd={() => setOpen(true)} addLabel="New order" />
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {s.orders.map(o => {
              const tot = o.lines.reduce((a, l) => { const p = s.products.find(x => x.id === l.p); return a + (p ? p.price * l.q : 0); }, 0);
              return <tr key={o.id}>
                <td className="mono" style={{ color: "var(--muted)" }}>#{o.id}</td>
                <td style={{ fontWeight: 600 }}>{nameOf(o.customer, s.customers)}</td>
                <td style={{ color: "var(--muted)" }}>{fmtDate(o.date)}</td>
                <td className="mono">{o.lines.reduce((a, l) => a + l.q, 0)}</td>
                <td className="mono" style={{ fontWeight: 600 }}>{money(s, tot)}</td>
                <td><Badge status={o.status} /></td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      {open && (
        <Modal title="New sales order" sub="Confirming reduces stock and raises an invoice." onClose={() => setOpen(false)} wide>
          <Field label="Customer">
            <select className="input" value={cust} onChange={e => setCust(e.target.value)}>
              {s.customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Line items</label>
          {lines.map((l, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 90px 36px", gap: 8, marginTop: 8 }}>
              <select className="input" value={l.p} onChange={e => { const n = [...lines]; n[i].p = e.target.value; setLines(n); }}>
                {s.products.map(p => <option key={p.id} value={p.id}>{p.name} — {money(s, p.price)} ({p.stock} in stock)</option>)}
              </select>
              <input className="input" type="number" min="1" value={l.q} onChange={e => { const n = [...lines]; n[i].q = e.target.value; setLines(n); }} />
              <button className="btn btn-ghost btn-sm" style={{ padding: 8, justifyContent: "center" }}
                onClick={() => setLines(lines.filter((_, x) => x !== i))} disabled={lines.length === 1}><X size={14} /></button>
            </div>
          ))}
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 10 }} onClick={() => setLines([...lines, { p: s.products[0]?.id, q: 1 }])}><Plus size={14} /> Add line</button>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
            <span style={{ color: "var(--muted)" }}>Order total</span>
            <span className="mono disp" style={{ fontSize: 24, fontWeight: 800 }}>{money(s, total)}</span>
          </div>
          <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={submit}>Confirm order</button>
        </Modal>
      )}
    </>
  );
}

function Customers({ s, dispatch }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: "", contact: "", email: "", city: "" });
  const ordersOf = (id) => s.orders.filter(o => o.customer === id).length;
  const add = () => { dispatch({ type: "ADD_CUSTOMER", c: f }); setOpen(false); setF({ name: "", contact: "", email: "", city: "" }); };
  return (
    <>
      <Toolbar title={`${s.customers.length} customers`} onAdd={() => setOpen(true)} addLabel="Add customer" />
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Customer</th><th>Contact</th><th>Email</th><th>City</th><th>Orders</th><th>Since</th></tr></thead>
          <tbody>
            {s.customers.map(c => (
              <tr key={c.id}><td style={{ fontWeight: 600 }}>{c.name}</td><td>{c.contact}</td>
                <td style={{ color: "var(--muted)" }}>{c.email}</td><td>{c.city}</td>
                <td className="mono">{ordersOf(c.id)}</td><td style={{ color: "var(--muted)" }}>{fmtDate(c.since)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <Modal title="Add customer" onClose={() => setOpen(false)}>
          <Field label="Business name"><input className="input" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Contact person"><input className="input" value={f.contact} onChange={e => setF({ ...f, contact: e.target.value })} /></Field>
            <Field label="City"><input className="input" value={f.city} onChange={e => setF({ ...f, city: e.target.value })} /></Field>
          </div>
          <Field label="Email"><input className="input" type="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} /></Field>
          <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center" }} disabled={!f.name} onClick={add}>Save customer</button>
        </Modal>
      )}
    </>
  );
}

function Purchasing({ s, dispatch }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ supplier: s.suppliers[0]?.id, product: s.products[0]?.id, qty: 50 });
  const nameOf = (id, list) => (list.find(x => x.id === id) || {}).name || "—";
  const create = () => { dispatch({ type: "CREATE_PO", supplier: +f.supplier, product: +f.product, qty: +f.qty }); setOpen(false); };
  return (
    <>
      <Toolbar title={`${s.purchases.length} purchase orders · ${s.suppliers.length} suppliers`} onAdd={() => setOpen(true)} addLabel="New PO" />
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>PO</th><th>Supplier</th><th>Product</th><th>Qty</th><th>Cost</th><th>Date</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {s.purchases.map(p => (
              <tr key={p.id}>
                <td className="mono" style={{ color: "var(--muted)" }}>#{p.id}</td>
                <td style={{ fontWeight: 600 }}>{nameOf(p.supplier, s.suppliers)}</td>
                <td>{nameOf(p.product, s.products)}</td>
                <td className="mono">{p.qty}</td><td className="mono">{money(s, p.cost)}</td>
                <td style={{ color: "var(--muted)" }}>{fmtDate(p.date)}</td>
                <td><Badge status={p.status} /></td>
                <td style={{ textAlign: "right" }}>
                  {p.status === "Ordered" && <button className="btn btn-ghost btn-sm" onClick={() => dispatch({ type: "RECEIVE_PO", id: p.id })}>Receive</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <Modal title="New purchase order" sub="Receiving a PO adds the quantity to stock." onClose={() => setOpen(false)}>
          <Field label="Supplier"><select className="input" value={f.supplier} onChange={e => setF({ ...f, supplier: e.target.value })}>
            {s.suppliers.map(x => <option key={x.id} value={x.id}>{x.name} · {x.lead}d lead</option>)}</select></Field>
          <Field label="Product"><select className="input" value={f.product} onChange={e => setF({ ...f, product: e.target.value })}>
            {s.products.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select></Field>
          <Field label="Quantity"><input className="input" type="number" value={f.qty} onChange={e => setF({ ...f, qty: e.target.value })} /></Field>
          <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center" }} onClick={create}>Raise purchase order</button>
        </Modal>
      )}
    </>
  );
}

function Invoices({ s, dispatch }) {
  const nameOf = (id) => (s.customers.find(x => x.id === id) || {}).name || "—";
  const overdue = (i) => i.status === "Unpaid" && new Date(i.due) < new Date();
  return (
    <>
      <Toolbar title={`${s.invoices.length} invoices`} />
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Invoice</th><th>Customer</th><th>Issued</th><th>Due</th><th>Amount</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {s.invoices.map(i => (
              <tr key={i.id}>
                <td className="mono" style={{ color: "var(--muted)" }}>INV-{i.id}</td>
                <td style={{ fontWeight: 600 }}>{nameOf(i.customer)}</td>
                <td style={{ color: "var(--muted)" }}>{fmtDate(i.date)}</td>
                <td style={{ color: overdue(i) ? "var(--danger)" : "var(--muted)" }}>{fmtDate(i.due)}</td>
                <td className="mono" style={{ fontWeight: 600 }}>{money(s, i.amount)}</td>
                <td><Badge status={overdue(i) ? "Overdue" : i.status} /></td>
                <td style={{ textAlign: "right" }}>
                  {i.status === "Unpaid" && <button className="btn btn-ghost btn-sm" onClick={() => dispatch({ type: "PAY_INVOICE", id: i.id })}><Check size={14} /> Mark paid</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function People({ s, dispatch }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ name: "", role: "", dept: "Operations", salary: "", start: todayISO() });
  const add = () => { dispatch({ type: "ADD_EMPLOYEE", e: { ...f, salary: +f.salary } }); setOpen(false); setF({ name: "", role: "", dept: "Operations", salary: "", start: todayISO() }); };
  const payroll = s.employees.reduce((a, e) => a + e.salary, 0);
  return (
    <>
      <Toolbar title={`${s.employees.length} employees · ${money(s, payroll)}/mo payroll`} onAdd={() => setOpen(true)} addLabel="Add employee" />
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Monthly salary</th><th>Start date</th></tr></thead>
          <tbody>
            {s.employees.map(e => (
              <tr key={e.id}><td style={{ fontWeight: 600 }}>{e.name}</td><td>{e.role}</td>
                <td><span className="badge badge-grey">{e.dept}</span></td>
                <td className="mono">{money(s, e.salary)}</td><td style={{ color: "var(--muted)" }}>{fmtDate(e.start)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <Modal title="Add employee" onClose={() => setOpen(false)}>
          <Field label="Full name"><input className="input" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Role"><input className="input" value={f.role} onChange={e => setF({ ...f, role: e.target.value })} /></Field>
            <Field label="Department"><select className="input" value={f.dept} onChange={e => setF({ ...f, dept: e.target.value })}>
              {["Operations", "Sales", "Finance", "People", "Tech"].map(d => <option key={d}>{d}</option>)}</select></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Monthly salary"><input className="input" type="number" value={f.salary} onChange={e => setF({ ...f, salary: e.target.value })} /></Field>
            <Field label="Start date"><input className="input" type="date" value={f.start} onChange={e => setF({ ...f, start: e.target.value })} /></Field>
          </div>
          <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center" }} disabled={!f.name} onClick={add}>Save employee</button>
        </Modal>
      )}
    </>
  );
}

function Reports({ s }) {
  const topProducts = useMemo(() => {
    const m = {};
    s.orders.forEach(o => o.lines.forEach(l => {
      const p = s.products.find(x => x.id === l.p); if (p) m[p.name] = (m[p.name] || 0) + l.q * p.price;
    }));
    return Object.entries(m).map(([name, rev]) => ({ name, rev })).sort((a, b) => b.rev - a.rev).slice(0, 6);
  }, [s.orders, s.products]);
  const ar = s.invoices.reduce((acc, i) => { acc[i.status] = (acc[i.status] || 0) + i.amount; return acc; }, {});
  return (
    <div className="grid">
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontWeight: 700, marginBottom: 14 }}>Revenue by product</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={topProducts} margin={{ left: -10 }}>
            <CartesianGrid stroke="#EFEADD" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6E7B73" }} axisLine={false} tickLine={false} interval={0} angle={-12} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 11, fill: "#6E7B73" }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => money(s, v)} />
            <Bar dataKey="rev" fill="#1C4A3F" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
        <Stat lbl="Collected (paid)" val={money(s, ar.Paid || 0)} icon={<Check size={18} />} />
        <Stat lbl="Outstanding (unpaid)" val={money(s, ar.Unpaid || 0)} icon={<Wallet size={18} />} danger />
        <Stat lbl="Avg order value" val={money(s, s.orders.length ? s.orders.reduce((a, o) => a + o.lines.reduce((x, l) => { const p = s.products.find(z => z.id === l.p); return x + (p ? p.price * l.q : 0); }, 0), 0) / s.orders.length : 0)} icon={<Receipt size={18} />} />
        <Stat lbl="SKUs tracked" val={s.products.length} icon={<Boxes size={18} />} />
      </div>
    </div>
  );
}

function SettingsView({ s, dispatch }) {
  const [c, setC] = useState(s.company);
  useEffect(() => setC(s.company), [s.company]);
  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", maxWidth: 900 }}>
      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontWeight: 700, marginBottom: 16 }}>Company profile</div>
        <Field label="Business name"><input className="input" value={c.name} onChange={e => setC({ ...c, name: e.target.value })} /></Field>
        <Field label="Currency"><select className="input" value={c.currency} onChange={e => setC({ ...c, currency: e.target.value })}>
          {Object.keys(CUR).map(x => <option key={x} value={x}>{x} ({CUR[x]})</option>)}</select></Field>
        <button className="btn btn-dark" onClick={() => dispatch({ type: "SET_SETTINGS", patch: c })}>Save changes</button>
      </div>
      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontWeight: 700, marginBottom: 16 }}>Environment & subscription</div>
        {[["Environment", `${(s.company.name || "your-co").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.sabali.cloud`],
        ["Plan", s.company.plan], ["Status", "Trialing (14 days)"], ["Isolation", "Dedicated instance + database"]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid var(--line-2)" }}>
            <span style={{ color: "var(--muted)", fontSize: 14 }}>{k}</span>
            <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{v}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button className="btn btn-pri">Upgrade plan</button>
          <button className="btn btn-ghost">Manage billing</button>
        </div>
      </div>
    </div>
  );
}

const Toolbar = ({ title, onAdd, addLabel }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, gap: 12, flexWrap: "wrap" }}>
    <span style={{ color: "var(--muted)", fontSize: 14, fontWeight: 500 }}>{title}</span>
    {onAdd && <button className="btn btn-dark btn-sm" onClick={onAdd}><Plus size={15} /> {addLabel}</button>}
  </div>
);

/* ============================ APP SHELL ============================ */
const NAV = [
  ["dashboard", "Dashboard", LayoutDashboard],
  ["sales", "Sales", ShoppingCart],
  ["inventory", "Inventory", Boxes],
  ["purchasing", "Purchasing", Truck],
  ["customers", "Customers", Users],
  ["invoices", "Invoices", FileText],
  ["people", "People", ClipboardList],
  ["reports", "Reports", BarChart3],
  ["settings", "Settings", SettingsIcon],
];
const TITLES = Object.fromEntries(NAV.map(([k, l]) => [k, l]));

function App() {
  const [view, setView] = useState("marketing"); // marketing | signup | app
  const [state, dispatch] = useReducer(reducer, null, () => ({ ...seed(), company: { name: "Demo Co.", currency: "USD", plan: "Growth", email: "" } }));
  const [mod, setMod] = useState("dashboard");
  const [navOpen, setNavOpen] = useState(false);

  const start = () => setView("signup");
  const provisioned = (form) => {
    dispatch({ type: "SET_SETTINGS", patch: { name: form.company, currency: form.currency, plan: form.plan, email: form.email } });
    setView("app"); setMod("dashboard");
  };

  return (
    <div className="sb-root">
      <style>{CSS}</style>

      {view === "marketing" && <Marketing onStart={start} />}
      {view === "signup" && (
        <>
          <Marketing onStart={() => {}} />
          <Signup onClose={() => setView("marketing")} onProvisioned={provisioned} />
        </>
      )}

      {view === "app" && (
        <div className="shell">
          {navOpen && <div className="scrim" onClick={() => setNavOpen(false)} />}
          <aside className={"side" + (navOpen ? " open" : "")}>
            <div style={{ padding: "20px 18px 14px" }}><Logo light size={26} /></div>
            <div style={{ padding: "0 14px 12px", margin: "0 6px 8px 6px", borderBottom: "1px solid var(--line-dark)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 6px 14px" }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--accent)", color: "var(--brand-900)", display: "grid", placeItems: "center", fontWeight: 800, fontFamily: "Bricolage Grotesque" }}>
                  {(state.company.name || "?").slice(0, 1)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{state.company.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{state.company.plan} plan</div>
                </div>
              </div>
            </div>
            <nav style={{ padding: "4px 14px", display: "flex", flexDirection: "column", gap: 3, flex: 1, overflowY: "auto" }}>
              {NAV.map(([key, label, Icon]) => (
                <button key={key} className={"nav-item" + (mod === key ? " on" : "")} onClick={() => { setMod(key); setNavOpen(false); }}>
                  <Icon size={18} /> {label}
                </button>
              ))}
            </nav>
            <div style={{ padding: 14, borderTop: "1px solid var(--line-dark)" }}>
              <button className="nav-item" onClick={() => { setView("marketing"); }}><LogOut size={18} /> Sign out</button>
            </div>
          </aside>

          <div className="main">
            <header className="topbar">
              <button className="btn btn-ghost btn-sm mobile-only" style={{ padding: 8 }} onClick={() => setNavOpen(true)}><Menu size={18} /></button>
              <h1 className="disp" style={{ fontSize: 20, fontWeight: 700 }}>{TITLES[mod]}</h1>
              <div style={{ flex: 1 }} />
              <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid var(--line)", borderRadius: 10, padding: "8px 12px", width: 240, color: "var(--muted)" }}>
                <Search size={15} /><input style={{ border: "none", outline: "none", background: "none", width: "100%", color: "var(--ink)" }} placeholder="Search…" />
              </div>
              <button className="btn btn-ghost btn-sm" style={{ padding: 9 }}><Bell size={17} /></button>
            </header>
            <main className="content fadein" key={mod}>
              {mod === "dashboard" && <Dashboard s={state} />}
              {mod === "sales" && <Sales s={state} dispatch={dispatch} />}
              {mod === "inventory" && <Inventory s={state} dispatch={dispatch} />}
              {mod === "purchasing" && <Purchasing s={state} dispatch={dispatch} />}
              {mod === "customers" && <Customers s={state} dispatch={dispatch} />}
              {mod === "invoices" && <Invoices s={state} dispatch={dispatch} />}
              {mod === "people" && <People s={state} dispatch={dispatch} />}
              {mod === "reports" && <Reports s={state} />}
              {mod === "settings" && <SettingsView s={state} dispatch={dispatch} />}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
