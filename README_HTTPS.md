# HTTPS Setup Guide

## Development Environment

### Option 1: Using mkcert (Recommended - Easy & Trusted)

1. **Install mkcert** (Run PowerShell as Administrator):

   ```powershell
   choco install mkcert
   ```

2. **Install local CA**:

   ```bash
   mkcert -install
   ```

3. **Generate certificates**:

   ```bash
   # Frontend
   cd frontend/certs
   mkcert -key-file localhost-key.pem -cert-file localhost-cert.pem localhost 127.0.0.1

   # Backend (optional - use same certs)
   cd ../../backend
   mkdir certs
   copy ..\frontend\certs\* certs\
   ```

4. **Update environment variables**:

   ```bash
   # Backend .env
   USE_HTTPS=true
   PORT=8000
   ```

5. **Start servers**:

   ```bash
   # Frontend will auto-detect certificates and use HTTPS
   cd frontend
   npm run dev  # https://localhost:3001

   # Backend
   cd backend
   npm run dev  # https://localhost:8000
   ```

### Option 2: Using OpenSSL (Alternative)

If you have OpenSSL installed:

```bash
# Frontend
cd frontend/certs
openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout localhost-key.pem \
  -out localhost-cert.pem \
  -days 365 \
  -subj "/CN=localhost"

# Copy to backend
cp localhost-*.pem ../../backend/certs/
```

**Note**: Self-signed certs will show browser warnings. Click "Advanced" → "Proceed to localhost".

### Option 3: Using PowerShell Script

Run the included script (requires Administrator):

```powershell
.\generate-certs.ps1
```

## Configuration

### Frontend (Vite)

The `vite.config.ts` is already configured to:

- Auto-detect certificates in `frontend/certs/`
- Enable HTTPS if certificates exist
- Fall back to HTTP if certificates are missing

### Backend (Fastify)

The `backend/server.ts` is configured to:

- Check `USE_HTTPS` environment variable
- Load certificates from `backend/certs/`
- Fall back to HTTP if not configured

### Update axios baseURL

If using HTTPS, update `frontend/src/utils/axios.ts`:

```typescript
baseURL: "https://localhost:8000/api";
```

## Production Deployment

### Vercel (Frontend)

- Automatic HTTPS with free SSL certificates
- No configuration needed

### Heroku / Railway / Render (Backend)

- Free automatic SSL/TLS
- Set environment variables through dashboard

### Custom Server (VPS/AWS/Azure)

1. **Get SSL Certificate**:

   - **Let's Encrypt** (Free, recommended):

     ```bash
     # Install certbot
     sudo apt install certbot

     # Get certificate
     sudo certbot certonly --standalone -d yourdomain.com
     ```

   - **Cloudflare** (Free):
     - Use Cloudflare as DNS proxy
     - Automatic SSL/TLS encryption

2. **Configure Nginx as Reverse Proxy**:

   ```nginx
   server {
       listen 443 ssl http2;
       server_name yourdomain.com;

       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

       # Frontend
       location / {
           proxy_pass http://localhost:3001;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:8000;
       }
   }
   ```

3. **Environment Variables**:
   ```bash
   USE_HTTPS=true
   VITE_API_URL=https://yourdomain.com
   ```

## Troubleshooting

### "Certificate not trusted" warning

- **Development**: Normal for self-signed certs. Use mkcert for trusted certs.
- **Production**: Ensure certificate is from trusted CA (Let's Encrypt).

### Mixed Content Errors

- Ensure all API calls use HTTPS
- Update axios baseURL to use `https://`

### CORS Issues with HTTPS

- Update CORS origin in backend to include HTTPS URLs:
  ```typescript
  origin: ["https://localhost:3001", "https://yourdomain.com"];
  ```

### Certificate Files Not Found

- Verify files exist in `frontend/certs/` and `backend/certs/`
- Check file permissions
- Ensure filenames match: `localhost-key.pem` and `localhost-cert.pem`

## Security Notes

- **Never commit certificates to git** (already in `.gitignore`)
- Use environment variables for production certificates
- Rotate certificates before expiration
- Use strong cipher suites in production
- Enable HSTS headers for production

## Quick Start Summary

**For Development:**

```bash
# 1. Generate certificates (choose one method)
# Method A: mkcert (recommended)
mkcert -install
cd frontend/certs
mkcert -key-file localhost-key.pem -cert-file localhost-cert.pem localhost

# Method B: OpenSSL
cd frontend/certs
openssl req -x509 -newkey rsa:2048 -nodes -keyout localhost-key.pem -out localhost-cert.pem -days 365 -subj "/CN=localhost"

# 2. Copy to backend (optional)
cp frontend/certs/* backend/certs/

# 3. Set environment variable
echo "USE_HTTPS=true" >> backend/.env

# 4. Start servers
npm run dev  # Both will use HTTPS
```

**For Production:**

- Deploy to Vercel/Netlify (frontend) - automatic HTTPS
- Use Let's Encrypt for custom servers
- Configure reverse proxy (Nginx/Caddy)
