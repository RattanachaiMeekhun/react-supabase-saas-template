# Product Roadmap

## 1. Core SaaS Platform (Phase 1)

- [x] วางโครงสร้างโปรเจกต์ให้แยก frontend, infra, docs ชัดเจน
- [x] พัฒนา UI หลัก (Dashboard, Auth, CRUD)
- [x] เชื่อมต่อ Supabase: Auth (login/signup), CRUD (table หลัก)
- [x] ตั้งค่า Supabase Row Level Security (RLS) สำหรับ multi-tenant
- [x] ติดตั้ง CI/CD (Vercel, GitHub Actions)
- [x] เตรียม env/config ให้ง่ายต่อการ deploy หลาย environment

## 2. SaaS Feature (Phase 2)

- [ ] ระบบสมัครใช้งาน, email verify, reset password
- [ ] Multi-tenant (ข้อมูลแยกตาม user/org)
- [ ] ระบบจัดการ subscription/payment (optional)
- [ ] ระบบแจ้งเตือน (Notification)
- [ ] ระบบตั้งค่า (User/Profile/Organization Settings)
- [ ] ระบบ Export/Import Data

## 3. Template & White-label (Phase 3)

- [ ] แยก theme/branding (logo, color, favicon, etc.)
- [ ] สร้าง script/setup สำหรับลูกค้า on-premise
- [ ] คู่มือปรับแต่ง template (env, branding, config)
- [ ] ระบบเปิด/ปิดฟีเจอร์ (feature flag)
- [ ] ตัวอย่างการ deploy บนแพลตฟอร์มต่าง ๆ (Vercel, Netlify, Docker, Firebase Hosting)

## 4. Enterprise/Organization Support (Phase 4)

- [ ] เพิ่มฟีเจอร์ SSO/LDAP (optional)
- [ ] Logging, Audit Log
- [ ] Security Enhancement (rate limit, advanced RLS)
- [ ] คู่มือ/ระบบ support & SLA

## 5. Marketplace/Distribution (Phase 5)

- [ ] เตรียม package สำหรับขาย template
- [ ] เว็บไซต์ demo + landing page
- [ ] คู่มือ license/activation
- [ ] Marketplace listing (Gumroad, Themeforest, ฯลฯ)
