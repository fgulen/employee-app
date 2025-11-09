# 403 Forbidden Fix - Technical Details

## Problem Analysis

Swagger UI at `/swagger-ui/index.html` was returning **403 Forbidden** error. This indicates:

- The resource exists (not 404)
- Security/Authorization is blocking access
- JWT authentication filter was intercepting Swagger requests

## Root Cause

The `JwtAuthenticationFilter` was checking ALL requests for valid JWT tokens, including Swagger UI requests. Since Swagger requests don't have valid JWT tokens, they were being rejected with 403.

## Solution Implemented

### 1. Security Configuration Update (AppSecurityConfig.java)

**What Changed:**

- Added explicit `requestMatchers()` patterns for ALL Swagger-related paths
- Marked them as `.permitAll()` to skip authentication

**The Patterns Added:**

```java
.requestMatchers(
    "/swagger-ui/**",      // Swagger UI resources
    "/swagger-ui.html",    // Swagger UI main page
    "/v3/api-docs/**",     // OpenAPI documentation
    "/v3/api-docs",        // OpenAPI root
    "/swagger-resources/**", // Swagger resource configs
    "/swagger-resources",  // Swagger resources root
    "/webjars/**",         // Required static resources
    "/favicon.ico"         // Browser favicon request
).permitAll()
```

**Why This Works:**
Spring Security checks patterns in order. By placing Swagger routes BEFORE the `authenticated()` catch-all, they bypass JWT authentication.

### 2. CORS Configuration (CorsConfig.java)

**What Changed:**

- Created new `@Configuration` class implementing `WebMvcConfigurer`
- Configured CORS to allow requests from localhost:5173 (frontend)

**Why This Needed:**
Even with permits, browsers enforce CORS (Cross-Origin Resource Sharing). Without proper CORS headers, the browser blocks requests with 403 (or CORS error).

**Configuration:**

```java
registry.addMapping("/**")
    .allowedOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:8081")
    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
    .allowedHeaders("*")
    .allowCredentials(true)
    .maxAge(3600);
```

### 3. OpenAPI Documentation (OpenApiConfig.java)

**Status:** Already correctly configured from previous session

- Generates Swagger UI metadata
- Configures JWT Bearer token security scheme
- No changes needed

### 4. Application Configuration (application.yml)

**Status:** Already correctly configured

- Swagger UI path: `/swagger-ui.html` ✓
- API docs path: `/v3/api-docs` ✓
- Both enabled: true ✓

## Security Architecture (After Fix)

```
Incoming Request
    ↓
    ├─ Is it a Swagger route? → YES → permitAll() → Access Granted ✓
    ├─ Is it /api/auth/*? → YES → permitAll() → Access Granted ✓
    ├─ Is it GET /api/users? → YES → permitAll() → Access Granted ✓
    └─ Anything else? → NO → Requires JWT → Check JwtAuthenticationFilter
         ↓
         ├─ Valid JWT? → YES → Access Granted ✓
         └─ No JWT? → NO → Reject 401 Unauthorized
```

## How Users Access Swagger

### Without Authentication

1. User visits: `http://localhost:8081/swagger-ui/index.html`
2. Swagger UI loads (static HTML/JS)
3. User can see all API endpoint documentation
4. User can try endpoints that allow `.permitAll()`
5. Endpoints like `POST /api/auth/login` work without token ✓

### With Authentication

1. User clicks **Authorize** button in Swagger UI
2. User enters JWT token obtained from login
3. Subsequent requests include `Authorization: Bearer <token>` header
4. Protected endpoints like `GET /api/employees` now work ✓
5. JwtAuthenticationFilter validates the token

## Files Modified

| File                     | Changes                            | Impact                               |
| ------------------------ | ---------------------------------- | ------------------------------------ |
| `AppSecurityConfig.java` | Added Swagger permitAll() patterns | Skips JWT auth for Swagger routes    |
| `CorsConfig.java`        | NEW - Added CORS configuration     | Allows browser cross-origin requests |
| `OpenApiConfig.java`     | No changes                         | Already correct                      |
| `application.yml`        | No changes                         | Already correct                      |

## Verification

### Before Fix

```
GET /swagger-ui/index.html → 403 Forbidden
Reason: JwtAuthenticationFilter blocking due to missing JWT
```

### After Fix

```
GET /swagger-ui/index.html → 200 OK
Reason: AppSecurityConfig allows without authentication
GET http://localhost:8081/swagger-ui.html → Loads Swagger UI ✓
```

## Troubleshooting

| Symptom                 | Cause                       | Fix                                     |
| ----------------------- | --------------------------- | --------------------------------------- |
| Still 403               | Cache issue                 | Clear browser cache (Ctrl+Shift+Delete) |
| Still 403               | Backend not rebuilt         | Run `mvn clean install`                 |
| CORS Error in console   | Frontend origin not allowed | Check CorsConfig allowed origins        |
| 404 on /swagger-ui.html | Wrong path in yml           | Verify `springdoc.swagger-ui.path`      |
| Endpoints not showing   | OpenAPI not scanning        | Check `@RestController` annotations     |

## Key Concepts

### permitAll() vs authenticated()

- `permitAll()` - No authentication required, request allowed immediately
- `authenticated()` - JWT authentication required, request checked by filter chain

### CORS vs Authorization

- **CORS** - Browser permission to make cross-origin HTTP requests
- **Authorization** - Server permission based on user credentials
- Both must pass for successful request

### JWT Flow

1. User logs in → Server generates JWT
2. User sends JWT in `Authorization: Bearer <token>` header
3. JwtAuthenticationFilter extracts and validates token
4. If valid, request proceeds; if invalid, returns 401

## Performance Notes

- `permitAll()` patterns are checked BEFORE authentication filters run
- No performance penalty for public routes (skips JWT validation entirely)
- CORS configuration cached for 3600 seconds (1 hour) per maxAge setting

## Security Considerations

✓ Swagger UI accessible without authentication (safe for public API docs)
✓ API endpoints still protected by JWT authentication
✓ CORS limited to localhost (safe for development)
✓ Session policy set to STATELESS (proper for REST API)
✓ CSRF disabled (proper for stateless JWT API)

---

Generated: 2024
Purpose: Technical documentation for 403 Forbidden fix
