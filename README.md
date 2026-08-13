<img width="1024" height="1024" alt="expensehub" src="https://github.com/user-attachments/assets/0bc536ce-57e8-430f-928f-2893e8dfa90f" />


# ExpenseHub - Finance Tracking System

A secure, high-fidelity web application built for Sri Lanka Telecom (Services) Limited take-home assessment. This project lets users record, manage, and analyze daily expenses and incomes through a clean, modern dashboard UI.

![ExpenseHub Dashboard Mockup](./mockup.png)

---

## 🚀 Features

### 1. User Management & Profile Settings
* **Secure Registration**: Register with Name, Email, Address, and Password.
* **JWT-Based Authentication**: Custom Spring Security authentication with stateless JSON Web Tokens.
* **User Profile**: View and edit user details (Name, Address) with read-only Email constraints.
* **Immediate Context Sync**: Profile changes are synchronized instantly globally via `useAuth` contexts without requiring manual session refreshes.
* **Cascade Delete Protection**: Safe account purging. Deleting a user automatically and cleanly cascadingly removes all associated income and expense records.

### 2. Expense Management
* **Debit Tracking**: Add expenses with Title, Category, Amount, Transaction Date, and Description.
* **Predefined Categories**: Matches requirements (`Food`, `Transport`, `Bills`, `Shopping`, `Entertainment`, `Other`).
* **CRUD Operations**: Dynamically create, read, update, and delete expense items.

### 3. Income Management
* **Credit Tracking**: Add incomes with Source, Amount, Received Date, and Description.
* **CRUD Operations**: Dynamically create, read, update, and delete income records.

### 4. Interactive Visual Analytics
* **Cash Flow Trend**: 6-month side-by-side comparative Bar Chart showing Income vs Expenses using **Recharts**.
* **Category Spending Allocation**: Categorical doughnut/pie charts showing the percentage breakdown of expenses for the selected month.
* **Real-time Overview Metrics**: Displays all-time Total Income, Total Expenses, and Net Balance with reactive state calculations.
* **Monthly Allocation & Insights**: View total Monthly Expenses and Monthly Income for a selected month/year, alongside automatic identification of the Highest Expense Category.

### 5. Advanced Security & Global State Guarding
* **Centralized State**: Global auth state is managed via a dedicated `AuthContext` provider.
* **Global API Interceptor**: Catch `401 Unauthorized` token expiry states on any frontend call, executing auto-logout and redirecting the user to `/login?expired=true`.
* **Client-Side Route Guarding**: Protected layout wrapper prevents unauthenticated access to the dashboard and ledgers.

### 6. Structured PDF Statement Downloads
* **Professional Layout**: Replaced legacy CSV downloads with high-fidelity, customized financial PDF statements using **jsPDF** and **jsPDF-AutoTable**.
* **Corporate Formatting**: Generates clean tables with right-aligned currencies, total records counts, custom branding, timestamps, and page numbers.


---

## 🛠️ Technology Stack

### Database
* **PostgreSQL**: Robust, relational SQL database management system.

### Backend API
* **Java 17 & Spring Boot**: Core API framework.
* **Spring Data JPA**: Database abstraction and queries.
* **Spring Security & JWT**: Roles and security filter chain with JWT authentication.
* **Maven**: Dependency management.

### Frontend UI
* **React 19 & Vite**: Fast development server and build pipeline.
* **Tailwind CSS v4**: Utility-first CSS styling for premium UI.
* **Lucide Icons**: Crisp, vector dashboard icons.
* **React Router v7**: Single Page Application (SPA) client-side routing.
* **Recharts**: Advanced data visualization charting library.
* **jsPDF & jsPDF-AutoTable**: High-fidelity client-side PDF document generation.

---

## Getting Started

Minimal steps to run the project locally. The application expects a PostgreSQL database by default — you can override via `application.properties` or environment variables.

1. Database (Postgres) — create a database named `expensehub` (or adjust `backend/src/main/resources/application.properties`):

    - JDBC URL: `jdbc:postgresql://localhost:5432/expensehub`
    - Username: `postgres`
    - Password: `password`

2. Run backend (from project root):

```bash
cd backend
# Windows
./mvnw.cmd spring-boot:run
# macOS / Linux
./mvnw spring-boot:run
```

3. Run frontend (from project root):

```bash
cd frontend
npm install
npm run dev
```

Default dev ports: backend `8080`, frontend `5173` (vite may pick another free port).

---

## 🧪 Development & Testing

Run backend tests:

```bash
cd backend
./mvnw test
```

Run frontend locally:

```bash
cd frontend
npm run dev
```

---

## API Reference (Key Endpoints)

All API endpoints are prefixed with `/api` and expect JSON. Authenticated endpoints require a `Bearer <JWT>` Authorization header.

- Authentication
    - POST `/api/auth/login` — body: `{ "email": "user@example.com", "password": "..." }`
        - Response: `{ "token": "<jwt>" }`

- Users
    - POST `/api/users` — register: `{ name, email, address, password }` → returns `UserResponse`.
    - GET `/api/users/profile` — (authenticated) returns the current user's details.
    - PUT `/api/users/{id}` — update user (name, address).
    - DELETE `/api/users/{id}` — delete user.

- Expenses
    - GET `/api/expenses` — list expenses for authenticated user.
    - POST `/api/expenses` — create expense.
    - PUT `/api/expenses/{id}` — update expense.
    - DELETE `/api/expenses/{id}` — delete expense.

- Incomes
    - GET `/api/income` — list incomes for authenticated user.
    - POST `/api/income` — create income.
    - PUT `/api/income/{id}` — update income.
    - DELETE `/api/income/{id}` — delete income.

- Dashboard (server-side analytics)
    - GET `/api/dashboard/summary` — returns all-time `totalIncome`, `totalExpenses`, `balance`.
        - Example response:
            ```json
            { "totalIncome": 1000.00, "totalExpenses": 750.00, "balance": 250.00 }
            ```
    - GET `/api/dashboard/recent?limit=5` — latest N transactions (merged incomes & expenses, sorted by date).
        - Example response:
            ```json
            [
                { "id":"exp-1","title":"Lunch","amount":12.5,"date":"2026-06-21","type":"expense","category":"Food","description":"" }
            ]
            ```
    - GET `/api/dashboard/monthly?month=YYYY-MM` — monthly totals and highest expense category for the specified month.
         - Example response:
            ```json
            { "totalIncome": 500.0, "totalExpenses": 300.0, "highestExpenseCategory": "Food", "highestExpenseAmount": 120.0 }
            ```


