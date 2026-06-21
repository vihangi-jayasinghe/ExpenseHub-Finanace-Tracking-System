# ExpenseHub - Finance Tracking System

A secure, high-fidelity web application built for Sri Lanka Telecom (Services) Limited take-home assessment. This project lets users record, manage, and analyze daily expenses and incomes through a clean, modern dashboard UI.

---

## 🚀 Features

### 1. User Management
* **Secure Registration**: Register with Name, Email, Address, and Password.
* **JWT-Based Authentication**: Custom Spring Security authentication with stateless JSON Web Tokens.
* **User Profile**: View and edit user details (Name, Address) with read-only Email constraints.

### 2. Expense Management
* **Debit Tracking**: Add expenses with Title, Category, Amount, Transaction Date, and Description.
* **Predefined Categories**: Matches requirements (`Food`, `Transport`, `Bills`, `Shopping`, `Entertainment`, `Other`).
* **CRUD Operations**: Dynamically create, read, update, and delete expense items.

### 3. Income Management
* **Credit Tracking**: Add incomes with Source, Amount, Received Date, and Description.
* **CRUD Operations**: Dynamically create, read, update, and delete income records.

### 4. Financial Dashboard
* **Real-time Metrics**: Displays all-time Total Income, Total Expenses, and Net Balance.
* **Transaction History**: Displays the latest 5 transactions (Income/Expenses merged and sorted).
* **Monthly Allocation**: View total Monthly Expenses and Monthly Income for a selected month/year.
* **Highest Expense Category**: Automatically identifies and displays the highest expense category for the selected month.

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
    - GET `/api/dashboard/recent?limit=5` — latest and transactions (merged incomes & expenses, sorted by date).
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


