import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type DemoAccountRole = "student" | "tutor" | "admin"

export interface DemoAccount {
  role: DemoAccountRole
  label: string
  email: string
  password: string
  name: string
  initials: string
  goal: string
  redirectTo: string
}

export const demoAccounts: DemoAccount[] = [
  {
    role: "student",
    label: "Student",
    email: "student@hanova.vn",
    password: "Student123A",
    name: "Nguyen Minh Anh",
    initials: "MA",
    goal: "IELTS 6.5 in 3 months",
    redirectTo: "/dashboard",
  },
  {
    role: "tutor",
    label: "Tutor",
    email: "tutor@hanova.vn",
    password: "Tutor123A",
    name: "Dr. Nguyen Lan Anh",
    initials: "LA",
    goal: "Teach IELTS and English",
    redirectTo: "/tutor/dashboard",
  },
  {
    role: "admin",
    label: "Manager / Admin",
    email: "admin@hanova.vn",
    password: "Admin123A",
    name: "Tran Minh Quan",
    initials: "MQ",
    goal: "Manage academic operations",
    redirectTo: "/dashboard?workspace=organization",
  },
]

export function findDemoAccount(email: string, password: string) {
  return demoAccounts.find(
    (account) => account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password,
  )
}
