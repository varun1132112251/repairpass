# Fixora

**Verified device care, from repair request to resale.**

[Live Demo](https://fixora-six-omega.vercel.app/)

## The Problem

Device repairs are fragmented across service centers, receipts, warranty portals, and messages. Owners struggle to understand repair status, preserve proof of genuine service, and communicate a device's maintenance history when it changes hands.

## Fixora's Solution

Fixora is a unified device-care experience that connects a device with its repair journey and verified service history. It gives owners one place to see what needs attention, find an authorized service center, follow an active repair, and present a clear record of completed service.

## Key Features

- **Device dashboard:** View registered devices, protection status, active repairs, and recent activity.
- **Device profiles:** Review device details, warranty status, serial information, and service history.
- **Authorized service centers:** Browse centers with authorization, ratings, location, services, and turnaround estimates.
- **Repair requests:** Select a device and service center, describe the issue, and choose a preferred date.
- **Live repair tracking:** Follow a repair through request submission, device receipt, diagnosis, repair, quality check, and pickup.
- **Verified service history:** Review repair records and open a certificate-style view of service details.
- **Transfer-ready records:** Preview sharing and transfer workflows for a device's verified history.

## How the Prototype Works

The prototype uses a pre-populated account and sample devices so the core journey can be explored immediately:

1. Start on the dashboard and select a device or active repair.
2. Browse service centers and select one for a repair request.
3. Submit the request to move to the tracking view.
4. Explore the repair timeline, device details, and Fixora service-history record.
5. Open certificate, sharing, or transfer interactions from the relevant views.

All data is local to the browser session. The prototype demonstrates the product experience; it does not currently connect to real service centers, authentication, payments, notifications, or a backend database.

## Technology Stack

- React
- Vite
- JavaScript (ES modules)
- React DOM
- Lucide React for interface icons
- CSS with responsive layouts for desktop and mobile

## Run Locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Demo

Explore the deployed prototype at **https://fixora-six-omega.vercel.app/**.
