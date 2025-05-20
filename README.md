# Cinema Management Backend

<div align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</div>

Tổng quan về dự án: 

Backend cho hệ thống quản lý rạp chiếu phim, được xây dựng với NestJS, Prisma ORM và PostgreSQL. Hỗ trợ quản lý phim, lịch chiếu, đặt vé và quản lý người dùng.

## ⚙️ Công nghệ sử dụng

- **Framework**: NestJS
- **Ngôn ngữ**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Xác thực**: JWT, Passport
- **API Documentation**: Swagger
- **Validation**: Class-validator

----- CẤU TRÚC DỰ ÁN -----
```
cinema-backend/
├── src/
│   ├── common/           # Guards, decorators, middlewares, utils
│   ├── movies/           # Quản lý phim
│   ├── movie-genres/     # Quản lý thể loại phim
│   ├── theaters/         # Quản lý rạp chiếu
│   ├── rooms/            # Quản lý phòng chiếu
│   ├── showtimes/        # Quản lý lịch chiếu
│   ├── bookings/         # Quản lý đặt vé
│   ├── users/            # Quản lý người dùng
│   ├── auth/             # Xác thực và phân quyền
│   └── prisma/           # Prisma service và migrations
├── prisma/               # Schema và migrations
    └── schema.prisma     # Database schema
```

------ CÁC TÍNH NĂNG CHÍNH -----

Quản lý phim: 
- Thêm, sửa, xóa, tìm kiếm phim
- Thông tin phim: tiêu đề, mô tả, thời lượng, diễn viên, đạo diễn, đánh giá tuổi
- Quản lý poster và thể loại phim
- Liên kết với quốc gia sản xuất

Quản lý rạp/phòng chiếu:
- Quản lý nhiều rạp chiếu với nhiều phòng
- Sơ đồ ghế ngồi cho từng phòng
- Hỗ trợ nhiều loại ghế: thường, VIP, cặp đôi

Quản lý lịch chiếu:
- Lập lịch chiếu phim theo phòng
- Kiểm tra xung đột lịch chiếu
- Hiển thị lịch chiếu theo phim, theo rạp

Đặt vé:
- Đặt vé theo lịch chiếu
- Chọn ghế ngồi
- Kiểm tra trạng thái ghế (đã đặt/còn trống)

Quản lý người dùng: 
- Đăng ký, đăng nhập, xác thực email
- Hỗ trợ đăng nhập bằng Google
- Phân quyền: User, Manager, Admin
- Quản lý hồ sơ người dùng

INSTALL AND RUN

### Yêu cầu hệ thống
- Node.js (>= 16.x)
- PostgreSQL (>= 13)
- npm hoặc yarn

### Cài đặt
1. Clone repository:
```bash
git clone https://github.com/lnmanhtuan2k/cinema-api.git
cd cinema-backend
```

2. Cài đặt dependencies:

- npm install

3. Tạo file `.env` với nội dung:
```
DATABASE_URL="postgresql://username:password@localhost:5432/cinema?schema=public"
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="1d"
```
4. Chạy migrations:

npx prisma migrate dev


5. Tạo Prisma client:
```bash
npx prisma generate
```

### Khởi chạy
- **Development mode**:
```bash
npm run start:dev
```

- **Production mode**:
```bash
npm run build
npm run start:prod
```

## 📚 API Documentation

Sau khi khởi chạy, API documentation có thể truy cập tại:
```
http://localhost:3000/api/docs
```

## 🔑 Vai trò và phân quyền

- **User**: Đặt vé, xem lịch chiếu, xem thông tin phim
- **Manager**: Quản lý phim, lịch chiếu, phòng chiếu
- **Admin**: Toàn quyền quản lý hệ thống

