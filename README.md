# THE DAILY RUN · To Do Receipt (Vue 3 + TypeScript)

เว็บแอปพลิเคชันจัดการ Todo List สไตล์ **ใบเสร็จกระดาษวินเทจมินิมอล (To Do Receipt: THE DAILY RUN)** ออกแบบตามรูปภาพตัวอย่าง พัฒนาด้วย **Vue.js 3 (Composition API + `<script setup lang="ts">`)** และ **TypeScript** พร้อมการเชื่อมต่อกับ **AdonisJS 5 RESTful API Server** แบบ Real-time Persistence

---

## 🎨 เอกลักษณ์และการออกแบบ (Design & Aesthetics)
- **สไตล์ใบเสร็จสมจริง (Realistic Receipt Paper):**
  - ขอบกระดาษฉีกซิกแซกแบบ Perforated / Sawtooth Cut ทั้งด้านบนและด้านล่าง
  - Texture กระดาษออฟไวท์พร้อมรอยพับ รอยยับ และแสงเงาสมจริง
  - ฟอนต์ Typewriter / Monospace สไตล์เครื่องพิมพ์ใบเสร็จคมชัด
- **เอฟเฟกต์ปากกาลูกลื่นขีดฆ่า (Ballpoint Pen Strike Effect):**
  - เมื่อทำเครื่องหมายเสร็จสิ้น `[x]` จะมีเส้นหมึกปากกาลูกลื่นสีน้ำเงินขีดฆ่าผ่านข้อความเสมือนจริงตามรูปตัวอย่าง
- **เสียงสัมผัสเสมือนจริง (Tactile Audio):**
  - สังเคราะห์เสียงพิมพ์ดีด (Typewriter click), เสียงขีดปากกา (Pen scribble), และเสียงฉีกกระดาษ (Paper tear) ด้วย **Web Audio API** โดยไม่ต้องโหลดไฟล์เสียงภายนอก พร้อมปุ่มเปิด/ปิดเสียง (Mute Toggle)
- **Responsive 100%:**
  - รองรับทั้งบนมือถือ (Mobile View) และหน้าจอคอมพิวเตอร์ (Desktop View)
- **แถบเมนูด้านล่าง:**
  - สัญลักษณ์ `Productivity · To Do Receipt` ตามภาพตัวอย่างต้นแบบ

---

## 🚀 ฟังก์ชันการทำงาน (Features)
1. **เพิ่มรายการ Todo:** พิมพ์ในแถว `[ ] write here...` และกด Enter หรือปุ่ม ADD เพื่อบันทึกไปยัง API Server ทันที
2. **แก้ไขรายการ:** ดับเบิลคลิกที่ข้อความ หรือกดไอคอนดินสอ เพื่อแก้ไขชื่อรายการ Todo แบบ Inline
3. **ทำเครื่องหมายเสร็จสิ้น:** คลิกที่ `[ ]` หรือคลิกที่ตัวหนังสือเพื่อสลับสถานะเป็น `[x]` พร้อมขีดเส้นปากกาสีน้ำเงิน
4. **ลบรายการ Todo:** คลิกไอคอนถังขยะ เพื่อลบรายการออกจากฐานข้อมูล
5. **กรองรายการ (Filters):** เลือกดู `[ ALL ]`, `[ ACTIVE ]`, หรือ `[ DONE ]`
6. **ล้างรายการที่เสร็จแล้ว (Clear Completed):** ลบรายการที่ทำเสร็จแล้วทั้งหมดในคลิกเดียว
7. **สถานะการเชื่อมต่อ:** มี Badge แสดงสถานะการเชื่อมต่อกับ AdonisJS 5 + PostgreSQL แบบเรียลไทม์

---

## 🛠 Tech Stack
- **Framework:** Vue.js 3.5+ (Composition API + `<script setup>`)
- **Language:** TypeScript 5.x
- **Build Tool:** Vite 6.x
- **Icons:** Lucide Vue Next
- **Audio:** Web Audio API (Zero external assets)

---

## ⚙️ การติดตั้งและรันโปรเจกต์ (Local Setup)

### 1. ติดตั้ง Dependencies
```bash
cd frontend
npm install
```

### 2. กำหนดค่า Environment Variables (`.env`)
หากเซิร์ฟเวอร์ Backend รันอยู่ที่พอร์ตอื่น สามารถตั้งค่าใน `.env` ได้:
```env
VITE_API_BASE_URL=http://127.0.0.1:3333/api
```
*(ค่าเริ่มต้นเชื่อมต่อไปยัง `http://127.0.0.1:3333/api` โดยอัตโนมัติ)*

### 3. รัน Dev Server
```bash
npm run dev
```
เปิดเว็บเบราว์เซอร์ที่: `http://localhost:5173/`

### 4. Build สำหรับ Production
```bash
npm run build
```
ไฟล์ Production จะถูกสร้างไว้ในโฟลเดอร์ `dist/`
