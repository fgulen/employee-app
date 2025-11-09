# Backend Rebuild Instructions for 403 Fix

## Summary of Changes

We've made the following updates to fix the 403 Forbidden error on Swagger UI:

1. **AppSecurityConfig.java** - Enhanced permitAll() patterns for all Swagger routes
2. **CorsConfig.java** - Created new CORS configuration to handle cross-origin requests
3. **OpenApiConfig.java** - Already configured (no changes needed)

## Step-by-Step Rebuild

### 1. Stop Current Backend (if running)

Press `Ctrl+C` in the terminal where backend is running

### 2. Clean Build

```powershell
cd c:\Users\fg\Desktop\employee-app\backend
mvn clean install -DskipTests
```

### 3. Start Backend

```powershell
mvn spring-boot:run
```

### 4. Wait for Startup

Look for this message:

```
Started EmployeeAppApplication in X.XXX seconds
```

## Test Swagger Access

### Test 1: Direct Access

Navigate to: http://localhost:8081/swagger-ui/index.html

**Expected Result:** Swagger UI loads with interactive documentation

### Test 2: Check Browser Console

Press `F12` to open Developer Tools → Console tab

- Should see no CORS errors
- Should see no 403/401 errors

### Test 3: Test API Authentication Flow

1. Click **Try it out** on `POST /api/auth/login`
2. Enter credentials:
   ```json
   {
     "username": "admin",
     "password": "admin"
   }
   ```
3. Click **Execute**
4. Copy the returned JWT token
5. Click **Authorize** button at top of Swagger UI
6. Paste: `Bearer <your-token-here>`
7. Try a protected endpoint like `GET /api/employees`

### Test 4: Clear Browser Cache (if still having issues)

1. Press `Ctrl+Shift+Delete`
2. Select "All time"
3. Check only "Cookies and other site data" and "Cached images and files"
4. Click "Clear data"
5. Reload Swagger page

## Verification Checklist

- [ ] Backend started successfully without errors
- [ ] Swagger UI loads at http://localhost:8081/swagger-ui/index.html
- [ ] No 403 Forbidden error appears
- [ ] Can see all API endpoints listed
- [ ] Can login via Swagger with admin/admin credentials
- [ ] Authorize button accepts JWT token
- [ ] Protected endpoints work after authorization

## If Issue Persists

1. Check backend logs for errors:

   ```
   Look for: "CorsConfig", "OpenApiConfig", "AppSecurityConfig" in logs
   ```

2. Verify all files are in correct locations:

   - `backend/src/main/java/com/example/employeeapp/config/CorsConfig.java` ✓
   - `backend/src/main/java/com/example/employeeapp/config/OpenApiConfig.java` ✓
   - `backend/src/main/java/com/example/employeeapp/security/AppSecurityConfig.java` ✓

3. Check `application.yml` has Springdoc configuration:

   ```yaml
   springdoc:
     swagger-ui:
       path: /swagger-ui.html
       enabled: true
   ```

4. If still seeing 403, try accessing with explicit Bearer token:
   - Login first at: `POST http://localhost:8081/api/auth/login`
   - Copy token from response
   - Call: `http://localhost:8081/swagger-ui/index.html`
   - Add header: `Authorization: Bearer <token>`

## Common Issues

| Issue                   | Solution                                                                    |
| ----------------------- | --------------------------------------------------------------------------- |
| Port 8081 in use        | Kill process: `netstat -ano \| findstr :8081` then `taskkill /PID <PID> /F` |
| CORS errors in console  | Browser cache cleared? Restart backend?                                     |
| 404 on Swagger          | Check `springdoc.swagger-ui.path` in application.yml                        |
| 401/403 still appearing | Clear browser cache completely and restart backend                          |
| Maven build fails       | Check Java version: `java -version` (should be 17+)                         |

## Files Modified

### 1. AppSecurityConfig.java

- Added explicit Swagger route patterns to permitAll()
- Added CORS configuration bean
- Added proper session management

### 2. CorsConfig.java (NEW)

- Implements WebMvcConfigurer
- Allows origins: localhost:3000, localhost:5173, localhost:8081
- Allows methods: GET, POST, PUT, DELETE, OPTIONS
- Set credentials: true for JWT token passing

### 3. OpenApiConfig.java

- Already configured correctly
- No changes needed

## Next Steps

1. Execute rebuild commands above
2. Test Swagger at http://localhost:8081/swagger-ui/index.html
3. Report results:
   - ✓ Working (403 resolved)
   - ✗ Still 403 Forbidden (need more debugging)
   - ✗ Different error (describe the error)
