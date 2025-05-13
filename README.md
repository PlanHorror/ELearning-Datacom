# 🚀 Elearning system

A full-stack web application built with **Next.js** for the frontend and **NestJS** for the backend.

---

## 📂 Project Structure

Below is the structure of the project repository, including both the backend (NestJS) and frontend (Next.js) applications, along with submodules and their purposes.

root/  
└── backend/ $~~~~~~~$# NestJS application  
$~~~~~~~$└── admin/ $~~~~~~~~~~~~~~$# Admin panel modules  
$~~~~~~~~~~~~~~$├── account-admin/ $~~~~~~~~~~~~~~~~~~~~~$# Manage admin accounts  
$~~~~~~~~~~~~~~$├── auth-admin/ $~~~~~~~~~~~~~~~~~~~~~$# Admin authentication logic  
$~~~~~~~~~~~~~~$├── company-admin/ $~~~~~~~~~~~~~~~~~~~~~$# Company management (admin side)  
$~~~~~~~~~~~~~~~~~~~~~$└── company-deleted-admin/ $~~~~~~~~~~~~~~~~~~~~~~~~$# View and restore deleted companies  
$~~~~~~~~~~~~~~$├── coupon-admin/ $~~~~~~~~~~~~~~~~~~~~~$# Coupon management by admins  
$~~~~~~~~~~~~~~~~~~~~~$├── coupon-favourite-admin/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Admin favorites  
$~~~~~~~~~~~~~~~~~~~~~$├── coupon-label-admin/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Labeling and tagging coupons  
$~~~~~~~~~~~~~~~~~~~~~$└── coupon-usage-admin/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Usage tracking from admin view  
$~~~~~~~~~~~~~~$├── customer-admin/ $~~~~~~~~~~~~~~~~~~~~~$# Customer management for admins  
$~~~~~~~~~~~~~~~~~~~~~$└── customer-deleted-admin/ $~~~~~~~~~~~~~~~~~~~~~~~~$# View and restore deleted customers  
$~~~~~~~~~~~~~~$├── learning-status-admin/ $~~~~~~~~~~~~~~~~~~~~~$# Monitor learning progress of customers  
$~~~~~~~~~~~~~~$└── points-history-admin/ $~~~~~~~~~~~~~~~~~~~~~$# Admin view of point transactions  
$~~~~~~~$├── auth/ $~~~~~~~~~~~~~~~~~~~~~$# General user authentication module  
$~~~~~~~$├── common/ $~~~~~~~~~~~~~~~~~~~~~$# Shared modules and utilities  
$~~~~~~~~~~~~~~$├── decorators/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Custom NestJS decorators  
$~~~~~~~~~~~~~~$├── dtos/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Data Transfer Objects  
$~~~~~~~~~~~~~~$├── enums/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Enum definitions  
$~~~~~~~~~~~~~~$├── guards/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Authentication and role guards  
$~~~~~~~~~~~~~~$├── interceptors/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Transform requests/responses  
$~~~~~~~~~~~~~~$├── interfaces/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Shared TypeScript interfaces  
$~~~~~~~~~~~~~~$├── utils/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Helper functions  
$~~~~~~~~~~~~~~$└── validators/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Custom validation logic  
$~~~~~~~$├── company/ $~~~~~~~~~~~~~~~~~~~~~$# Company-related user functionality  
$~~~~~~~$├── coupon/ $~~~~~~~~~~~~~~~~~~~~~$# Coupon system for users  
$~~~~~~~~~~~~~~~~~~~~~$├── coupon-favourite/ $~~~~~~~~~~~~~~~~~~~~~~~~$# User favorite coupons  
$~~~~~~~~~~~~~~~~~~~~~$├── coupon-label/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Labels assigned by users  
$~~~~~~~~~~~~~~~~~~~~~$└── coupon-usage/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Track usage by users  
$~~~~~~~$├── customer/ $~~~~~~~~~~~~~~~~~~~~~$# Customer registration and features  
$~~~~~~~$├── email/ $~~~~~~~~~~~~~~~~~~~~~$# Email service integration  
$~~~~~~~$├── points-history/ $~~~~~~~~~~~~~~~~~~~~~$# Track user points and transactions  
$~~~~~~~$└── upload/ $~~~~~~~~~~~~~~~~~~~~~$# Upload endpoints and file handling  
$~~~~~~~~~~~~~~$├── coupons/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Uploaded coupon images  
$~~~~~~~~~~~~~~$└── learning-status/ $~~~~~~~~~~~~~~~~~~~~~~~~$# Learning progress uploads  

├── Frontend/ $~~~~~~~$# Next.js frontend application  
$~~~~~~~$└── app/ $~~~~~~~~~~~~~~$# Page Router  
$~~~~~~~$└── i18n/ $~~~~~~~~~~~~~~$# config next-intl
$~~~~~~~$└── modules/ $~~~~~~~~~~~~~~$# call API and handle logic for each page
$~~~~~~~$└── public/ $~~~~~~~~~~~~~~$# Share image
$~~~~~~~$└── shared/ $~~~~~~~~~~~~~~$# like common folder, include components, styles, hook, ...
$~~~~~~~$└── types/ $~~~~~~~~~~~~~~$# global interface
$~~~~~~~$└── utils/ $~~~~~~~~~~~~~~$# common function
$~~~~~~~$└── auth.middleware.ts/ $~~~~~~~~~~~~~~$# middleware of authjs
$~~~~~~~$└── auth.ts/ $~~~~~~~~~~~~~~$# config authjs
$~~~~~~~$└── middleware.ts/ $~~~~~~~~~~~~~~$# middleware of next-intl 

└── README.md $~~~~~~~$# Project documentation (you are here)

## ⚙️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL
- **API**: REST API
- **Authentication**: [JWT](https://jwt.io/) (Json web token)
- **Styling**: [Tailwind](https://tailwindcss.com/) + [SCSS](https://sass-lang.com/) + [Antd](https://ant.design/)
- **Deployment**: [AWS EC2](https://aws.amazon.com/ec2/) + [PM2](https://pm2.keymetrics.io/)

---

## 🚧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

### 2. Setup Backend

```bash
cd backend
npm install
npm run start:dev
```

> Make sure to create and configure a `.env` file in the `backend/` directory.

---

### 3. Setup Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

> Also create a `.env.local` file inside the `Frontend/` directory to configure environment variables.

## 🔐 Environment Variables

Proper configuration of environment variables is essential for secure and flexible deployment. Below are the environment variable setups for both the backend and frontend.

---

### 📦 Backend `.env`

Create a `.env` file inside the `backend/`

```env
# JWT configuration
JWT_SECRET=SECRET_KEY_OF_ACCESSTOKEN              # Secret key used to sign access tokens
JWT_REFRESH_SECRET=SECRET_KEY_OF_REFRESHTOKEN     # Secret key used to sign refresh tokens
JWT_VERIFY_SECRET=SECRET_KEY_OF_VERIFYTOKEN       # Secret key used for email verification tokens

# Database configuration
DATABASE_URI=                                      # Full database URI (overrides individual DB config if provided)
DATABASE_HOST=localhost                            # Database server hostname or IP
DATABASE_PORT=5432                                  # Database server port
DATABASE_USERNAME=your_db_username                 # Database username
DATABASE_PASSWORD=your_db_password                 # Database password
DATABASE_NAME=elearning                            # Name of the PostgreSQL database

# Email service configuration
EMAIL_HOST=smtp.yourprovider.com                   # SMTP server for sending emails
EMAIL_PORT=587                                     # SMTP server port (usually 587 for TLS)
EMAIL_USER=your_email@example.com                  # SMTP authentication username
EMAIL_PASSWORD=your_email_password                 # SMTP authentication password
EMAIL_VERIFICATION_LINK=http://localhost:3000/verify-email # Link used for email verification in frontend

# File upload directories
COUPON_IMAGE_URL=src/uploads/coupons/              # Path to store uploaded coupon images
JSON_LEARNING_STATUS_URL=src/uploads/learning-status/ # Path to store learning status in JSON format

```

> ⚠️ Important: Never commit your .env file to version control. Make sure .env is included in your .gitignore.

---

## 🌐 Frontend Environment Variables

Create a `.env.local` file in the `Frontend/` directory and define the following:

```env
# Secret of authentication
AUTH_SECRET = SECRENT_TOKEN
NEXT_PUBLIC_BACKEND_URL = BACKEND_URL
```

---

## 📌 Features

- For detailed system design and feature specifications, refer to the full document:  
  📄 [System Design & Feature Document](https://docs.google.com/document/d/1eIePOPaPBqDBtts3ygzrWp_XLLQacHsUoQXqklGgga0/edit?tab=t.0#heading=h.aulgn919vxeh)
- API Document and schemas [here](http://3.106.244.62:3001/api#/)

---

## 🚀 Deployment on AWS EC2

This guide walks you through deploying **both frontend and backend** to an EC2 instance.

### Prerequisites

- An AWS EC2 instance running Ubuntu
- SSH access to the instance - [SSH](https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys)
- Node.js (v22 or higher) and Yarn installed - [Node](https://nodejs.org/en/about/previous-releases), [Yarn](https://yarnpkg.com/)
- PM2 installed globally - [PM2](https://pm2.keymetrics.io/)

---

## 🚀 Deployment on AWS EC2

#### 1. Connect to your EC2 instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

#### 2. Install system dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential curl
```

#### 3. Install Node.js via NVM

- Follow tutorial in [here](https://github.com/nvm-sh/nvm)
- Make sure `node -v` returns version 22 or higher.

#### 4. Install global packages

```bash
npm install -g pm2 yarn
```

#### 5. Clone your project

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

#### 6. Setup Backend (NestJS)

```bash
cd backend
yarn install
pm2 start main.sh
```

#### 7. Setup Frontend (Next.js)

```bash
cd ../Frontend
npm install
pm2 start main.sh
```

#### ✅ Access the Application

- **Frontend**: http://your-ec2-ip:3000
- **Backend API**: http://your-ec2-ip:3001

> ⚠️ Make sure to allow inbound traffic to ports 3000 and 3001 in your EC2 instance security group.
