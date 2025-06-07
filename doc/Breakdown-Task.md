# Breakdown Task

## Phase 1: Core SaaS Platform

- [ ] Setup โครงสร้างโปรเจกต์ (Vite + React + TS)
- [ ] สร้าง UI Auth (Login, Register, Forgot Password)
- [ ] เชื่อมต่อ Supabase Auth SDK
- [ ] สร้าง Table หลักใน Supabase และตั้ง RLS
- [ ] สร้างหน้าหลัก Dashboard (CRUD, Table, Filter)
- [ ] เขียน Service Layer (src/services/supabase.ts)
- [ ] ตั้งค่า env (.env, .env.example)
- [ ] Setup Vercel deploy + CI/CD
- [ ] เขียน README วิธี setup

## Phase 2: SaaS Feature

- [ ] ระบบ Profile & Organization
- [ ] Multi-tenant data layer (user/org)
- [ ] Notification system (simple)
- [ ] Export/Import data
- [ ] ระบบ setting (ปรับแต่งข้อมูลผู้ใช้)

## Phase 3: Template/White-label

- [ ] แยก Theme/Branding (src/themes)
- [ ] เพิ่ม config สำหรับ deploy template
- [ ] เขียนคู่มือปรับแต่ง template (docs/Deployment-Guide.md)
- [ ] Script สำหรับ setup env, branding อัตโนมัติ

## Phase 4: Enterprise

- [ ] SSO/LDAP integration
- [ ] Logging/Audit log
- [ ] Security & Compliance (GDPR, ฯลฯ)
- [ ] ระบบ support (contact, FAQ, ticket)

## Phase 5: Distribution/Sale

- [ ] เตรียมไฟล์ package template
- [ ] Landing page เว็บไซต์
- [ ] Marketplace listing
- [ ] คู่มือ license/activation

---

**หมายเหตุ:**

- สามารถปรับยืดหยุ่นแต่ละ phase ให้เหมาะกับ resource/เวลา
- Phase 1-2 คือ MVP สามารถเปิดให้ใช้งาน/ขาย SaaS ได้ก่อน
