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
