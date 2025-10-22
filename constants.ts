import { Role, User, Mentee, Report, SevaSummary, Tutor } from './types';

export const ROLES: Role[] = [
  Role.MENTOR,
  Role.MENTOR_MONITOR,
  Role.TUTOR_ADMIN,
  Role.SUPER_TUTOR,
  Role.SUPER_ADMIN,
];

// FIX: Updated MOCK_USERS to conform to the User interface. Replaced 'id' with 'uid', 'name' with 'fullName', and added missing properties.
export const MOCK_USERS: { [key in Role]: User } = {
  [Role.MENTOR]: { uid: 'user-1', fullName: 'Priya Patel', role: Role.MENTOR, email: 'mentor@test.com', mobile: '111', subcenter: 'A', mhtId: 'M1', country: 'USA' },
  [Role.MENTOR_MONITOR]: { uid: 'user-2', fullName: 'Rajesh Shah', role: Role.MENTOR_MONITOR, email: 'monitor@test.com', mobile: '222', subcenter: 'B', mhtId: 'M2', country: 'USA' },
  [Role.TUTOR_ADMIN]: { uid: 'user-3', fullName: 'Anjali Mehta', role: Role.TUTOR_ADMIN, email: 'tutor@test.com', mobile: '333', subcenter: 'C', mhtId: 'M3', country: 'USA' },
  [Role.SUPER_TUTOR]: { uid: 'user-4', fullName: 'Vikram Joshi', role: Role.SUPER_TUTOR, email: 'supertutor@test.com', mobile: '444', subcenter: 'D', mhtId: 'M4', country: 'USA' },
  [Role.SUPER_ADMIN]: { uid: 'user-5', fullName: 'Neerav Bhai', role: Role.SUPER_ADMIN, email: 'superadmin@test.com', mobile: '555', subcenter: 'E', mhtId: 'M5', country: 'USA' },
};

export const MOCK_MENTEES: Mentee[] = [
  { id: 101, name: 'Aarav Desai', batch: 'Summer 2024', mentorId: 1, hwSubmitted: true, attendance: 'Present' },
  { id: 102, name: 'Isha Trivedi', batch: 'Summer 2024', mentorId: 1, hwSubmitted: false, attendance: 'Present' },
  { id: 103, name: 'Kian Sharma', batch: 'Fall 2024', mentorId: 1, readingSubmission: 'Completed reading chapter 3.', hwSubmitted: true, attendance: 'Absent' },
  { id: 104, name: 'Diya Rao', batch: 'Fall 2024', mentorId: 99, hwSubmitted: true, attendance: 'Present' },
];

export const MOCK_REPORTS: Report[] = [
    {id: 1, menteeName: 'Aarav Desai', date: '2024-07-15', summary: 'Good progress in conversational skills.', submittedBy: 'Priya Patel'},
    {id: 2, menteeName: 'Isha Trivedi', date: '2024-07-15', summary: 'Struggling with verb conjugations.', submittedBy: 'Priya Patel'},
    {id: 3, menteeName: 'Kian Sharma', date: '2024-07-10', summary: 'Excellent reading comprehension.', submittedBy: 'Priya Patel'},
];

export const MOCK_SEVA_SUMMARY: SevaSummary[] = [
    {batch: 'Spring 2023', menteeName: 'Rohan Mehta'},
    {batch: 'Fall 2023', menteeName: 'Saanvi Gupta'},
];

export const MOCK_TUTORS: Tutor[] = [
    { id: 201, name: 'Amit Singh', status: 'Active', assignedBatches: ['Summer 2024', 'Fall 2024'] },
    { id: 202, name: 'Sunita Nair', status: 'Active', assignedBatches: ['Summer 2024'] },
    { id: 203, name: 'Manish Kumar', status: 'Inactive', assignedBatches: [] },
];

export const SYLLABUS_LINK = '/path/to/syllabus.pdf';

export const COUNTRIES = [
  'United States', 'United Kingdom', 'India', 'Kenya', 'Germany', 'Singapore', 'Australia', 'New Zealand', 'Canada'
];