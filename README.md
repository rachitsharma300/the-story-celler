# System Architecture & Complete End-to-End Flow Diagram
## The Story Celler

This document provides a comprehensive technical overview of **The Story Celler** architecture, illustrating how the Next.js 16 Frontend, Spring Boot 4 Backend, MySQL Database, and Cloud Services interact.

---

## 1. High-Level System Architecture

```mermaid
graph TB
    subgraph Client_Browser["💻 User Browser / Client"]
        FE_UI["React 19 / Next.js 16 (UI Components)"]
        Zustand["Zustand Stores (cartStore, userStore)"]
        Axios["Axios Client (lib/axios.ts)"]
        RZP_SDK["Razorpay JS SDK (v1/checkout.js)"]
    end

    subgraph Frontend_Hosting["🌐 Frontend Layer (Vercel)"]
        Next_Server["Next.js Server / Edge CDN"]
    end

    subgraph Backend_Infrastructure["⚡ Backend Container (Oracle Cloud / VPS Docker)"]
        Nginx["Nginx Reverse Proxy (SSL / Port 443 -> 8080)"]
        
        subgraph Spring_Boot_App["☕ Spring Boot 4 Application (Port 8080)"]
            CorsFilter["CORS Filter"]
            JwtFilter["JwtAuthenticationFilter (Security)"]
            SecurityConfig["Spring Security (SecurityConfig.java)"]
            
            subgraph REST_Controllers["🎮 Controllers Layer (/api/*)"]
                AuthCtrl["AuthController"]
                OrderCtrl["OrderController"]
                PaymentCtrl["PaymentController"]
                UploadCtrl["UploadController"]
                UserCtrl["UserController"]
                CartCtrl["CartController"]
                NotifCtrl["NotificationController"]
                AdminCtrl["AdminController"]
            end
            
            subgraph Service_Layer["💼 Business Logic Layer"]
                AuthSvc["AuthService"]
                UserSvc["UserService"]
                OrderSvc["OrderService"]
                ProductSvc["ProductService"]
                EmailSvc["EmailService"]
            end
            
            subgraph Data_Access["🗄️ Data Access Layer (Spring Data JPA)"]
                UserRepo["UserRepository"]
                OrderRepo["OrderRepository"]
                PaymentRepo["PaymentRepository"]
                NotifRepo["NotificationRepository"]
            end
        end

        subgraph Database_Layer["📦 Storage Layer"]
            MySQL[("MySQL 8 Database\n(storyceller_db)")]
        end
    end

    subgraph Cloud_Integrations["☁️ External Third-Party Cloud APIs"]
        Cloudinary["Cloudinary API\n(Photo & PDF Storage)"]
        Razorpay["Razorpay Gateway\n(Payment Creation & Verification)"]
        GmailSMTP["Gmail SMTP Server\n(OTP & Order Notification Emails)"]
    end

    %% Client Relationships
    FE_UI --> Zustand
    FE_UI --> Axios
    FE_UI --> RZP_SDK
    Axios -- "HTTP Requests + Bearer JWT Token" --> Nginx

    %% Reverse Proxy & Security Pass-through
    Nginx --> CorsFilter
    CorsFilter --> JwtFilter
    JwtFilter --> SecurityConfig
    SecurityConfig --> REST_Controllers

    %% Controller to Service calls
    AuthCtrl --> AuthSvc
    UserCtrl --> UserSvc
    OrderCtrl --> OrderSvc
    PaymentCtrl --> OrderSvc
    UploadCtrl --> Cloudinary

    %% Service to Repository & Cloud Services
    AuthSvc --> UserRepo
    AuthSvc --> EmailSvc
    OrderSvc --> OrderRepo
    OrderSvc --> NotifRepo
    OrderSvc --> EmailSvc
    PaymentCtrl --> Razorpay
    EmailSvc --> GmailSMTP

    %% Repositories to MySQL
    UserRepo --> MySQL
    OrderRepo --> MySQL
    PaymentRepo --> MySQL
    NotifRepo --> MySQL
```

---

## 2. Complete End-to-End User Order & Payment Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 Customer
    participant FE as 🎨 Next.js Frontend
    participant Axios as 🚀 Axios Interceptor
    participant Spring as 🛡️ Spring Boot Security Filter
    participant Ctrl as 🎮 Payment & Order Controllers
    participant Svc as 💼 Order & Email Services
    participant DB as 🗄️ MySQL Database
    participant Cloud as ☁️ Cloudinary / Razorpay / Gmail

    %% Step 1: Upload Photos
    User->>FE: 1. Selects photos in Configurator
    FE->>Axios: 2. Upload photo (FormData)
    Axios->>Spring: 3. POST /api/upload
    Spring->>Ctrl: 4. Route to UploadController
    Ctrl->>Cloud: 5. Store image in Cloudinary
    Cloud-->>Ctrl: 6. Returns secure HTTPS image URL
    Ctrl-->>FE: 7. Returns image URL array

    %% Step 2: Checkout & Payment Initiation
    User->>FE: 8. Fills delivery form & clicks "Pay Advance"
    FE->>Axios: 9. Initiate Order Payment
    Axios->>Spring: 10. POST /api/payment/create-order (Amount)
    Spring->>Ctrl: 11. PaymentController.createRazorpayOrder()
    Ctrl->>Cloud: 12. Create Order on Razorpay API
    Cloud-->>Ctrl: 13. Returns Razorpay Order ID (order_xyz)
    Ctrl-->>FE: 14. Sends Razorpay Order ID & Key ID

    %% Step 3: Payment Execution
    FE->>User: 15. Opens Razorpay Popup Modal
    User->>Cloud: 16. Completes payment (UPI / Card)
    Cloud-->>FE: 17. Returns payment_id & signature

    %% Step 4: Verification & Database Persistence
    FE->>Axios: 18. Submit Order + Payment Details
    Axios->>Spring: 19. POST /api/orders (Order Details)
    Spring->>Ctrl: 20. OrderController.createOrder()
    Ctrl->>Svc: 21. OrderService.createOrder()
    Svc->>DB: 22. Save Order Record (Status: PENDING)
    DB-->>Svc: 23. Returns saved Order (OrderId: MV-2026-0001)

    FE->>Axios: 24. Record Payment Verification
    Axios->>Spring: 25. POST /api/payment (Transaction Details)
    Spring->>Ctrl: 26. PaymentController.logPayment()
    Ctrl->>DB: 27. Save Payment Entity
    Ctrl->>Svc: 28. Trigger Confirmation Email & Notification
    Svc->>DB: 29. Save User In-App Notification
    Svc->>Cloud: 30. Send Confirmation Email via Gmail SMTP
    
    Ctrl-->>FE: 31. Order & Payment Success Response
    FE-->>User: 32. Show Order Confirmation Screen 🎉
```

---

## 3. Spring Boot Backend Package Structure & Component Breakdown

The backend is structured into clean architectural layers following domain-driven best practices:

```
com.thestoryceller.backend
├── 📄 AdminInitializer.java          # Initializes default admin account (admin@storyceller.in) on startup
├── 📄 StorycellerBackendApplication.java # Spring Boot Main Class
│
├── 📂 config/                        # Configuration Beans
│   └── 📄 ApplicationConfig.java     # PasswordEncoder, AuthenticationManager, Beans
│
├── 📂 security/                      # Authentication & JWT Security Layer
│   ├── 📄 SecurityConfig.java        # CORS, Stateless Session, Endpoint Security Rules
│   ├── 📄 JwtAuthenticationFilter.java # Intercepts requests, validates Bearer JWT token
│   ├── 📄 JwtTokenProvider.java      # Generates & verifies JWT signatures
│   └── 📄 CustomUserDetailsService.java # Loads user details by email for Spring Security
│
├── 📂 controller/                    # REST API Endpoints (/api/*)
│   ├── 📄 AuthController.java        # /api/auth/register, /login, /google, /send-otp
│   ├── 📄 OrderController.java       # /api/orders (Create, Get, Track, Status Update)
│   ├── 📄 PaymentController.java     # /api/payment (Create Razorpay Order, Verify Signature)
│   ├── 📄 UploadController.java      # /api/upload (Cloudinary photo & PDF uploader)
│   ├── 📄 UserController.java        # /api/users (Profile view, Password update)
│   ├── 📄 ProductController.java     # /api/products (Product catalog API)
│   ├── 📄 CartController.java        # /api/cart (Cart sync API)
│   ├── 📄 NotificationController.java # /api/notifications (User in-app notifications)
│   ├── 📄 DeliveryController.java     # /api/delivery (Logistics & tracking)
│   ├── 📄 SampleController.java       # /api/samples (Interactive flipbook samples)
│   ├── 📄 WishlistController.java     # /api/wishlist (User wishlist)
│   ├── 📄 ContactController.java      # /api/contact (Contact form submissions)
│   └── 📄 AdminController.java        # /api/admin (Admin dashboard statistics & controls)
│
├── 📂 service/                       # Business Logic Layer
│   ├── 📄 OrderService.java          # Order creation, order ID generation, status updates
│   ├── 📄 EmailService.java          # Gmail SMTP integration (OTP, Order emails, Status updates)
│   ├── 📄 UserService.java           # User profile & registration logic
│   ├── 📄 ProductService.java        # Catalog management
│   ├── 📄 NotificationService.java   # Notification dispatcher
│   └── 📂 impl/                      # Service implementations
│
├── 📂 entity/                        # JPA Database Entities (MySQL Tables)
│   ├── 📄 User.java                  # User credentials, roles, profile info
│   ├── 📄 Order.java                 # Orders, customer details, custom selections, PDF links
│   ├── 📄 Payment.java               # Payment transactions, payment methods, Razorpay IDs
│   ├── 📄 Product.java               # Product catalog items & pricing
│   ├── 📄 Notification.java          # In-app notifications for users
│   ├── 📄 Delivery.java              # Logistics tracking numbers & shipping status
│   ├── 📄 Sample.java                # Flipbook sample catalog items
│   ├── 📄 Cart.java                  # Shopping cart items
│   ├── 📄 Wishlist.java              # Wishlist items
│   └── 📂 enums/                     # Type Definitions
│       ├── 📄 OrderStatus.java       # PENDING, DESIGNING, REVIEW, PRINTING, SHIPPED, DELIVERED
│       └── 📄 Role.java              # ROLE_USER, ROLE_ADMIN
│
└── 📂 repository/                    # Spring Data JPA Repositories
    ├── 📄 UserRepository.java        # findByEmail(), existsByEmail()
    ├── 📄 OrderRepository.java       # findByOrderId(), findByUser()
    ├── 📄 PaymentRepository.java     # findByOrder()
    ├── 📄 NotificationRepository.java# findByUserOrderByCreatedAtDesc()
    └── 📄 DeliveryRepository.java    # findByOrder()
```

---

## 4. Frontend Architecture & File Communication Diagram

```mermaid
graph LR
    subgraph Frontend_App["🎨 Next.js 16 App Directory"]
        Page["app/page.tsx (Landing Page)"]
        CheckoutPage["app/checkout/page.tsx"]
        DashboardPage["app/dashboard/page.tsx"]
    end

    subgraph Home_Sections["🧩 Modular Section Components"]
        Hero["HeroSection.tsx"]
        QuickCreate["QuickCreateSection.tsx"]
        Featured["FeaturedCollectionSection.tsx"]
        Samples["SamplesSection.tsx"]
        Reels["ReelsSection.tsx (Inline Shorts)"]
        ModalConfig["ProductConfiguratorModal.tsx"]
    end

    subgraph Stores_and_State["💾 Zustand Client State"]
        CartStore["cartStore.ts"]
        UserStore["userStore.ts"]
    end

    subgraph Utilities["🔧 Lib Helpers"]
        AxiosHelper["lib/axios.ts (Axios Base Instance)"]
        RazorpayHelper["lib/razorpay.ts (Razorpay SDK Loader)"]
    end

    %% Wiring
    Page --> Hero
    Page --> QuickCreate
    Page --> Featured
    Page --> Samples
    Page --> Reels
    Page --> ModalConfig

    ModalConfig --> CartStore
    CheckoutPage --> RazorpayHelper
    CheckoutPage --> AxiosHelper
    ModalConfig --> AxiosHelper
    UserStore --> AxiosHelper
```

---

## 5. Security & Authentication Flow Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Admin
    participant FE as Frontend (lib/axios.ts)
    participant JwtFilter as JwtAuthenticationFilter
    participant Provider as JwtTokenProvider
    participant Ctrl as Secured Controller

    User->>FE: 1. Enters credentials / Google Login
    FE->>Ctrl: 2. POST /api/auth/login
    Ctrl->>Provider: 3. Verify password & generate JWT Token
    Provider-->>FE: 4. Returns JWT Token string
    FE->>FE: 5. Store JWT in localStorage

    Note over FE, Ctrl: Subsequent Protected Requests

    FE->>JwtFilter: 6. Request with Header: Authorization: Bearer <Token>
    JwtFilter->>Provider: 7. Validate JWT signature & expiration
    Provider-->>JwtFilter: 8. Valid (Extract email & role)
    JwtFilter->>JwtFilter: 9. Set SecurityContextHolder Authentication
    JwtFilter->>Ctrl: 10. Pass request to target endpoint
    Ctrl-->>FE: 11. Returns authorized response data
```

---

## 6. Infrastructure & Host Topology (Production vs Development)

| Tier | Component | Environment / Hosting Provider | Technology Used |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js 16 Client & Server Components | **Vercel / Cloudflare Pages** | Node.js 20, React 19, TailwindCSS v4, Zustand |
| **Backend Service** | REST API Service | **Oracle Cloud Infrastructure (OCI) Always Free VM** | Java 21, Spring Boot 4, Docker Container |
| **Database** | Relational Database | **Docker Container on Oracle VM** | MySQL 8.0, InnoDB Engine |
| **Storage / CDN** | Photo & PDF Storage | **Cloudinary Cloud API** | Automatic WebP/AVIF transformations |
| **Payments** | Payment Gateway | **Razorpay Gateway** | Razorpay Java SDK + JS Checkout SDK |
| **Email Service** | OTP & Order Emails | **Gmail SMTP / Spring Mail** | Port 587 (TLS), App Passwords |
