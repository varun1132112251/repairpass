import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Download,
  FileText,
  Laptop,
  LayoutDashboard,
  MapPin,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Tablet,
  Wrench,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "My Devices", path: "/devices", icon: Smartphone },
  { label: "Service Centers", path: "/centers", icon: Store },
  { label: "Repairs", path: "/repairs", icon: Wrench, count: "2" },
  { label: "Fixora", path: "/repairpass", icon: ShieldCheck },
];
const devices = [
  {
    id: "iphone-15-pro",
    brand: "Apple",
    name: "iPhone 15 Pro",
    type: "Smartphone",
    detail: "256GB · Natural Titanium",
    serial: "F2LQ3C1J4H",
    repairPassId: "RP-IPH15-8F42",
    registered: "September 22, 2026",
    purchase: "Apple Store · Fifth Avenue",
    warranty: "Until September 22, 2026",
    warrantyState: "Active",
    icon: Smartphone,
    color: "coral",
    issue: "Screen replacement",
    currentRepair: true,
  },
  {
    id: "macbook-air-m2",
    brand: "Apple",
    name: "MacBook Air M2",
    type: "Laptop",
    detail: "13-inch · 2022",
    serial: "C02YH0Q7J1G5",
    repairPassId: "RP-MBAIR-2C19",
    registered: "July 18, 2026",
    purchase: "Apple Store · SoHo",
    warranty: "Until July 18, 2027",
    warrantyState: "Active",
    icon: Laptop,
    color: "mint",
    issue: "Battery replacement",
    currentRepair: false,
  },
  {
    id: "galaxy-s24",
    brand: "Samsung",
    name: "Galaxy S24",
    type: "Smartphone",
    detail: "256GB · Onyx Black",
    serial: "R5CX91D2NPA",
    repairPassId: "RP-GALS24-7D03",
    registered: "February 1, 2026",
    purchase: "Samsung Experience Store",
    warranty: "Until February 1, 2027",
    warrantyState: "Active",
    icon: Smartphone,
    color: "yellow",
    issue: "Annual diagnostic",
    currentRepair: false,
  },
  {
    id: "ipad-air",
    brand: "Apple",
    name: "iPad Air",
    type: "Tablet",
    detail: "5th generation · 2022",
    serial: "DMPQX4W7VK",
    repairPassId: "RP-IPADAIR-4B77",
    registered: "April 02, 2026",
    purchase: "Apple Store · Upper West",
    warranty: "Until April 02, 2027",
    warrantyState: "Active",
    icon: Tablet,
    color: "lavender",
    issue: "Annual diagnostic",
    currentRepair: false,
  },
];
const centers = [
  {
    id: "fixpoint",
    name: "FixPoint Service Center",
    brand: "Apple Authorized Service Provider",
    distance: "0.8 mi",
    rating: "4.9",
    address: "128 W 34th Street, New York, NY",
    time: "1–2 business days",
    services: ["Screen repair", "Battery service", "Diagnostics"],
    color: "coral",
  },
  {
    id: "genius",
    name: "Genius Care Manhattan",
    brand: "Apple Authorized Service Provider",
    distance: "1.4 mi",
    rating: "4.8",
    address: "742 Broadway, New York, NY",
    time: "2–3 business days",
    services: ["Screen repair", "Water damage", "Diagnostics"],
    color: "mint",
  },
  {
    id: "mobilemedic",
    name: "Mobile Medic NYC",
    brand: "Samsung Authorized Service Center",
    distance: "2.1 mi",
    rating: "4.7",
    address: "215 Park Avenue South, New York, NY",
    time: "Same day available",
    services: ["Screen repair", "Battery service", "Software"],
    color: "yellow",
  },
];
const repairHistory = [
  {
    device: "iPhone 15 Pro",
    date: "August 18, 2026",
    center: "FixPoint Service Center",
    authorization: "Apple Authorized Service Provider",
    repair: "Display replacement",
    parts: "Genuine replacement display",
    issue: "Screen damage",
    repairId: "RP-2026-1048",
    warranty: "90-day service warranty",
    icon: Smartphone,
    color: "coral",
  },
  {
    device: "MacBook Air M2",
    date: "May 18, 2026",
    center: "FixPoint Service Center",
    authorization: "Apple Authorized Service Provider",
    repair: "Battery replacement",
    parts: "MacBook Air battery · Genuine Apple part",
    issue: "Battery wear",
    repairId: "RP-2026-0816",
    warranty: "90-day service warranty",
    icon: Laptop,
    color: "mint",
  },
  {
    device: "iPad Air",
    date: "April 02, 2026",
    center: "Genius Care Manhattan",
    repair: "Annual diagnostic",
    parts: "No parts replaced",
    warranty: "Service inspection complete",
    icon: Tablet,
    color: "yellow",
  },
];
function routeName(path) {
  if (path === "/") return "Dashboard";
  if (path.startsWith("/devices"))
    return path.includes("/details") ? "Device Details" : "My Devices";
  if (path.startsWith("/centers")) return "Service Centers";
  if (path.startsWith("/request")) return "Create Repair Request";
  if (path.startsWith("/tracking")) return "Repair Tracking";
  if (path.startsWith("/repairs")) return "Repairs";
  return "Fixora";
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [selectedCenter, setSelectedCenter] = useState(centers[0]);
  const [modal, setModal] = useState(null);
  const [repairRequest, setRepairRequest] = useState({
    id: "RP-2026-1048",
    problem: "Screen damage",
    description: "Cracked display after an accidental drop.",
    date: "August 25, 2026",
    stage: 3,
  });
  useEffect(() => {
    const syncRoute = () => {
      const nextPath = window.location.pathname;
      const deviceId = nextPath.match(/^\/devices\/([^/]+)\/details$/)?.[1];
      const matchingDevice = devices.find((device) => device.id === deviceId);
      if (matchingDevice) setSelectedDevice(matchingDevice);
      setPath(nextPath);
    };
    syncRoute();
    const onPopState = syncRoute;
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  const navigate = (nextPath) => {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openDevice = (device) => {
    setSelectedDevice(device);
    navigate(`/devices/${device.id}/details`);
  };
  const activePath =
    navItems.find(
      (item) =>
        path === item.path || (item.path !== "/" && path.startsWith(item.path)),
    )?.path || "";
  return (
    <div className="app-shell">
      <Sidebar
        activePath={activePath}
        navigate={navigate}
        mobileNavOpen={mobileNavOpen}
        closeMobile={() => setMobileNavOpen(false)}
      />
      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>
          <div className="breadcrumbs">
            <span>Workspace</span>
            <ChevronRight size={14} />
            <strong>{routeName(path)}</strong>
          </div>
          <div className="topbar-actions">
            <button
              className="icon-button"
              aria-label="Search"
              onClick={() => setModal({ type: "search" })}
            >
              <Search size={19} />
            </button>
            <button
              className="icon-button notification"
              aria-label="Notifications"
              onClick={() => setModal({ type: "notifications" })}
            >
              <Bell size={19} />
              <i />
            </button>
            <div className="topbar-avatar">AM</div>
          </div>
        </header>
        <div className="content-wrap">
          {path === "/" && (
            <Dashboard navigate={navigate} openDevice={openDevice} />
          )}
          {path === "/devices" && <DevicesPage openDevice={openDevice} />}
          {path.includes("/details") && (
            <DeviceDetails
              device={selectedDevice}
              navigate={navigate}
              openModal={(type, record) => setModal({ type, record })}
            />
          )}
          {path === "/centers" && (
            <CentersPage
              selectCenter={(center) => {
                setSelectedCenter(center);
                navigate("/request");
              }}
            />
          )}
          {path === "/request" && (
            <RequestPage
              device={selectedDevice}
              center={selectedCenter}
              submit={(request) => {
                setRepairRequest(request);
                navigate("/tracking");
              }}
            />
          )}
          {path === "/tracking" && (
            <TrackingPage
              device={selectedDevice}
              center={selectedCenter}
              request={repairRequest}
              navigate={navigate}
            />
          )}
          {path === "/repairs" && <RepairsPage navigate={navigate} />}
          {path === "/repairpass" && (
            <RepairPassPage
              openModal={(type, record) => setModal({ type, record })}
              device={selectedDevice}
            />
          )}
        </div>
      </main>
      {modal && (
        <DemoModal
          modal={modal}
          close={() => setModal(null)}
          device={selectedDevice}
        />
      )}
    </div>
  );
}
function Sidebar({ activePath, navigate, mobileNavOpen, closeMobile }) {
  return (
    <aside className={`sidebar ${mobileNavOpen ? "is-open" : ""}`}>
      <div className="brand-lockup">
        <div className="brand-mark">
          <Wrench size={18} strokeWidth={2.6} />
        </div>
        <span>
          fix<span>ora</span>
        </span>
        <button
          className="mobile-close"
          onClick={closeMobile}
          aria-label="Close navigation"
        >
          <X size={19} />
        </button>
      </div>
      <div className="workspace-switcher">
        <div className="workspace-avatar">AM</div>
        <div>
          <strong>Alex Morgan</strong>
          <span>Personal account</span>
        </div>
        <ChevronRight size={15} />
      </div>
      <nav className="primary-nav">
        <p className="nav-label">Workspace</p>
        {navItems.map(({ label, path, icon: Icon, count }) => (
          <button
            className={`nav-item ${activePath === path ? "active" : ""}`}
            key={label}
            onClick={() => navigate(path)}
          >
            <Icon size={18} />
            <span>{label}</span>
            {count && <em>{count}</em>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="support-card">
          <div className="support-icon">
            <CircleHelp size={18} />
          </div>
          <div>
            <strong>Need a hand?</strong>
            <span>Visit our help center</span>
          </div>
          <ArrowUpRight size={15} />
        </div>
        <button
          className="nav-item"
          onClick={() => setModal({ type: "settings" })}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <div className="sidebar-meta">
          <span>Fixora for a better repair</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
function PageHeader({ eyebrow, title, copy, action, onAction }) {
  return (
    <section className="page-header">
      <div>
        <span className="section-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
      {action && (
        <button className="primary-button" onClick={onAction}>
          <Plus size={18} />
          {action}
        </button>
      )}
    </section>
  );
}
function DeviceIcon({ device, size = 22 }) {
  const Icon = device.icon;
  return (
    <div className={`device-icon ${device.color}`}>
      <Icon size={size} />
    </div>
  );
}
function Dashboard({ navigate, openDevice }) {
  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">
            <Sparkles size={14} /> Tuesday, June 11, 2026
          </p>
          <h1>
            Good morning, Alex<span>.</span>
          </h1>
          <p className="welcome-copy">
            Keep your devices running at their best.
          </p>
        </div>
        <button className="primary-button" onClick={() => navigate("/devices")}>
          <Plus size={18} /> Register a device
        </button>
      </section>
      <section className="overview-grid">
        <article className="status-card">
          <div className="card-heading">
            <div>
              <span className="section-kicker">Active repair</span>
              <h2>iPhone 15 Pro</h2>
            </div>
            <div className="status-pill warm">
              <span />
              In progress
            </div>
          </div>
          <button
            className="repair-detail repair-link"
            onClick={() => navigate("/tracking")}
          >
            <div className="device-orb coral">
              <Smartphone size={35} strokeWidth={1.7} />
            </div>
            <div>
              <strong>Screen replacement</strong>
              <span>FixPoint Service Center · Downtown</span>
            </div>
            <ChevronRight className="detail-arrow" size={19} />
          </button>
          <div className="progress-wrap">
            <div className="progress-meta">
              <span>Repair progress</span>
              <strong>65%</strong>
            </div>
            <div className="progress-bar">
              <span />
            </div>
            <div className="progress-note">
              <Clock3 size={14} /> Estimated ready by{" "}
              <strong>Tue, Aug 25</strong>
            </div>
          </div>
          <button className="text-button" onClick={() => navigate("/tracking")}>
            View repair details <ArrowUpRight size={15} />
          </button>
        </article>
        <article className="pass-card">
          <div className="pass-pattern" />
          <div className="pass-top">
            <span className="section-kicker">Your Fixora</span>
            <ShieldCheck size={22} />
          </div>
          <h2>
            Everything in
            <br />
            <em>one place.</em>
          </h2>
          <p>Every repair, every device, every detail. Always accessible.</p>
          <button
            className="light-button"
            onClick={() => navigate("/repairpass")}
          >
            Explore your pass <ArrowUpRight size={15} />
          </button>
          <div className="pass-seal">
            <ShieldCheck size={17} />
            <span>
              VERIFIED
              <br />
              <b>REPAIR</b>
            </span>
          </div>
        </article>
      </section>
      <section className="section-block devices-section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Your collection</span>
            <h2>
              Registered devices <small>3</small>
            </h2>
          </div>
          <button className="text-button" onClick={() => navigate("/devices")}>
            View all devices <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="device-grid">
          {devices.slice(0, 3).map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onClick={() => openDevice(device)}
            />
          ))}
          <button
            className="add-device-card"
            onClick={() => navigate("/devices")}
          >
            <span>
              <Plus size={21} />
            </span>
            <strong>Register new device</strong>
            <small>Add to your collection</small>
          </button>
        </div>
      </section>
      <section className="section-block activity-section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Your timeline</span>
            <h2>Recent activity</h2>
          </div>
          <button className="text-button" onClick={() => navigate("/repairs")}>
            View all activity <ArrowUpRight size={15} />
          </button>
        </div>
        <ActivityRows />
      </section>
      <QuickActions navigate={navigate} />
    </>
  );
}
function DeviceCard({ device, onClick }) {
  return (
    <button className="device-card" onClick={onClick}>
      <DeviceIcon device={device} />
      <MoreHorizontal className="more-button" size={18} />
      <h3>{device.name}</h3>
      <p>{device.detail}</p>
      <div className="device-footer">
        <span className="protected">
          <ShieldCheck size={13} />{" "}
          {device.warrantyState === "Active" ? "Protected" : "History saved"}
        </span>
        <span className="device-arrow">
          <ArrowUpRight size={15} />
        </span>
      </div>
    </button>
  );
}
function ActivityRows() {
  return (
    <div className="activity-table">
      <div className="activity-head">
        <span>Activity</span>
        <span>Date</span>
        <span>Status</span>
        <span />
      </div>
      <div className="activity-row">
        <div className="activity-icon coral">
          <Wrench size={17} />
        </div>
        <div className="activity-info">
          <strong>Repair in progress</strong>
          <span>iPhone 15 Pro · Screen replacement</span>
        </div>
        <time>Today, 09:42 AM</time>
        <span className="activity-status progress">
          <i />
          In progress
        </span>
        <ChevronRight className="row-arrow" size={17} />
      </div>
      {repairHistory.map((item) => (
        <div className="activity-row" key={item.device}>
          <div className={`activity-icon ${item.color}`}>
            <Check size={17} />
          </div>
          <div className="activity-info">
            <strong>Repair completed</strong>
            <span>
              {item.device} · {item.repair}
            </span>
          </div>
          <time>{item.date}</time>
          <span className="activity-status">
            <i />
            Completed
          </span>
          <ChevronRight className="row-arrow" size={17} />
        </div>
      ))}
    </div>
  );
}
function QuickActions({ navigate }) {
  return (
    <section className="quick-actions">
      <div>
        <span className="section-kicker">Make it easy</span>
        <h2>Quick actions</h2>
      </div>
      <div className="quick-grid">
        <button onClick={() => navigate("/devices")}>
          <span className="quick-icon coral">
            <Plus size={19} />
          </span>
          <span>
            <strong>Register a device</strong>
            <small>Add a new device to Fixora</small>
          </span>
          <ArrowUpRight size={16} />
        </button>
        <button onClick={() => navigate("/centers")}>
          <span className="quick-icon mint">
            <MapPin size={19} />
          </span>
          <span>
            <strong>Find a service center</strong>
            <small>Connect with an authorized expert</small>
          </span>
          <ArrowUpRight size={16} />
        </button>
        <button onClick={() => navigate("/repairpass")}>
          <span className="quick-icon yellow">
            <ClipboardCheck size={19} />
          </span>
          <span>
            <strong>View repair history</strong>
            <small>See every service record</small>
          </span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  );
}
function DevicesPage({ openDevice }) {
  return (
    <>
      <PageHeader
        eyebrow="Your collection"
        title="My devices"
        copy="Everything you own, protected and ready for care."
        action="Register a device"
        onAction={() =>
          window.alert(
            "Device registration will be available in the next Fixora release.",
          )
        }
      />
      <div className="devices-summary">
        <div>
          <ShieldCheck size={19} />
          <span>
            <strong>3 devices protected</strong>
            <small>Keep your repair history connected</small>
          </span>
        </div>
        <span className="summary-date">Last synced today</span>
      </div>
      <div className="full-device-grid">
        {devices.map((device) => (
          <button
            className="large-device-card"
            key={device.id}
            onClick={() => openDevice(device)}
          >
            <div className="large-card-top">
              <DeviceIcon device={device} size={27} />
              <span
                className={`mini-status ${device.warrantyState === "Active" ? "" : "expired"}`}
              >
                <i />
                {device.warrantyState === "Active"
                  ? "Warranty active"
                  : "Warranty expired"}
              </span>
            </div>
            <h2>{device.name}</h2>
            <p>
              {device.brand} · {device.type} · {device.detail}
            </p>
            <div className="device-facts">
              <span>
                Registered<strong>{device.registered}</strong>
              </span>
              <span>
                Repair history
                <strong>
                  {device.currentRepair
                    ? "1 active repair"
                    : "1 completed repair"}
                </strong>
              </span>
            </div>
            <span className="card-cta">
              View device details <ArrowUpRight size={16} />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
function DeviceDetails({ device, navigate, openModal }) {
  return (
    <>
      <button className="back-link" onClick={() => navigate("/devices")}>
        <ArrowLeft size={15} /> Back to My Devices
      </button>
      <PageHeader
        eyebrow={`${device.brand} · ${device.type}`}
        title={device.name}
        copy={`${device.detail} · Serial ${device.serial}`}
        action="Request a Repair"
        onAction={() => navigate("/centers")}
      />
      <section className="detail-grid">
        <article className="detail-info-card">
          <div className="detail-device-hero">
            <DeviceIcon device={device} size={42} />
            <div>
              <span className="section-kicker">Device profile</span>
              <h2>{device.name}</h2>
              <p>
                {device.brand} {device.type}
              </p>
            </div>
          </div>
          <div className="info-list">
            <span>
              Purchase location<strong>{device.purchase}</strong>
            </span>
            <span>
              Registered on<strong>{device.registered}</strong>
            </span>
            <span>
              Serial number<strong>{device.serial}</strong>
            </span>
          </div>
        </article>
        <article
          className={`warranty-card ${device.warrantyState === "Expired" ? "is-expired" : ""}`}
        >
          <div className="warranty-icon">
            <ShieldCheck size={23} />
          </div>
          <span className="section-kicker">Warranty status</span>
          <h2>
            {device.warrantyState === "Active"
              ? "Covered and protected"
              : "Warranty expired"}
          </h2>
          <p>
            {device.warrantyState === "Active"
              ? `Coverage active until ${device.warranty}`
              : `Coverage ended on ${device.warranty.replace("Expired ", "")}. Your verified service history is still preserved.`}
          </p>
          <span className="warranty-badge">
            <Check size={13} />{" "}
            {device.warrantyState === "Active"
              ? "Active coverage"
              : "History retained"}
          </span>
        </article>
      </section>
      <section className="identity-card">
        <div className="identity-copy">
          <span className="section-kicker">Your device identity</span>
          <h2>
            Fixora ID <strong>{device.repairPassId}</strong>
          </h2>
          <p>
            This identifier keeps the verified service history connected to this
            device.
          </p>
          <div className="identity-actions">
            <button
              className="secondary-button"
              onClick={() => navigate("/repairpass")}
            >
              <ShieldCheck size={16} /> View Fixora
            </button>
            <button
              className="text-button"
              onClick={() => openModal("transfer")}
            >
              Prepare transfer <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
        <div className="mock-qr" aria-label="Mock QR visual">
          {Array.from({ length: 49 }, (_, index) => (
            <i key={index} className={(index * 17 + 3) % 5 < 2 ? "on" : ""} />
          ))}
        </div>
      </section>
      <section className="history-panel">
        <div className="section-header">
          <div>
            <span className="section-kicker">Verified records</span>
            <h2>Service history</h2>
          </div>
          <span className="record-count">
            {device.currentRepair ? "2 records" : "1 record"}
          </span>
        </div>
        {device.currentRepair && (
          <div className="history-row active-history">
            <div className="activity-icon coral">
              <Wrench size={17} />
            </div>
            <div>
              <strong>Screen replacement</strong>
              <span>FixPoint Service Center · In progress</span>
            </div>
            <span className="activity-status progress">
              <i />
              In progress
            </span>
            <ChevronRight size={17} />
          </div>
        )}
        <div className="history-row">
          <div className="activity-icon mint">
            <Check size={17} />
          </div>
          <div>
            <strong>Battery replacement</strong>
            <span>FixPoint Service Center · May 18, 2026</span>
          </div>
          <span className="activity-status">
            <i />
            Completed
          </span>
          <ChevronRight size={17} />
        </div>
      </section>
    </>
  );
}
function CentersPage({ selectCenter }) {
  return (
    <>
      <PageHeader
        eyebrow="Authorized network"
        title="Find a service center"
        copy="Trusted experts, verified by the brands you love."
      />
      <div className="center-banner">
        <BadgeCheck size={21} />
        <span>
          <strong>Every center is authorized</strong>
          <small>
            Your device stays protected with genuine parts and trained
            technicians.
          </small>
        </span>
        <span className="center-location">
          <MapPin size={15} /> New York, NY
        </span>
      </div>
      <div className="center-list">
        {centers.map((center, index) => (
          <article className="center-card" key={center.id}>
            <div className={`center-logo ${center.color}`}>
              {index === 2 ? "S" : "A"}
            </div>
            <div className="center-main">
              <div className="center-title">
                <div>
                  <h2>{center.name}</h2>
                  <span className="authorized">
                    <BadgeCheck size={14} /> {center.brand}
                  </span>
                </div>
                <div className="rating">
                  <Star size={15} fill="currentColor" /> {center.rating}
                </div>
              </div>
              <p className="center-address">
                <MapPin size={14} /> {center.address} <b>·</b> {center.distance}
              </p>
              <div className="service-tags">
                {center.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
              <div className="center-footer">
                <span>
                  <Clock3 size={14} /> Typical turnaround{" "}
                  <strong>{center.time}</strong>
                </span>
                <button
                  className="primary-button small-button"
                  onClick={() => selectCenter(center)}
                >
                  Select Center <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
function RequestPage({ device, center, submit }) {
  const [form, setForm] = useState({
    problem: "Screen damage",
    description: "Cracked display after an accidental drop.",
    date: "2026-08-25",
  });
  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  return (
    <>
      <button className="back-link" onClick={() => window.history.back()}>
        <ArrowLeft size={15} /> Back to service centers
      </button>
      <PageHeader
        eyebrow="Repair request"
        title="Tell us what happened"
        copy="A few details help the service center prepare for your visit."
      />
      <form
        className="request-layout"
        onSubmit={(event) => {
          event.preventDefault();
          submit({
            ...form,
            id: `RP-2026-${Math.floor(1000 + Math.random() * 8999)}`,
            date: "August 25, 2026",
            stage: 0,
          });
        }}
      >
        <div className="request-form">
          <label>
            Device
            <div className="select-display">
              <DeviceIcon device={device} size={18} />
              <span>
                <strong>{device.name}</strong>
                <small>{device.detail}</small>
              </span>
              <Check size={16} />
            </div>
          </label>
          <label>
            Problem category
            <select
              value={form.problem}
              onChange={(event) => update("problem", event.target.value)}
            >
              <option>Screen damage</option>
              <option>Battery</option>
              <option>Charging issue</option>
              <option>Software problem</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            What can we help with?
            <textarea
              rows="5"
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
            />
          </label>
          <label>
            Preferred date
            <input
              type="date"
              value={form.date}
              onChange={(event) => update("date", event.target.value)}
            />
          </label>
          <button className="primary-button submit-button" type="submit">
            Submit Repair Request <ArrowUpRight size={16} />
          </button>
        </div>
        <aside className="request-summary">
          <span className="section-kicker">Your appointment</span>
          <h2>Ready when you are.</h2>
          <div className="summary-item">
            <DeviceIcon device={device} size={18} />
            <span>
              <small>Device</small>
              <strong>{device.name}</strong>
            </span>
          </div>
          <div className="summary-item">
            <Store size={19} />
            <span>
              <small>Authorized center</small>
              <strong>{center.name}</strong>
            </span>
          </div>
          <div className="summary-item">
            <CalendarDays size={19} />
            <span>
              <small>Preferred date</small>
              <strong>August 25, 2026</strong>
            </span>
          </div>
          <div className="request-note">
            <ShieldCheck size={16} /> Your service record will be updated
            automatically.
          </div>
        </aside>
      </form>
    </>
  );
}
function TrackingPage({ device, center, request, navigate }) {
  const stages = [
    { title: "Request submitted", detail: "August 22 · 9:42 AM" },
    { title: "Device received", detail: "August 22 · 11:18 AM" },
    { title: "Diagnosis", detail: "August 22 · 2:05 PM" },
    { title: "Repair in progress", detail: "Today · 9:42 AM" },
    { title: "Quality check", detail: "Up next" },
    { title: "Ready for pickup", detail: "Estimated August 25" },
  ];
  return (
    <>
      <button className="back-link" onClick={() => navigate("/")}>
        <ArrowLeft size={15} /> Back to Dashboard
      </button>
      <PageHeader
        eyebrow="Live repair status"
        title="Repair tracking"
        copy="Stay in the loop from check-in to pickup."
      />
      <section className="tracking-overview">
        <div>
          <span className="section-kicker">Repair ID</span>
          <h2>{request.id}</h2>
        </div>
        <div className="tracking-chip">
          <span /> Repair in progress
        </div>
        <div>
          <span className="section-kicker">Estimated completion</span>
          <strong>Tuesday, August 25, 2026</strong>
        </div>
      </section>
      <section className="tracking-grid">
        <article className="timeline-card">
          <div className="section-header">
            <div>
              <span className="section-kicker">Live timeline</span>
              <h2>Your repair journey</h2>
            </div>
            <span className="progress-number">65%</span>
          </div>
          <div className="timeline">
            {stages.map((stage, index) => (
              <div
                className={`timeline-step ${index < request.stage ? "complete" : ""} ${index === request.stage ? "current" : ""}`}
                key={stage.title}
              >
                <div className="timeline-dot">
                  {index < request.stage ? <Check size={13} /> : index + 1}
                </div>
                <div>
                  <strong>{stage.title}</strong>
                  <span>{stage.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
        <aside className="tracking-side">
          <div className="tracking-detail">
            <span className="section-kicker">Repair details</span>
            <h2>{device.name}</h2>
            <p>{request.problem}</p>
            <div className="tracking-line">
              <Store size={16} />
              <span>
                {center.name}
                <small>{center.address}</small>
              </span>
            </div>
            <div className="tracking-line">
              <FileText size={16} />
              <span>
                Service request<small>{request.description}</small>
              </span>
            </div>
          </div>
          <button
            className="secondary-button"
            onClick={() => navigate("/repairpass")}
          >
            <ShieldCheck size={16} /> View Fixora record
          </button>
        </aside>
      </section>
    </>
  );
}
function RepairsPage({ navigate }) {
  return (
    <>
      <PageHeader
        eyebrow="Your timeline"
        title="Repairs"
        copy="A complete view of every service request and result."
      />
      <div className="repair-summary-grid">
        <div>
          <span className="stat-number">2</span>
          <span>Open repairs</span>
        </div>
        <div>
          <span className="stat-number">4</span>
          <span>Verified records</span>
        </div>
        <div>
          <span className="stat-number">3</span>
          <span>Authorized centers</span>
        </div>
      </div>
      <section className="history-panel repairs-panel">
        <div className="section-header">
          <div>
            <span className="section-kicker">All activity</span>
            <h2>Repair activity</h2>
          </div>
        </div>
        <ActivityRows />
        <button
          className="secondary-button"
          onClick={() => navigate("/centers")}
        >
          <Plus size={16} /> Start a new repair request
        </button>
      </section>
    </>
  );
}
function RepairPassPage({ openModal, device }) {
  return (
    <>
      <PageHeader
        eyebrow="Your permanent record"
        title="Fixora"
        copy="Your device's permanent service history."
      />
      <section className="pass-hero">
        <div>
          <div className="pass-hero-mark">
            <ShieldCheck size={22} />
          </div>
          <span className="section-kicker">Verified Service History</span>
          <h2>
            Care that stays
            <br />
            <em>with your device.</em>
          </h2>
          <p>
            Fixora keeps every authorized service record connected to the
            devices you own, so their story is always clear.
          </p>
        </div>
        <div className="pass-hero-stamp">
          <BadgeCheck size={26} />
          <strong>VERIFIED</strong>
          <span>SERVICE HISTORY</span>
        </div>
      </section>
      <div className="pass-stats">
        <div>
          <strong>3</strong>
          <span>Registered devices</span>
        </div>
        <div>
          <strong>2</strong>
          <span>Verified repairs</span>
        </div>
        <div>
          <strong>2</strong>
          <span>Authorized centers</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>Digital records</span>
        </div>
      </div>
      <section className="records-section">
        <div className="section-header">
          <div>
            <span className="section-kicker">Your records</span>
            <h2>Completed service history</h2>
          </div>
          <span className="record-count">Verified by Fixora</span>
        </div>
        <div className="record-grid">
          {repairHistory.map((record) => (
            <article className="record-card" key={record.device}>
              <div className="record-top">
                <DeviceIcon device={record} size={22} />
                <span className="verified-label">
                  <BadgeCheck size={14} /> Verified
                </span>
              </div>
              <h2>{record.repair}</h2>
              <p>
                {record.device} · {record.date}
              </p>
              <div className="record-details">
                <span>
                  <Store size={14} /> {record.center}
                </span>
                <span>
                  <Wrench size={14} /> {record.parts}
                </span>
                <span>
                  <ShieldCheck size={14} /> {record.warranty}
                </span>
              </div>
              <div className="record-footer">
                <button
                  className="record-view"
                  onClick={() => openModal("certificate", record)}
                >
                  View verified repair <ArrowUpRight size={15} />
                </button>
                <span>Authorized service record</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="value-principles">
        <div>
          <strong>VERIFIED</strong>
          <span>Authorized service records</span>
        </div>
        <div>
          <strong>PERMANENT</strong>
          <span>History stays connected to the device</span>
        </div>
        <div>
          <strong>TRANSFERABLE</strong>
          <span>Share proof when the device changes hands</span>
        </div>
      </section>
      <section className="transfer-panel">
        <div>
          <span className="section-kicker">Ready to transfer?</span>
          <h2>Give the next owner confidence.</h2>
          <p>
            Share a verified record of authorized repairs and service when your
            device changes hands.
          </p>
        </div>
        <div>
          <button
            className="secondary-button"
            onClick={() => openModal("share")}
          >
            <Share2 size={16} /> Share service history
          </button>
          <button
            className="secondary-button"
            onClick={() => openModal("transfer", device)}
          >
            <ArrowUpRight size={16} /> Prepare transfer
          </button>
        </div>
      </section>
    </>
  );
}
function DemoModal({ modal, close, device }) {
  const record = modal.record || repairHistory[0];
  const titles = {
    certificate: "Verified repair certificate",
    share: "Share verified history",
    transfer: "Prepare transfer",
  };
  if (modal === "certificate" || modal.type === "certificate") {
    return (
      <div className="modal-backdrop" onClick={close}>
        <div
          className="modal certificate-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <button className="modal-close" onClick={close} aria-label="Close">
            <X size={19} />
          </button>
          <div className="certificate-head">
            <div className="modal-icon">
              <BadgeCheck size={23} />
            </div>
            <span className="verified-label">
              <BadgeCheck size={14} /> Verified
            </span>
          </div>
          <span className="section-kicker">{titles.certificate}</span>
          <h2>{record.device}</h2>
          <p className="certificate-intro">
            Verified by authorized service center
          </p>
          <div className="certificate-grid">
            <span>
              Repair ID<strong>{record.repairId || "RP-2026-1048"}</strong>
            </span>
            <span>
              Service center<strong>{record.center}</strong>
            </span>
            <span>
              Authorization
              <strong>
                {record.authorization || "Apple Authorized Service Provider"}
              </strong>
            </span>
            <span>
              Service date<strong>{record.date}</strong>
            </span>
            <span>
              Issue<strong>{record.issue || "Screen damage"}</strong>
            </span>
            <span>
              Service performed<strong>{record.repair}</strong>
            </span>
            <span>
              Parts<strong>{record.parts}</strong>
            </span>
            <span>
              Status<strong>Verified</strong>
            </span>
          </div>
          <button
            className="primary-button modal-action"
            onClick={() => openDownloadAcknowledgement(close)}
          >
            <Download size={16} /> Download certificate
          </button>
        </div>
      </div>
    );
  }
  if (["search", "notifications", "settings"].includes(modal.type)) {
    const messages = {
      search: "Search is ready for the next Fixora release.",
      notifications:
        "You are all caught up. New repair updates will appear here.",
      settings: "Settings will be available in the next Fixora release.",
    };
    return (
      <div className="modal-backdrop" onClick={close}>
        <div className="modal" onClick={(event) => event.stopPropagation()}>
          <button className="modal-close" onClick={close} aria-label="Close">
            <X size={19} />
          </button>
          <div className="modal-icon">
            <ShieldCheck size={23} />
          </div>
          <h2>{messages[modal.type]}</h2>
          <button className="primary-button modal-action" onClick={close}>
            Got it
          </button>
        </div>
      </div>
    );
  }
  const isShare = modal === "share" || modal.type === "share";
  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close">
          <X size={19} />
        </button>
        <div className="modal-icon">
          {isShare ? <Share2 size={23} /> : <ArrowUpRight size={23} />}
        </div>
        <span className="section-kicker">
          {isShare ? titles.share : titles.transfer}
        </span>
        <h2>
          {isShare
            ? "A trusted record, ready to share."
            : "Ready for a confident handoff?"}
        </h2>
        {isShare ? (
          <>
            <p>
              Share a read-only view of this device's verified service history.
            </p>
            <div className="share-link">
              fixora.app/p/{device.repairPassId}
              <button aria-label="Copy share link" onClick={close}>
                <ClipboardCheck size={16} />
              </button>
            </div>
            <button className="primary-button modal-action" onClick={close}>
              <Share2 size={16} /> Copy share link
            </button>
          </>
        ) : (
          <>
            <p>
              Give the next owner confidence with a verified record that stays
              with the device.
            </p>
            <div className="transfer-facts">
              <span>
                Device<strong>{device.name}</strong>
              </span>
              <span>
                Fixora ID<strong>{device.repairPassId}</strong>
              </span>
              <span>
                Verified repairs
                <strong>
                  {device.currentRepair
                    ? "1 active · 1 completed"
                    : "1 completed"}
                </strong>
              </span>
              <span>
                Warranty / service
                <strong>
                  {device.warrantyState === "Active"
                    ? device.warranty
                    : "History retained"}
                </strong>
              </span>
            </div>
            <div className="transfer-status">
              <Check size={15} /> Ready to prepare transfer
            </div>
            <button className="primary-button modal-action" onClick={close}>
              Prepare transfer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
function openDownloadAcknowledgement(close) {
  window.setTimeout(close, 0);
}
export default App;
