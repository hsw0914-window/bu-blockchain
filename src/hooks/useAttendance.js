import { useState } from "react";
import { STREAK_REWARDS } from "../constants";

const STORAGE_KEY = "attendance_dates";

// ─── 유틸 함수 ────────────────────────────────────────────────────────────────
export function toDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function getAttendanceDates() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveAttendanceDates(dates) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
}

/** 오늘부터 뒤로 연속 출석일 수를 계산 */
export function calcStreak(attended) {
  const today = new Date();
  let count = 0;
  const d = new Date(today);
  while (true) {
    const s = toDateStr(d.getFullYear(), d.getMonth(), d.getDate());
    if (attended.includes(s)) {
      count++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return count;
}

/** 홈 배너용 간략 출석 정보 */
export function getAttendanceStreak() {
  try {
    const dates = getAttendanceDates();
    const today = new Date();
    const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
    const todayChecked = dates.includes(todayStr);
    const streak = calcStreak(dates);
    const nextReward = STREAK_REWARDS.find((r) => r.streak > streak) ?? null;
    return { streak, todayChecked, nextReward };
  } catch {
    return { streak: 0, todayChecked: false, nextReward: { streak: 5, label: "일반 박스", icon: "📦" } };
  }
}

// ─── 출석 전용 커스텀 훅 ─────────────────────────────────────────────────────
export function useAttendance() {
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [attended, setAttended]   = useState(getAttendanceDates);
  const [showReward, setShowReward] = useState(false);
  const [rewardAnim, setRewardAnim] = useState(false);
  const [earnedReward, setEarnedReward] = useState(null);

  const todayStr    = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
  const todayChecked = attended.includes(todayStr);
  const streak      = calcStreak(attended);

  const nextMilestone = STREAK_REWARDS.find((r) => r.streak > streak);
  const lastReached   = [...STREAK_REWARDS].reverse().find((r) => r.streak <= streak);
  const daysUntilNext = nextMilestone ? nextMilestone.streak - streak : 0;

  const progressFrom = lastReached?.streak ?? 0;
  const progressTo   = nextMilestone?.streak ?? STREAK_REWARDS[STREAK_REWARDS.length - 1].streak;
  const progressPct  = nextMilestone
    ? ((streak - progressFrom) / (progressTo - progressFrom)) * 100
    : 100;

  function checkIn() {
    if (todayChecked) return;
    const next = [...attended, todayStr];
    setAttended(next);
    saveAttendanceDates(next);

    const newStreak = calcStreak(next);
    const triggered = STREAK_REWARDS.find((r) => r.streak === newStreak) ?? null;
    setEarnedReward(triggered);
    setShowReward(true);
    setRewardAnim(true);
    setTimeout(() => setRewardAnim(false), 2200);
    setTimeout(() => setShowReward(false), 3600);
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  return {
    attended, todayStr, todayChecked, streak,
    nextMilestone, lastReached, daysUntilNext, progressPct,
    showReward, rewardAnim, earnedReward,
    checkIn, prevMonth, nextMonth,
    viewYear, viewMonth,
  };
}
