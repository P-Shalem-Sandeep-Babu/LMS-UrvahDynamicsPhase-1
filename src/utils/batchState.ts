import { Batch } from "../types/batch";
import { Student } from "../types/student";
import { Trainer } from "../types/trainer";
import { Faculty } from "../types/faculty";
import { mockBatches } from "../data/mockBatches";
import { mockStudents } from "../data/mockStudents";
import { mockTrainers } from "../data/mockTrainers";
import { mockFaculty } from "../data/mockFaculty";

// Keys for local storage
const BATCHES_KEY = "urvah_synced_batches";
const STUDENTS_KEY = "urvah_synced_students";
const TRAINERS_KEY = "urvah_synced_trainers";
const FACULTY_KEY = "urvah_synced_faculty";
const ATTENDANCE_KEY = "urvah_synced_attendance"; // Record index: batchId_date -> studentId_status mappings

export interface AttendanceRecord {
  batchId: string;
  date: string; // ISO Date YYYY-MM-DD
  records: Record<string, "present" | "absent" | "late">; // studentId -> status
}

export const getStoredBatches = (): Batch[] => {
  const data = localStorage.getItem(BATCHES_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing batches from localStorage", e);
    }
  }
  localStorage.setItem(BATCHES_KEY, JSON.stringify(mockBatches));
  return mockBatches;
};

export const saveStoredBatches = (batches: Batch[]) => {
  localStorage.setItem(BATCHES_KEY, JSON.stringify(batches));
  // Dispatch a storage event so other components state-update if needed
  window.dispatchEvent(new Event("urvah_batches_update"));
};

export const getStoredStudents = (): Student[] => {
  const data = localStorage.getItem(STUDENTS_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing students from localStorage", e);
    }
  }
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(mockStudents));
  return mockStudents;
};

export const saveStoredStudents = (students: Student[]) => {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  window.dispatchEvent(new Event("urvah_students_update"));
};

export const getStoredTrainers = (): Trainer[] => {
  const data = localStorage.getItem(TRAINERS_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing trainers from localStorage", e);
    }
  }
  localStorage.setItem(TRAINERS_KEY, JSON.stringify(mockTrainers));
  return mockTrainers;
};

export const saveStoredTrainers = (trainers: Trainer[]) => {
  localStorage.setItem(TRAINERS_KEY, JSON.stringify(trainers));
};

export const getStoredFaculty = (): Faculty[] => {
  const data = localStorage.getItem(FACULTY_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing faculty from localStorage", e);
    }
  }
  localStorage.setItem(FACULTY_KEY, JSON.stringify(mockFaculty));
  return mockFaculty;
};

export const saveStoredFaculty = (faculty: Faculty[]) => {
  localStorage.setItem(FACULTY_KEY, JSON.stringify(faculty));
};

// Attendance Helpers
export const getStoredAttendance = (): AttendanceRecord[] => {
  const data = localStorage.getItem(ATTENDANCE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing attendance", e);
    }
  }
  // Let's seed some mock attendance records for our batches to make the dashboard look populated!
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  
  const mockAttendance: AttendanceRecord[] = [
    {
      batchId: "batch_1",
      date: yesterday,
      records: {
        "stu_1": "present",
        "stu_2": "present",
      }
    },
    {
      batchId: "batch_1",
      date: today,
      records: {
        "stu_1": "present",
        "stu_2": "absent",
      }
    },
    {
      batchId: "batch_3",
      date: today,
      records: {
        "stu_3": "present"
      }
    }
  ];
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(mockAttendance));
  return mockAttendance;
};

export const saveStoredAttendance = (records: AttendanceRecord[]) => {
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records));
  window.dispatchEvent(new Event("urvah_attendance_update"));
};

export const markAttendance = (batchId: string, date: string, studentId: string, status: "present" | "absent" | "late") => {
  const allRecords = getStoredAttendance();
  const existingIndex = allRecords.findIndex(r => r.batchId === batchId && r.date === date);
  
  if (existingIndex > -1) {
    allRecords[existingIndex].records[studentId] = status;
  } else {
    allRecords.push({
      batchId,
      date,
      records: { [studentId]: status }
    });
  }
  saveStoredAttendance(allRecords);
};
