import { Student } from "../types/student";

export const mockStudents: Student[] = [
  {
    id: "stu_1",
    name: "Alex Johnson",
    userName: "alexj_99",
    rollNo: "CS2023-001",
    personalMail: "alex.j99@gmail.com",
    collegeMail: "alex.j@urvah.edu",
    phone: "+1 555-0101",
    collegeId: "col_1",
    branch: "Computer Science",
    year: 3,
    batchId: "batch_1",
    codingScore: 850,
    assignmentProgress: 92,
    contestParticipation: 5,
    streakScore: 12,
    inviteStatus: "accepted",
    inviteSentDate: "2026-05-01",
    attendanceRate: 94,
    attendanceLog: [
      { date: "2026-05-18", status: "present" },
      { date: "2026-05-17", status: "present" },
      { date: "2026-05-16", status: "present" },
      { date: "2026-05-15", status: "late" },
      { date: "2026-05-14", status: "present" },
      { date: "2026-05-13", status: "present" },
      { date: "2026-05-12", status: "absent" },
      { date: "2026-05-11", status: "present" },
      { date: "2026-05-10", status: "present" },
    ],
    activityTimeline: [
      {
        id: "act_101",
        type: "submission",
        title: "Successfully submitted 'LRU Cache'",
        timestamp: "2026-05-19T14:32:00Z",
        details: "Time: 42ms (Beats 94.2%), Memory: 18.4MB. Problem Level: Hard.",
        statusClass: "text-green-400"
      },
      {
        id: "act_102",
        type: "contest",
        title: "Participated in Weekly Algorithm Duel #14",
        timestamp: "2026-05-18T18:00:00Z",
        details: "Ranked #14 out of 380 candidates. Solved 3/4 problems. Score: +120pts.",
        statusClass: "text-primary"
      },
      {
        id: "act_103",
        type: "submission",
        title: "Failed Testcases on 'Merge k Sorted Lists'",
        timestamp: "2026-05-17T09:15:00Z",
        details: "Verdict: Time Limit Exceeded (TLE) on Testcase 18/25. Optimized to min-heap next.",
        statusClass: "text-red-400"
      },
      {
        id: "act_104",
        type: "attendance",
        title: "Marked LATE for Morning Session",
        timestamp: "2026-05-15T09:12:00Z",
        details: "Arrived at 9:12 AM (Grace period 9:05 AM). Lead Trainer: Trainer 1.",
        statusClass: "text-green-400"
      },
      {
        id: "act_105",
        type: "invite",
        title: "Accepted System Enrollment Invite",
        timestamp: "2026-05-02T11:04:00Z",
        details: "Registered using college credentials. Mail: alex.j@urvah.edu.",
        statusClass: "text-green-500"
      }
    ]
  },
  {
    id: "stu_2",
    name: "Sarah Connor",
    userName: "sconnor",
    rollNo: "CS2023-042",
    personalMail: "sarahc@gmail.com",
    collegeMail: "sarah.c@urvah.edu",
    phone: "+1 555-0202",
    collegeId: "col_1",
    branch: "Information Technology",
    year: 3,
    batchId: "batch_1",
    codingScore: 920,
    assignmentProgress: 100,
    contestParticipation: 8,
    streakScore: 24,
    inviteStatus: "accepted",
    inviteSentDate: "2026-05-02",
    attendanceRate: 98,
    attendanceLog: [
      { date: "2026-05-18", status: "present" },
      { date: "2026-05-17", status: "present" },
      { date: "2026-05-16", status: "present" },
      { date: "2026-05-15", status: "present" },
      { date: "2026-05-14", status: "present" },
      { date: "2026-05-13", status: "present" },
      { date: "2026-05-12", status: "present" },
      { date: "2026-05-11", status: "present" },
      { date: "2026-05-10", status: "present" },
    ],
    activityTimeline: [
      {
        id: "act_201",
        type: "submission",
        title: "Solved Daily Challenge: 'Trapping Rain Water'",
        timestamp: "2026-05-19T21:10:00Z",
        details: "Perfect Solution: 13ms (Beats 99.8% in C++). Perfect DP space allocation.",
        statusClass: "text-green-400"
      },
      {
        id: "act_202",
        type: "contest",
        title: "Won 1st Place in Rapid Sprints #4",
        timestamp: "2026-05-15T15:30:00Z",
        details: "Ranked #1. Cleared all 5 problems in 21 mins. Score: +250pts.",
        statusClass: "text-primary font-bold"
      },
      {
        id: "act_203",
        type: "course",
        title: "Unlocked Elite Badge: 'Dynamic Programmer'",
        timestamp: "2026-05-12T14:00:00Z",
        details: "Completed 25 medium/hard problems on DP & Memoization successfully.",
        statusClass: "text-purple-400"
      }
    ]
  },
  {
    id: "stu_3",
    name: "Michael Chang",
    userName: "mike_c",
    rollNo: "EE2024-015",
    personalMail: "mike.chang@gmail.com",
    collegeMail: "michael.c@texash.edu",
    phone: "+1 555-0303",
    collegeId: "col_2",
    branch: "Electrical Engineering",
    year: 2,
    batchId: "batch_3",
    codingScore: 450,
    assignmentProgress: 45,
    contestParticipation: 2,
    streakScore: 3,
    inviteStatus: "pending",
    inviteSentDate: "2026-05-17",
    attendanceRate: 78,
    attendanceLog: [
      { date: "2026-05-18", status: "absent" },
      { date: "2026-05-17", status: "present" },
      { date: "2026-05-16", status: "present" },
      { date: "2026-05-15", status: "present" },
      { date: "2026-05-14", status: "absent" },
      { date: "2026-05-13", status: "present" },
      { date: "2026-05-12", status: "absent" },
      { date: "2026-05-11", status: "present" },
      { date: "2026-05-10", status: "present" },
    ],
    activityTimeline: [
      {
        id: "act_301",
        type: "submission",
        title: "Successfully submitted 'Reverse Linked List'",
        timestamp: "2026-05-17T11:40:00Z",
        details: "Time: 0ms (Beats 100%), Memory: 6.8MB. Problem Level: Easy.",
        statusClass: "text-green-400"
      },
      {
        id: "act_302",
        type: "attendance",
        title: "Marked ABSENT for Lab Workshop",
        timestamp: "2026-05-12T09:00:00Z",
        details: "No login detected during check-in slot. System marked offline.",
        statusClass: "text-red-400"
      },
      {
        id: "act_303",
        type: "invite",
        title: "Access Invitation Dispatched",
        timestamp: "2026-05-17T08:00:00Z",
        details: "Email delivered to michael.c@texash.edu.",
        statusClass: "text-muted-foreground"
      }
    ]
  },
  {
    id: "stu_4",
    name: "Emily Davis",
    userName: "emilyd",
    rollNo: "ME2025-081",
    personalMail: "emily.d@gmail.com",
    collegeMail: "emily.d@stanford.edu",
    phone: "+1 555-0404",
    collegeId: "col_3",
    branch: "Mechanical Engineering",
    year: 1,
    batchId: "batch_5",
    codingScore: 210,
    assignmentProgress: 20,
    contestParticipation: 0,
    streakScore: 1,
    inviteStatus: "expired",
    inviteSentDate: "2026-04-10",
    attendanceRate: 60,
    attendanceLog: [
      { date: "2026-05-18", status: "absent" },
      { date: "2026-05-17", status: "absent" },
      { date: "2026-05-16", status: "present" },
      { date: "2026-05-15", status: "present" },
      { date: "2026-05-14", status: "absent" },
      { date: "2026-05-13", status: "absent" },
      { date: "2026-05-12", status: "present" },
      { date: "2026-05-11", status: "absent" },
      { date: "2026-05-10", status: "present" },
    ],
    activityTimeline: [
      {
        id: "act_401",
        type: "attendance",
        title: "Consecutive Absences Warning Issued",
        timestamp: "2026-05-18T10:00:00Z",
        details: "Missed multiple morning lecture slots. Engagement rate fell to 60%. Guidelines require 75%.",
        statusClass: "text-red-500 font-bold"
      },
      {
        id: "act_402",
        type: "submission",
        title: "Solved 'Two Sum' Problem",
        timestamp: "2026-05-16T14:22:00Z",
        details: "Beats 68.4% in JavaScript. Level: Easy.",
        statusClass: "text-green-400"
      },
      {
        id: "act_403",
        type: "invite",
        title: "Portal Invitation EXPIRED",
        timestamp: "2026-04-17T00:00:00Z",
        details: "Limit of 7 days exceeded. Needs manual reinvite by administrator.",
        statusClass: "text-red-400"
      }
    ]
  }
];
