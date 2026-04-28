import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type DemoAccountRole = "student" | "tutor" | "manager" | "admin"

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

export interface StoredUserProfile {
  name: string
  email: string
  initials: string
  role: string
  goal?: string
  remember?: boolean
  accountRole?: DemoAccountRole
  subjects?: string[]
  notifications?: {
    email?: boolean
    inApp?: boolean
  }
  learningStyle?: string
  budget?: string
  tutorProfile?: {
    qualification?: string
    experience?: string
    hourlyRate?: string
    teachingFormats?: string[]
  }
  organization?: {
    name?: string
    role?: string
    size?: string
    need?: string
  }
  createdAt?: string
}

export const USER_PROFILE_KEY = "hanova:user-profile"
export const USER_UPDATED_EVENT = "hanova:user-updated"

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
    role: "manager",
    label: "Manager",
    email: "manager@hanova.vn",
    password: "Manager123A",
    name: "Tran Minh Quan",
    initials: "MQ",
    goal: "Manage academic operations",
    redirectTo: "/manager/dashboard",
  },
  {
    role: "admin",
    label: "Admin",
    email: "admin@hanova.vn",
    password: "Admin123A",
    name: "Pham Gia Bao",
    initials: "GB",
    goal: "Administer platform access and system governance",
    redirectTo: "/admin/dashboard",
  },
]

export function findDemoAccount(email: string, password: string) {
  return demoAccounts.find(
    (account) => account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password,
  )
}

export function readStoredUserProfile() {
  if (typeof window === "undefined") return null

  try {
    const stored = window.localStorage.getItem(USER_PROFILE_KEY)
    if (!stored) return null
    return JSON.parse(stored) as StoredUserProfile
  } catch {
    return null
  }
}

export function writeStoredUserProfile(profile: StoredUserProfile) {
  if (typeof window === "undefined") return

  window.localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile))
  window.dispatchEvent(new Event(USER_UPDATED_EVENT))
}

export function clearStoredUserProfile() {
  if (typeof window === "undefined") return

  window.localStorage.removeItem(USER_PROFILE_KEY)
  window.dispatchEvent(new Event(USER_UPDATED_EVENT))
}
