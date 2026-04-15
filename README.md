# 🛍️ Next.js Product Listing App

A responsive product listing application built with **Next.js** and **Tailwind CSS**, demonstrating API integration, dynamic routing, filtering, and production-ready data handling.

---

## 🚀 Features

- 📦 Product listing (image, title, price, category)
- 🔍 Category filtering (API-driven)
- 💰 Price range filtering
- 📄 Dynamic product pages (`/product/[id]`)
- ⚡ Responsive UI with Tailwind CSS
- 🧠 SEO optimization (meta tags + JSON-LD)
- 🛡️ Hybrid data layer (API + seed fallback)
- ⚡ ISR caching for performance and freshness

---

## 📦 API Sources

- Products: https://fakestoreapi.com/products  
- Categories: https://fakestoreapi.com/products/categories  

---

## 🧠 Data Strategy (Hybrid Approach)

This project uses a **hybrid data system** combining:

### 🟢 Seed Data (Local JSON)

The project includes local seed files:

- `products.json`
- `categories.json`

These act as a **reliable fallback dataset**.

### 🟡 External API (FakeStore)

Live data is fetched from the FakeStore API with ISR caching enabled.

---

## ⚠️ Why Seeding Was Used

During production deployment, the FakeStore API was found to:

> 🚫 Block requests from the deployed server environment (IP-based blocking / rate limiting)

This caused:

- API request failures in production
- Broken product pages
- Inconsistent rendering
- Unreliable user experience

---

## 🛡️ Solution

A hybrid fallback system was implemented:

- Use API data when available
- Fall back to seeded local JSON when API fails
- Enable ISR caching (`revalidate: 60`) for partial freshness
- Ensure application always works regardless of API status

---

## 🏗️ Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Zod (schema validation)
- FakeStore API

---

## 📁 Project Structure

```txt
src/
├── app/
│   ├── page.tsx
│   ├── product/[id]/page.tsx
│
├── components/
│   ├── ProductClient.tsx
│   ├── ProductCard.tsx
│   ├── SiteHeader.tsx
│
├── lib/
│   ├── products.ts   # API + seed hybrid layer
│
├── data/
│   ├── products.json
│   ├── categories.json

