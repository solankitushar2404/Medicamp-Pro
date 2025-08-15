# 🏥 Medical Camp Management System

<div align="center">

![Medical Camp Banner](https://img.shields.io/badge/Medical%20Camp-Management%20System-blue?style=for-the-badge&logo=medical-cross&logoColor=white)

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**A comprehensive full-stack web application for managing medical camps with role-based access control**

[📖 Documentation](#features) • [🎨 View Prototype](docs/MEDICAL%20CAMP%20MANAGEMENT%20SYSTEM.pdf) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📚 API Documentation](#-api-documentation)
- [🎯 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## 🎨 Project Prototype

<div align="center">

📄 **[View Project Prototype PDF](docs/MEDICAL%20CAMP%20MANAGEMENT%20SYSTEM.pdf)**

Get a visual overview of the Medical Camp Management System's user interface, features, and workflow before diving into the code.

</div>

---

## ✨ Features

### 👤 User Features
- 🔐 **JWT Authentication** - Secure login/register with role-based access
- 🏥 **Camp Discovery** - Browse and filter upcoming medical camps
- 📝 **Easy Registration** - Register for camps with automatic seat management
- 👤 **Profile Management** - Update profile info and upload profile pictures
- 🔒 **Password Management** - Secure password change functionality

### 👨‍⚕️ Admin Features
- ⚙️ **Complete CRUD Operations** - Full management of medical camps
- 📊 **Category & Specialty Management** - Organize camps by categories and specialties
- 📋 **Registration Management** - View and manage camp registrations
- 📄 **PDF Export** - Export registration lists to PDF
- 🖼️ **Image Management** - Upload camp banners and profile images
- 📈 **Dashboard Analytics** - Overview of system statistics

---

## 🛠️ Tech Stack

### Backend
<div align="left">

![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=flat-square&logo=c-sharp&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
![Entity Framework](https://img.shields.io/badge/Entity%20Framework-512BD4?style=flat-square&logo=microsoft&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white)

</div>

- **ASP.NET Core Web API** (.NET 8) with JWT authentication
- **PostgreSQL** with Entity Framework Core
- **AutoMapper** for object mapping
- **FluentValidation** for input validation
- **DinkToPdf** for PDF generation
- **BCrypt** for password hashing

### Frontend
<div align="left">

![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=flat-square&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-009688?style=flat-square&logo=angular&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)

</div>

- **Angular 17** with TypeScript
- **Angular Material UI** components
- **Reactive Forms** with validation
- **HTTP Interceptors** for auth and error handling
- **Responsive Design** with mobile support

---

## 🚀 Quick Start

### 📋 Prerequisites

Make sure you have the following installed:

- ![.NET](https://img.shields.io/badge/.NET-8.0%20SDK-512BD4?style=flat-square&logo=dotnet&logoColor=white) [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white) [Download](https://nodejs.org/)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=flat-square&logo=postgresql&logoColor=white) [Download](https://www.postgresql.org/download/)
- ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) [Download](https://git-scm.com/)

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medical-camp-management.git
   cd medical-camp-management
   ```

2. **Setup Database**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE medicalcamp;
   \q
   ```

3. **Configure Backend**
   ```bash
   cd backend
   
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your database credentials
   # ConnectionStrings__Default=Host=localhost;Port=5432;Database=medicalcamp;Username=postgres;Password=YOUR_PASSWORD
   ```

4. **Run Backend**
   ```bash
   # Restore packages
   dotnet restore
   
   # Apply database migrations
   dotnet ef database update --project src/API
   
   # Start the API
   dotnet run --project src/API
   ```
   
   🌐 Backend will be available at: **http://localhost:5000**
   
   📚 Swagger UI: **http://localhost:5000/swagger**

5. **Setup Frontend**
   ```bash
   cd ../frontend
   
   # Install dependencies
   npm install
   
   # Start development server
   ng serve
   ```
   
   🌐 Frontend will be available at: **http://localhost:4200**

---

## 📁 Project Structure

```
medical-camp-management/
├── 📁 backend/                 # .NET 8 Web API
│   ├── 📁 src/
│   │   ├── 📁 API/            # Web API Controllers & Configuration
│   │   ├── 📁 Application/    # Business Logic & DTOs
│   │   ├── 📁 Domain/         # Domain Entities & Interfaces
│   │   └── 📁 Infrastructure/ # Data Access & Services
│   ├── 📄 .env.example        # Environment template
│   └── 📄 MedicalCamp.sln     # Solution file
├── 📁 frontend/               # Angular 17 Application
│   ├── 📁 src/
│   │   ├── 📁 app/           # Angular Components & Services
│   │   ├── 📁 assets/        # Static Assets
│   │   └── 📁 environments/  # Environment Configurations
│   ├── 📄 package.json       # Dependencies
│   └── 📄 angular.json       # Angular Configuration
├── 📄 README.md              # Project Documentation
└── 📄 .gitignore            # Git Ignore Rules
```

---

## 🔧 Configuration

### Backend Configuration

Update `backend/.env` with your settings:

```env
# Database
ConnectionStrings__Default=Host=localhost;Port=5432;Database=medicalcamp;Username=postgres;Password=YOUR_PASSWORD

# JWT
JWT__Issuer=MedicalCamp.Api
JWT__Audience=MedicalCamp.Client
JWT__Key=YOUR_JWT_SECRET_KEY_MINIMUM_32_CHARACTERS_LONG

# CORS
CORS__Origins=http://localhost:4200
```

### Frontend Configuration

Update `frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000/api'
};
```

---

## 📚 API Documentation

### 🔐 Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### 🏥 Medical Camps
- `GET /api/camps` - Get camps (with filtering and pagination)
- `GET /api/camps/{id}` - Get specific camp
- `POST /api/camps` - Create camp (Admin only)
- `PUT /api/camps/{id}` - Update camp (Admin only)
- `DELETE /api/camps/{id}` - Delete camp (Admin only)

### 📝 Camp Registration
- `POST /api/registrations` - Register for camp
- `GET /api/registrations/camp/{campId}` - Get registrations (Admin only)
- `GET /api/registrations/camp/{campId}/export-pdf` - Export PDF (Admin only)

For complete API documentation, visit `/swagger` when running the backend.

---

## 🎯 Usage

### 👤 Default Test Accounts

After running the backend for the first time, use these pre-seeded accounts:

#### Admin Account
```
📧 Email: admin@medicamp.local
🔒 Password: Admin@123
```

#### Regular User Account
```
📧 Email: user@medicamp.local
🔒 Password: User@123
```

### 🖥️ Screenshots

<div align="center">

| Login Page | Dashboard | Camp Management |
|------------|-----------|-----------------|
| ![Login](https://via.placeholder.com/300x200?text=Login+Page) | ![Dashboard](https://via.placeholder.com/300x200?text=Dashboard) | ![Management](https://via.placeholder.com/300x200?text=Camp+Management) |

</div>

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. 🍴 Fork the Project
2. 🌿 Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. ✅ Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the Branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

### 🐛 Bug Reports

If you find a bug, please create an issue with:
- 📝 Clear description of the bug
- 🔄 Steps to reproduce
- 💻 Expected vs actual behavior
- 🖼️ Screenshots (if applicable)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Tusharkumar Solanki**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tusharkumarsolanki)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/solankitushar2404)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:solankitusharramjibhai@gmail.com)

*Final-year Computer Engineering student passionate about full-stack development*

</div>

---

<div align="center">

### 🌟 If you found this project helpful, please give it a star!

[![GitHub stars](https://img.shields.io/github/stars/yourusername/medical-camp-management?style=social)](https://github.com/yourusername/medical-camp-management/stargazers)

**Built with ❤️ for better healthcare management**

</div>