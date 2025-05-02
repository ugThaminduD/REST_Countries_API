[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)


# 📌One World Many Nations

## 🚀 Features
- 🌍 Explore information about countries around the globe, including their flags, names, and more.
- 🔍 Search for countries by name.
- 🌎 Filter countries by region and language.
- ❤️ Add and manage favorite countries.
- 🗺️ View detailed information about each country, including population, area, time zones, and more.
- 🔒 User session management.
- 🛡️ User authentication with login and signup functionality.
- 🧑‍💻 User profile management.
- 📜 Responsive design using Material-UI (MUI).

---

## 🛠 Tech Stack
- **Frontend:** React
- **UI Components:** Material-UI (MUI)
- **API:** REST Countries API (`https://restcountries.com/v3.1`)
- **Proxy:** `"proxy": "https://restcountries.com"`

- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Development Tools:** nodemon

---

## 💻 Installation

```bash
# Clone the repository
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-ugThaminduD.git
```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following content:
   ```env
   PORT=5011
   MONGO_DB_URL=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

---

## 🌐 REST Countries API Endpoints Used
The application uses the following endpoints from the REST Countries API:

- **Fetch all countries:**  
  `GET /all`  
  Example: `https://restcountries.com/v3.1/all`

- **Fetch country by name:**  
  `GET /name/{name}`  
  Example: `https://restcountries.com/v3.1/name/{name}`

- **Fetch countries by region:**  
  `GET /region/{region}`  
  Example: `https://restcountries.com/v3.1/region/{region}`

- **Fetch countries by language:**  
  `GET /lang/{language}`  
  Example: `https://restcountries.com/v3.1/lang/{language}`

- **Fetch country flags:**  
  `GET /all?fields=flags,name,region,subregion`  
  Example: `https://restcountries.com/v3.1/all?fields=flags,name,region,subregion`

---

## Challenges Faced

### a. Test Case Failures
- **Issue:** Several test cases failed during integration, primarily due to mismatched API responses and incorrect mock data.
- **Resolution:** Updated the test mocks to align with the actual API responses and enhanced error handling in the frontend code.

### b. Session Management
- **Issue:** Maintaining user sessions across page reloads and API calls was inconsistent.
- **Resolution:** Implemented token-based authentication using `localStorage` and configured interceptors to attach tokens to outgoing HTTP requests.

### c. API Import Issues
- **Issue:** Importing API modules occasionally resulted in errors due to incorrect file paths or circular dependencies.
- **Resolution:** Refactored API utility files, enforced consistent export/import patterns, and adopted absolute imports to reduce dependency issues.

---

## Conclusion

Despite initial setbacks involving test failures, session inconsistencies, and API import errors, these challenges were systematically addressed. The frontend now communicates reliably with the backend APIs, ensuring a smooth and consistent user experience.

---
