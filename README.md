<div align="center">

  # 🧾 THE DAILY RUN · To Do Receipt
  
  **A Vintage Minimalist Receipt-Style Task Management Web Application**  
  เว็บแอปพลิเคชันจัดการ Todo List สไตล์ **ใบเสร็จกระดาษวินเทจมินิมอล** ผสานสัมผัสและเสียงแบบอะนาล็อก  
  พัฒนาด้วย **Vue 3 (Composition API) + TypeScript** เชื่อมต่อกับ **AdonisJS 5 RESTful API**

  <br />

  <!-- Tech Stack Badges -->
  [![Vue 3](https://img.shields.io/badge/Vue.js%203-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![AdonisJS 5](https://img.shields.io/badge/AdonisJS%205-5A45FF?style=for-the-badge&logo=adonisjs&logoColor=white)](https://adonisjs.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

  <br />
  <br />

  [🌐 ชมเว็บไซต์ตัวอย่าง (Live Demo)](https://somsri-todo-frontend.vercel.app/) • [⚡ รายงานปัญหา (Report Bug)](https://github.com/your-username/your-repo/issues)

</div>

---

> [!NOTE]  
> **คำแนะนำสำหรับการทดสอบผ่าน Live Demo:**  
> เซิร์ฟเวอร์ API หลังบ้าน (AdonisJS บน Free Tier) มีระบบพักการทำงานชั่วคราวเมื่อไม่มีทราฟฟิก (Cold Start) หากเปิดใช้งานครั้งแรก **ระบบอาจใช้เวลาเชื่อมต่อประมาณ 1–2 นาที** ในการโหลดและซิงก์ข้อมูลงานเดิมขึ้นมาครับ

---

## 📸 ภาพตัวอย่างระบบ (Preview)

<div align="center">
  <!-- นำรูปภาพ screenshot มาใส่ตรงนี้ หรือลากไฟล์รูปมาวางในช่องแก้ไขของ GitHub ได้โดยตรง -->
  <img src="https://via.placeholder.com/800x450.png?text=Preview+THE+DAILY+RUN+To+Do+Receipt" alt="App Preview" width="80%" />
</div>

---

## 🎨 เอกลักษณ์และการออกแบบ (Design & Aesthetics)

โปรเจกต์นี้ให้ความสำคัญกับ **Micro-interactions** และ **Sensory Experience** เพื่อเปลี่ยนการจดบันทึกงานทั่วไปให้รู้สึกเหมือนกำลังใช้งานกระดาษใบเสร็จจริง:

* 📜 **Realistic Receipt Paper Texture:**
  * ขอบกระดาษฉีกซิกแซก (Perforated / Sawtooth Cut) สมจริงทั้งหัวและท้ายกระดาษ
  * โทนสีกระดาษออฟไวท์พร้อมจำลองรอยพับ มิติแสงเงา และฟอนต์ Monospace สไตล์เครื่องพิมพ์ใบเสร็จความร้อน
* 🖊️ **Ballpoint Pen Strike Effect:**
  * เมื่อทำเครื่องหมายเสร็จสิ้น `[x]` ระบบจะจำลองเส้นหมึกปากกาลูกลื่นสีน้ำเงินขีดฆ่าข้อความอย่างเป็นธรรมชาติ
* 🔊 **Zero-Asset Tactile Audio (Web Audio API):**
  * สังเคราะห์คลื่นเสียงในเบราว์เซอร์โดยตรงด้วย **Web Audio API** โดยไม่ต้องโหลดไฟล์ `.mp3` หรือ `.wav` จากภายนอก
  * ให้เสียงพิมพ์ดีด (Typewriter Click), เสียงตวัดปากกา (Pen Scribble), และเสียงฉีกกระดาษ (Paper Tear)
  * มีสวิตช์เปิด/ปิดเสียง (Mute Toggle) ควบคุมได้อิสระ
* 📱 **Full Responsiveness:**
  * ออกแบบ UI ให้สวยงามสมบูรณ์แบบทั้งบนมือถือ (Mobile View) และหน้าจอคอมพิวเตอร์ (Desktop View)

---

## ✨ ฟังก์ชันการทำงาน (Key Features)

| ฟีเจอร์ | คำอธิบาย |
| :--- | :--- |
| **Quick Add** | พิมพ์รายการใหม่ในช่อง `[ ] write here...` แล้วกด `Enter` หรือปุ่ม Add เพื่อบันทึกทันที |
| **Inline Editing** | ดับเบิลคลิกที่ข้อความ หรือกดไอคอนดินสอ เพื่อแก้ไขชื่องานแบบ In-place ได้ทันที |
| **Task Toggle** | คลิกที่กล่องเครื่องหมายหรือตัวหนังสือเพื่อสลับสถานะ `[ ]` / `[x]` พร้อมเอฟเฟกต์ปากกาขีดฆ่า |
| **Instant Delete** | ลบรายการออกจากฐานข้อมูลผ่านไอคอนถังขยะ |
| **Category Filters** | กรองมุมมองงานได้อย่างรวดเร็ว: `[ ALL ]`, `[ ACTIVE ]`, หรือ `[ DONE ]` |
| **Batch Cleanup** | ฟังก์ชัน `Clear Completed` ล้างรายการที่ทำเสร็จแล้วทั้งหมดในคลิกเดียว |
| **Real-time Status** | มี Connection Badge ตรวจสอบสถานะการเชื่อมต่อระหว่าง Frontend กับ AdonisJS + PostgreSQL |

---

## 🛠️ สถาปัตยกรรมและเทคโนโลยี (Tech Stack)

### **Frontend Client**
* **Framework:** Vue.js 3.5+ (Composition API + `<script setup lang="ts">`)
* **Type System:** TypeScript 5.x
* **Build Tool:** Vite 6.x
* **Icons:** Lucide Vue Next
* **Sound Engine:** Web Audio API (Native Browser Synthesis)
* **Deployment:** Vercel

### **Backend & Database**
* **Server Framework:** AdonisJS 5 (Node.js MVC / RESTful API)
* **Database:** PostgreSQL
* **ORM:** Lucid ORM (Data Modeling & Migrations)

---

## 🚀 วิธีการติดตั้งและรันในเครื่อง (Local Setup)

### สิ่งที่ต้องเตรียม (Prerequisites)
* Node.js (v18.x ขึ้นไป)
* Git

### 1. โคลน Repository
```bash
git clone [https://github.com/your-username/somsri-todo-frontend.git](https://github.com/your-username/somsri-todo-frontend.git)
cd somsri-todo-frontend
