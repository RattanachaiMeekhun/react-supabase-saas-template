# Auth Routes with PostgreSQL Setup

## Setup Instructions

### 1. Set up environment variables

Add the following to your `.env` file:

```env
# Database Configuration
DB_HOST=localhost
DB_NAME=your_database_name
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_database_password

# JWT Configuration
JWT_SECRET=your-secret-key-here-change-this-in-production
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
```

### 2. Create database tables

Run the schema SQL file to create the required tables:

```bash
psql -U your_database_user -d your_database_name -f db/schema.sql
```

Or connect to your PostgreSQL database and run the SQL commands from `db/schema.sql`.

### 3. API Endpoints

#### POST /signup

Create a new user account.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

#### POST /login

Login with email and password.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "access_token": "jwt_token",
  "refresh_token": "jwt_refresh_token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

#### POST /logout

Logout and invalidate refresh token.

**Request:**

```json
{
  "refresh_token": "jwt_refresh_token"
}
```

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

#### GET /check

Verify authentication token.

**Headers:**

```
Authorization: Bearer jwt_token
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

#### POST /refresh

Get a new access token using refresh token.

**Request:**

```json
{
  "refresh_token": "jwt_refresh_token"
}
```

**Response:**

```json
{
  "access_token": "new_jwt_token"
}
```

## Security Features

- Passwords are hashed using bcrypt with salt rounds of 10
- JWT tokens for authentication
- Refresh tokens stored in database for session management
- Token expiration handled automatically
- Invalid credentials protection
