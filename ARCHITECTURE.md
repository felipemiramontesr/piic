# PIIC Portal Architecture

This document describes the high-level architecture and data flow of the PIIC (Portal Industrial, Tecnológico y Comercial) application.

## 🏗️ High-Level Component Structure

The application follows a modern React architecture with a focus on component modularity and responsiveness.

```mermaid
graph TD
    App[App.tsx]
    Router[React Router]
    Navbar[Header Section]
    Home[Home Sections]
    OilForm[OilSkimmersForm Page]
    PWA[Service Worker / PWA]
    i18n[i18next / Localization]

    App --> i18n
    App --> Router
    Router --> Navbar
    Router --> Home
    Router --> OilForm
    App --> PWA

    Home --> Hero
    Home --> Services
    Home --> Features
    Home --> Contact
    Home --> Footer
```

## 🔄 Contact Form Data Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as React UI Component
    participant Val as Validation Logic
    participant API as PHP Backend (MailHandler)
    participant SMTP as SMTP Server

    User->>UI: Fills Form & Clicks Submit
    UI->>Val: Trigger Validation
    Val-->>UI: Validated
    UI->>API: POST /contact_mail.php (FormData)
    API->>API: Sanitize & Validate
    API->>SMTP: Send Email
    SMTP-->>API: Success
    API-->>UI: JSON Response {status: 'success'}
    UI->>User: Show Success Notification
```

## 📋 Technology Stack

- **Frontend**: React 18 (Vite)
- **Styling**: Vanilla CSS (Tailwind and Custom Tokens)
- **Testing**: Vitest + Testing Library (~100% Coverage)
- **Infrastructure**: Progressive Web App (PWA) + Google Workload
- **Backend**: Lightweight PHP Mailer with Rate Limiting
- **QA**: Storybook for Component Documentation

## 🛡️ Security Measures

1. **Rate Limiting**: Backend protection against spam.
2. **Form Sanitization**: Input cleaning to prevent injection.
3. **PWA Offline Support**: Service worker for resilient operation.
4. **CSRF Protection**: Domain-locked API handlers.
