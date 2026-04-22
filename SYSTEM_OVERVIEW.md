# 📚 HaNova Academic Mentoring Platform — Tổng Quan Hệ Thống

> **Phiên bản tổng hợp:** 22/04/2026  
> **Stack:** React 19 · TypeScript · Vite 8 · TailwindCSS · Framer Motion  
> **Server địa phương:** `http://localhost:5173/`

---

## 🗂️ Cấu Trúc Dự Án

```
velorah-hero/
├── src/
│   ├── App.tsx                  # Router & page transitions
│   ├── main.tsx                 # Entry point
│   ├── index.css / App.css      # Global styles & design tokens
│   ├── pages/                   # 8 trang chính
│   │   ├── Home.tsx             # Landing page
│   │   ├── Tutors.tsx           # Danh sách mentor
│   │   ├── TutorProfile.tsx     # Profile chi tiết mentor
│   │   ├── Dashboard.tsx        # Bảng điều khiển học sinh
│   │   ├── Schedule.tsx         # Lịch học
│   │   ├── StudyPlan.tsx        # Lộ trình học tập
│   │   ├── Notifications.tsx    # Thông báo
│   │   └── Profile.tsx          # Tài khoản & cài đặt
│   ├── components/
│   │   ├── BookingModal.tsx     # Modal đặt lịch (4 bước)
│   │   ├── Navigation.tsx       # Thanh điều hướng
│   │   └── StarfieldCanvas.tsx  # Hiệu ứng nền canvas
│   ├── layout/
│   │   └── Layout.tsx           # Layout bọc chung
│   └── services/
│       └── tutors.ts            # Dữ liệu & types mentor (~50+ mentor)
├── docs/
│   └── hanova-student-system.md
└── assets/videos/               # 9 video media assets
```

---

## 🖥️ Các Trang Đã Thiết Kế

### 1. 🏠 Trang Chủ (Home — `/`)

Trang landing page premium với **10 section** trải dài:

| # | Section | Mô tả |
|---|---------|-------|
| 1 | **Hero Video** | Video fullscreen `hanova_overview.mp4`, rounded corners, fade-in animation |
| 2 | **Headline** | H1 gradient màu sắc, CTA nút "Start Learning" & "View Plans" |
| 3 | **Marquee** | Dải cuộn vô tận: 2000+ Students · 98% Pass Rate · Harvard, MIT, Oxford · 24/7 Tracking |
| 4 | **Photo Gallery** | Layout 3 cột bento với ảnh học thuật từ Unsplash, hover scale & grayscale toggle |
| 5 | **Value Proposition** | "Engineered for Results" — 3 bento card: Unmatched Clarity · Structured Flow · Premium Guidance |
| 6 | **Showcase Video** | Video `showcase-video.mp4` với parallax scroll, glassmorphic badge, scale + opacity animation |
| 7 | **How It Works** | 4 bước với số thứ tự (01–04): Find Tutor → Book → Follow Plan → Mastery; animated SVG path |
| 8 | **Featured Tutors** | 3 mentor nổi bật với ảnh portrait, hover reveal credentials |
| 9 | **Study Plan Preview** | Mock UI: progress ring 68%, week schedule M/T/W/T/F, module list với animated progress bars |
| 10 | **Ecosystem Bento** | 2 card lớn: "Engage directly with experts" + "Learn Anywhere" với video, glassmorphic badges |
| 11 | **Testimonial** | Avatar stack + quote lớn kiểu editorial: *"Before HaNova, I didn't know what to focus on..."* |
| 12 | **Final CTA** | Full-page CTA: "Start with clarity. Stay with progress." — nút "Find Your Tutor" |

**Animations:** Framer Motion `whileInView`, parallax scroll transform, animated curved SVG path, infinite marquee

---

### 2. 🔍 Trang Danh Sách Mentor (Tutors — `/tutors`)

**Chức năng tìm kiếm & lọc nâng cao:**

| Filter | Loại | Chi tiết |
|--------|------|---------|
| **Search** | Text | Tìm theo tên, vai trò, chủ đề |
| **Subject** | Multi-select | Dropdown đa lựa chọn với checkbox |
| **Availability** | Single-select | Today / This Week / Limited |
| **Pricing** | Single-select | Under $30 / $30-$32 / $33+ |
| **Language** | Single-select | English, Vietnamese, ... |
| **Format** | Single-select | 1:1 Live / Exam Sprint / Project Review |
| **Expertise** | Tag buttons | AP Calculus, IELTS Writing, IB Physics, University Prep, Python |
| **Reset** | Button | Đặt lại tất cả filter |

**Layout hiển thị:**
- **Featured Card** (mentor đầu tiên): Card lớn 2 cột với ảnh portrait, rating, "Best Match" badge, Quick Book
- **Grid Card** (các mentor còn lại): 2-cột grid, compact card với availability indicator, Next Slot, Match Note
- **Trending Fields** tags: Tự động hiển thị từ kết quả lọc
- Tích hợp `BookingModal` khi nhấn Book

---

### 3. 👤 Trang Profile Mentor (TutorProfile — `/tutors/:id`)

**Cấu trúc editorial magazine layout:**

- **Hero Header:** Cover image + avatar overlap, badge "Elite Academic" + "Identity Verified"
- **Stats Row:** 4 metric cards — Hourly Rate · Rating · Reviews · Response Time
- **Left Sidebar (sticky):** Tutor Identity — Institution · Headline · Formats · Weekly Availability
- **Main Content:**
  - *Teaching Philosophy* — Quote lớn + intro text + 3 framework cards
  - *Career Trajectory* — Achievements với số lớn background, 2-cột mô tả
  - *Domain Expertise* — Grid card chuyên môn
  - *Verified Outcomes* — Kết quả + preview reviews
- **Book Action Card** (desktop sidebar): Giá theo session, nút "Book Now", next slot
- **Mobile Sticky CTA:** Fixed bottom bar trên mobile

---

### 4. 📊 Dashboard Học Sinh (`/dashboard`)

**Tổng quan nhanh các hoạt động học tập:**

- **Hero Welcome:** Chào buổi tối, câu slogan truyền động lực
- **Next Lesson Card:** Giờ học sắp tới, đếm ngược 45 phút, nút "Enter Studio" với pulse animation
- **This Week's Agenda:** 3 sự kiện tuần này (ngày, giờ, tiêu đề, badge Lesson/Independent)
- **Active Milestone:** Progress bar 66%, danh sách topics (completed ✓ + đang học)
- Link điều hướng sang Schedule và Study Plan

---

### 5. 🗓️ Lịch Học (Schedule — `/schedule`)

**Timetable grid view đầy đủ tính năng:**

**Left Panel — Tutor List:**
- Search tutors theo tên/môn
- Filter tabs: All / Active / Completed
- Mỗi tutor card: avatar, tên, môn, status badge (màu), next session

**Right Panel — Timetable:**
- **Week View** (07:00–22:00): Grid lịch tuần 7 ngày, drag session vào slot
  - Session card với màu tutor, thời gian, tên session, badge "Updated"
  - Hover Card nổi: hiển thị Location · Room · Time · Duration · Prep Note · Materials
  - Off-day overlay với pattern diagonal + "Unavailable" tooltip
- **Month View**: Course overview cards với syllabus + progress bar

**Customization Panel** (collapsible):
- Row Height: S / M / L / XL (60/75/90/110px)
- Toggle Weekend On/Off
- Toggle từng ngày riêng lẻ

**Session Detail Modal** (khi click): When · Room Number · Location · Prep Notes · Materials · Cancellation Policy · nút Cancel/Reschedule

**Theme Modes:** Glass / Solid / Neon

---

### 6. 📋 Lộ Trình Học Tập (StudyPlan — `/study-plan`)

**Quản lý học theo kế hoạch cấu trúc:**

**Overview Dashboard:**
- Plan Header: Tiêu đề, giáo viên, ngày bắt đầu/kết thúc, progress bar badge gradient
- 4 Summary Cards: Total Sessions · Completed · Upcoming · Tasks Due

**Learning Roadmap (Timeline):**
- 4 Phase với connector vertical spine:
  1. Grammar Foundation (Completed ✓)
  2. Reading Strategies (Ongoing • pulsing dot)
  3. Writing Task 1 & 2 (Upcoming)
  4. Listening & Speaking (Upcoming)
- Mỗi Phase expand/collapse hiển thị sessions:
  - Status badge, ngày, giờ
  - Session detail: Learning Objectives · Prep Note · Materials (PDF/Video/Link) · Tutor Feedback · Student Star Rating

**Task Management (Section 4):**
- Filter: All / Pending / Completed
- Click to mark done (animated strikethrough)
- Priority badge: High (đỏ) / Medium (amber) / Low (mờ)
- Overdue indicator

**Right Sidebar (sticky):**
- This Week analytics: Consistency badge (flame icon) + mini bar chart 7 ngày
- Plan Details table
- Next Session reminder card

**Soft Reminders** (dismissible): Session tomorrow · Tasks due · Tutor plan update

---

### 7. 🔔 Thông Báo (Notifications — `/notifications`)

**Hệ thống notification theo category:**

**Left Panel — Categories:**
- All · Unread · Sessions · Academic · Messages · System
- Count badge per category (Unread highlight neon blue)
- Quick Stats: session alerts + academic updates tuần này

**Right Panel — Feed:**
- Group by date (Today · Oct 20 · Oct 19 · ...)
- Notification card với accent màu theo type:
  - 🔵 Session: Join Studio, View Recording
  - 🟢 Message: Reply, Download
  - 🟡 Academic: View Feedback, grade
  - 🟠 Session Change: Reschedule
  - 🟣 Academic: Milestone Unlocked
  - ⬛ System: Platform Update
- Unread: accent bar trái + glow shadow
- Hover reveal "Mark as Read" button
- Mark All Read button

---

### 8. ⚙️ Tài Khoản (Profile — `/profile`)

**4 tab settings:**

| Tab | Nội dung |
|-----|---------|
| **Personal Details** | Avatar (hover camera icon) · Tên · Student ID · Email · Phone · Timezone · Location |
| **Learning Preferences** | Toggle switches: Session Reminders · Study Group Invitations · Quiet Mode · Weekly Email Digest |
| **Billing & Plans** | Current Plan "Scholar Premium" $150/month · Payment Methods (Visa •••• 4242) · Add Method |
| **Security** | Password (last changed 3 months) · 2FA (Authy configured ✓) · Active Sessions (2 devices) · Sign Out All |

---

## 🛒 Quy Trình Đặt Lịch (BookingModal)

Modal đặt lịch **4 bước** trượt ngang:

```
Step 1: Schedule → Step 2: Learning Plan → Step 3: Payment Review → Step 4: Confirmed
```

### Step 1 — Schedule
- **Full calendar** interactive: navigate tháng, hiển thị available/full/today days
- Available slots: 9:00 AM · 11:00 AM · 2:00 PM · 4:30 PM
- Booking Details sidebar: Tutor · Subject · First Session selected

### Step 2 — Learning Plan
Chọn 1 trong 3 gói:

| Gói | Sessions | Discount | Badge |
|-----|---------|---------|-------|
| Single Session | 1 | 0% | — |
| Monthly Plan | 4 | 10% off | Most Popular |
| Full Course | 12 | 20% off | Best Value |

### Step 3 — Payment Review
- Plan Summary: Subject & Format · First Session
- **Payment Method:** VNPay (local banking) · MoMo (digital wallet)
- **Cancellation Policy** (expandable): Free > 24h · 50% refund 12-24h · No-show non-refundable
- Checkbox agree policy → mở khóa "Pay Now"
- Price Breakdown: Base price · Package discount · Service fee 5% · **Total**
- **Timer đếm ngược 10 phút** để giữ slot

### Step 4 — Confirmed
- CheckCircle spring animation
- Booking Reference ID, First Session date/time, Next Steps
- Nút: Close / Go to Dashboard

---

## 📦 Data Model Mentor (TutorRecord)

```typescript
interface TutorRecord {
  id: string;
  name: string;
  role: string;               // Chuyên môn chính
  headline: string;           // Mô tả ngắn
  quote: string;              // Triết lý dạy học
  subjects: string[];         // Môn dạy (filter)
  expertise: string[];        // Kỹ năng chuyên sâu (filter)
  university: string;         // Trường đại học
  rating: number;             // 4.5–5.0
  reviews: number;            // Số lượng đánh giá
  hourlyRate: number;         // Giá/session (USD)
  availability: 'Today' | 'This Week' | 'Limited';
  responseTime: string;       // Thời gian phản hồi
  formats: string[];          // 1:1 Live, Exam Sprint, Project Review
  languages: string[];        // English, Vietnamese
  matchNote: string;
  intro: string;
  achievements: string[];
  teachingStyle: string[];
  outcomes: string[];
  nextSlots: string[];        // Lịch trống gần nhất
  weeklyAvailability: Array<{ day: string; slots: string[] }>;
  reviewsPreview: TutorReview[];  // 2 đánh giá preview
}
```

**Số lượng mentor trong hệ thống:** ~50 mentor (ID từ 1–60), đa dạng môn học:
- Language / English / IELTS / TOEFL / Public Speaking
- Mathematics / Calculus / Stats / Geometry
- Physics / Quantum / Electromagnetism
- Computer Science / Python / JavaScript / ML
- Biology / Biomedical / Anatomy
- Literature / Essays / Critical Analysis
- Design / UX / Product Design
- Economics / Finance

---

## 🎨 Design System

### Color Palette
- **Background:** `#020205` (deep black)
- **Primary Gradient:** Blue-500 → Violet-500
- **Accent:** Amber-300 → Orange-400
- **Success:** Emerald-400 → Teal-400
- **Glass:** `rgba(255,255,255, 0.03–0.08)` với `backdrop-blur`

### Typography
- **Heading:** Serif font (font-serif)
- **Body:** Sans-serif (font-sans)
- Tracking widest cho labels (uppercase, 0.2–0.3em)

### Components chung
- **Glass Panel:** `bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl`
- **Rounded corners:** `rounded-[28px]` đến `rounded-[48px]`
- **Hover effect:** `-translate-y-1`, border glow, scale
- **Animations:** Framer Motion với easing `[0.22, 1, 0.36, 1]`

---

## ✅ Trạng Thái Phát Triển

| Module | Trạng thái | Ghi chú |
|--------|-----------|---------|
| Landing Page | ✅ Hoàn thành | 10+ sections, đầy đủ animation |
| Tutor Discovery | ✅ Hoàn thành | Full filter, smart layout |
| Tutor Profile | ✅ Hoàn thành | Editorial layout, booking tích hợp |
| Booking Modal | ✅ Hoàn thành | 4-step flow, calendar, payment |
| Dashboard | ✅ Hoàn thành | Weekly agenda, milestone |
| Schedule / Timetable | ✅ Hoàn thành | Week/Month view, customization, hover detail |
| Study Plan | ✅ Hoàn thành | Timeline phases, task management, analytics |
| Notifications | ✅ Hoàn thành | Category filter, grouped feed |
| User Profile | ✅ Hoàn thành | 4-tab settings |
| Navigation | ✅ Hoàn thành | Responsive, animated |
| Redux / State Mgmt | ⬜ Chưa làm | Thư mục tạo sẵn nhưng trống |
| API / Backend | ⬜ Chưa làm | Hiện dùng mock data tĩnh |
| Authentication | ⬜ Chưa làm | Chưa có login flow thực |
| Context / Hooks | ⬜ Chưa làm | Cấu trúc đã tạo, chưa implement |

---

## 🚀 Chạy Server

```bash
# Sử dụng cmd.exe (bypass PowerShell policy)
cmd /c "set PATH=C:\Program Files\nodejs;%PATH% && npm run dev"

# Truy cập tại
http://localhost:5173/
```

**Yêu cầu:** Node.js v24.15.0 · npm v11.12.1

---

*Tài liệu này được tổng hợp tự động từ source code dự án — 22/04/2026*
