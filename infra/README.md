# Infra Directory

โฟลเดอร์นี้ใช้สำหรับเก็บไฟล์และสคริปต์ที่เกี่ยวกับการตั้งค่าโครงสร้างพื้นฐาน (infrastructure) ของโปรเจกต์ เช่น:

- สคริปต์ช่วย deploy (deploy script)
- ไฟล์ Docker/Docker Compose (ถ้ามี)
- ไฟล์ config สำหรับ CI/CD ที่ไม่ใช่ของ Vercel (เช่น Netlify, Render)
- ไฟล์เครื่องมือที่ใช้สำหรับ local development หรือ automation

## ตัวอย่างไฟล์ที่อาจอยู่ในโฟลเดอร์นี้

- `docker-compose.yml` – ตัวอย่าง config สำหรับรัน local dev หรือ production
- `deploy.sh` – สคริปต์อัตโนมัติสำหรับ deploy
- `seed.sql` – สคริปต์สำหรับ seed database
- `README.md` – (ไฟล์นี้) อธิบายวิธีใช้งานโฟลเดอร์ infra

## การใช้งาน

1. อ่านคำอธิบายแต่ละไฟล์ในโฟลเดอร์นี้ก่อนใช้งาน
2. หากต้องการ deploy หรือรัน local dev ให้ทำตามขั้นตอนในแต่ละไฟล์ หรือดูใน [docs/Deployment-Guide.md](../docs/Deployment-Guide.md)
3. สามารถเพิ่มสคริปต์หรือ config ที่จำเป็นเพิ่มเติมได้ตามต้องการ

## หมายเหตุ

- หากใช้ Vercel เป็นหลัก อาจไม่มีไฟล์ในโฟลเดอร์นี้มากนัก (เพราะ Vercel ใช้ workflow อัตโนมัติ)
- แต่หากต้องการรองรับการ deploy แบบอื่น ๆ หรือให้ลูกค้าติดตั้ง on-premise โฟลเดอร์นี้จะมีประโยชน์มาก
