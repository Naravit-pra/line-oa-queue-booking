# LINE OA Queue Booking System

ระบบจองคิวผ่าน LINE Official Account โดยใช้ Google Sheets เป็นฐานข้อมูล

## Features
- รับข้อความ “จองคิว” จากผู้ใช้
- สร้างหมายเลขคิวอัตโนมัติ
- บันทึกลง Google Sheets
- ตอบกลับด้วย Flex Message
- ส่งข้อความเมื่อถึงคิวผู้ใช้

## วิธีใช้งาน
1. ตั้งค่า `.env` และ `credentials.json`
2. Deploy Webhook ไปยัง Render/Railway
3. เชื่อมต่อ LINE Developers Webhook
4. นำ Google Sheets Template ไปใช้ และให้สิทธิ์ Service Account
