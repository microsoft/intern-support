# API Reference (Dev)

Base URL: `http://localhost:3000`

---

## Health Check

### `GET /`

Returns server status.

**Response** `200`

```json
{ "status": "ok", "message": "Shadow Me Interns API" }
```

---

## Authentication

All auth endpoints are **public** (no token required).

### `POST /api/auth/request-code`

Send a 6-digit verification code to a whitelisted email address.

**Body**

```json
{ "email": "t-aryanshah@microsoft.com" }
```

**Responses**

| Status | Body                                                               |
| ------ | ------------------------------------------------------------------ |
| `200`  | `{ "message": "Verification code sent" }`                          |
| `400`  | `{ "message": "Email is required" }`                               |
| `403`  | `{ "message": "Email is not authorized to access this platform" }` |
| `500`  | `{ "message": "Failed to send verification code" }`                |

---

### `POST /api/auth/verify-code`

Exchange a verification code for a signed JWT (7-day expiry).

**Body**

```json
{ "email": "t-aryanshah@microsoft.com", "code": "123456" }
```

**Responses**

| Status | Body                                                    |
| ------ | ------------------------------------------------------- |
| `200`  | `{ "token": "eyJhbG..." }`                              |
| `400`  | `{ "message": "Email and code are required" }`          |
| `401`  | `{ "message": "Invalid or expired verification code" }` |
| `500`  | `{ "message": "Failed to verify code" }`                |

---

### `POST /api/auth/validate-token`

Check whether a stored JWT is still valid. Useful on page load to decide whether to show the login flow.

**Body**

```json
{ "token": "eyJhbG..." }
```

**Responses**

| Status | Body                                                        |
| ------ | ----------------------------------------------------------- |
| `200`  | `{ "valid": true, "email": "t-aryanshah@microsoft.com" }`   |
| `400`  | `{ "valid": false, "message": "Token is required" }`        |
| `401`  | `{ "valid": false, "message": "Invalid or expired token" }` |

---

## Protected Routes

All routes below require the header:

```
Authorization: Bearer <jwt>
```

Responses when unauthorized:

| Status | Body                                                         |
| ------ | ------------------------------------------------------------ |
| `401`  | `{ "message": "Missing or malformed authorization header" }` |
| `401`  | `{ "message": "Invalid or expired token" }`                  |

---

### `GET /api/items`

Retrieve meeting items.

**Response** `200`

```json
{ "message": "Items route working" }
```
