export enum Role {
  MENTOR = 'Mentor',
  MENTOR_MONITOR = 'Mentor Monitor',
  TUTOR_ADMIN = 'Tutor / Admin',
  SUPER_TUTOR = 'Super Tutor',
  SUPER_ADMIN = 'Super Admin',
}

export interface User {
  uid: string;
  fullName: string;
  email: string;
  mobile: string;
  subcenter: string;
  mhtId: string;
  country: string;
  role: Role;
}

export interface Mentee {
  id: number;
  name: string;
  batch: string;
  mentorId: number;
  readingSubmission?: string;
  hwSubmitted: boolean;
  attendance: 'Present' | 'Absent';
}

export interface Report {
  id: number;
  menteeName: string;
  date: string;
  summary: string;
  submittedBy: string;
}

export interface SevaSummary {
    batch: string;
    menteeName: string;
}

export interface Tutor {
    id: number;
    name: string;
    status: 'Active' | 'Inactive';
    assignedBatches: string[];
}