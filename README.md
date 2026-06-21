# 🚀 Go Business Referral Dashboard

A modern and responsive Referral Management Platform built using **React.js**, designed to help businesses monitor referral performance, track earnings, manage partner activity, and share referral information efficiently.

## 📌 Overview

The Go Business Referral Dashboard provides a secure and intuitive experience for users to:

* Authenticate using secure JWT-based login
* View referral performance metrics
* Track earnings and referral activity
* Share referral links and referral codes
* Search and sort referrals dynamically
* Navigate detailed referral records
* Access a fully responsive dashboard experience

---

## ✨ Features

### 🔐 Authentication System

* JWT-based login authentication
* Protected routes using React Router
* Cookie-based session management
* Automatic redirection for unauthorized users
* Secure logout functionality

### 📊 Dashboard Analytics

* Overview metrics display
* Referral earnings insights
* Service summary statistics
* Active referral monitoring

### 🔗 Referral Sharing

* Referral link display
* Referral code display
* One-click copy functionality
* Easy sharing workflow

### 📋 Referral Management

* Dynamic API-driven referrals table
* Real-time search functionality
* Date-based sorting
* Client-side pagination
* Referral detail navigation

### 📱 Responsive Design

* Mobile-first approach
* Tablet optimized layouts
* Desktop dashboard experience
* Accessible UI components

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* JavaScript (ES6+)
* HTML5
* CSS3

### Libraries

* Axios
* js-cookie

### APIs

* Authentication API
* Referrals API

---

## 📂 Project Structure

```text
src
│
├── components
│   ├── Navbar
│   ├── Footer
│   ├── ProtectedRoute
│   ├── OverviewCards
│   ├── ServiceSummary
│   ├── ReferralShare
│   ├── ReferralTable
│   └── Pagination
│
├── pages
│   ├── Login
│   ├── Dashboard
│   ├── ReferralDetails
│   └── NotFound
│
├── services
│   └── api.js
│
├── utils
│   └── formatters.js
│
├── App.jsx
└── main.jsx
```

---

## 🔑 Authentication Flow

1. User enters credentials.
2. Login request is sent to authentication API.
3. JWT token is returned on successful login.
4. Token is stored in browser cookies.
5. Protected routes validate authentication status.
6. Logout clears authentication token.

---

## 📈 Dashboard Modules

### Overview Section

Displays business performance metrics received from the API.

### Service Summary

Shows:

* Service Name
* Your Referrals
* Active Referrals
* Total Referral Earnings

### Referral Sharing

Provides:

* Referral Link
* Referral Code
* Copy-to-Clipboard functionality

### Referral Table

Includes:

* Name
* Service
* Date
* Profit

Capabilities:

* Search
* Sort
* Pagination
* Detail Navigation

---

## 🔍 Search & Sorting

### Search

Users can search referrals using:

* Partner Name
* Service Name

### Sort

Referrals can be sorted by:

* Newest First
* Oldest First

---

## 📄 Referral Details

Each referral contains:

* Referral ID
* Partner Name
* Service Name
* Referral Date
* Profit Generated

---

## 🚦 Routing

| Route         | Access    |
| ------------- | --------- |
| /login        | Public    |
| /             | Protected |
| /referral/:id | Protected |
| *             | Public    |

---

## ♿ Accessibility

Implemented accessibility best practices:

* Semantic HTML
* Accessible Forms
* Proper Labels
* Keyboard Navigation
* Screen Reader Friendly Components
* ARIA Attributes

---

## ⚡ Performance Optimizations

* Efficient API Calls
* Client-side Pagination
* Reusable Components
* Optimized Rendering
* Clean State Management

---

## 🎯 Key Highlights

* Secure Authentication
* Responsive Dashboard
* Real-Time Search
* Dynamic Sorting
* Referral Analytics
* Modern UI Design
* Reusable Architecture
* Production-Ready Codebase

---

## 📸 Application Preview

### Login Page

Secure user authentication interface.

### Dashboard

Referral metrics, service insights, and referral management.

### Referral Details

Detailed information about individual referrals.

---

## 👨‍💻 Developed By

**Sai Srikar Bommisetty**

B.Tech CSE | Full Stack Developer | React Developer

Passionate about building scalable web applications, modern dashboards, and impactful digital experiences.

---

## 📜 License

This project was developed as part of a Frontend Coding Assessment and is intended for educational and evaluation purposes.
