@echo off
echo [HaNova] Dang chuan bi commit cac thay doi Dashboard...
cd /d "e:\STUDY\HaNova New\HaNovaEducation_REQ_Project"

echo 1. Adding changes...
git add .

echo 2. Committing...
git commit -m "feat(dashboard): optimize performance, fix chart animations, and add new widgets"

echo 3. Pushing current branch to origin/develop...
:: Đẩy nhánh main hiện tại lên nhánh develop trên remote origin
git push origin main:develop

echo.
echo [HaNova] Hoan tat! Nhan phim bat ky de thoat.
pause
