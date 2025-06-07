# Deployment Guide

## Deploy SaaS Version (Vercel + Supabase)

1. สร้าง Supabase Project
2. ตั้งค่า Table, Auth, RLS Policy
3. กำหนด env ใน Vercel (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)
4. Deploy frontend ที่ Vercel (Connect GitHub repo)
5. ทดสอบ login, CRUD

## Deploy Template/On-premise

1. Clone Source Code
2. สมัคร Supabase ใหม่ หรือใช้ DB ของตนเอง
3. กำหนด .env (ใช้ .env.example)
4. สั่ง `npm i` + `npm run build`
5. Deploy ที่ Vercel/Netlify/Firebase Hosting หรือ Docker
6. ปรับ branding/theme ได้ใน `src/themes` และ `vite.config.ts`
