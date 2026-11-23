import { useState, useEffect } from 'react';

export type TimeOfDayPeriod = 'morning' | 'afternoon' | 'evening' | 'night';

export interface LiveClockData {
  currentTime: Date;
  timeString12: string; // "09:47:54 PM"
  timeString24: string; // "21:47:54"
  timeHM24: string;     // "21:47"
  dateString: string;   // "Friday, Sep 18, 2026"
  period: TimeOfDayPeriod;
  isMorning: boolean;
  isEveningOrNight: boolean;
  greetingEnglish: string;
  greetingBengali: string;
  subtextBengali: string;
  subtextEnglish: string;
}

export function useLiveClock(): LiveClockData {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // 12h formatting with zero-padded seconds
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  const pad = (n: number) => n.toString().padStart(2, '0');

  const timeString12 = `${pad(hours12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
  const timeString24 = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  const timeHM24 = `${pad(hours)}:${pad(minutes)}`;

  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Calculate period strictly
  let period: TimeOfDayPeriod = 'morning';
  let greetingEnglish = 'Good morning';
  let greetingBengali = 'শুভ সকাল';
  let subtextBengali = 'আজকের দিনটি প্রাণবন্ত ও চনমনে রাখতে সকালের হালকা ওয়ার্কআউট দিয়ে শুরু করুন।';
  let subtextEnglish = 'Start your morning with light mobility and core activation to set a focused rhythm.';

  if (hours >= 5 && hours < 12) {
    period = 'morning';
    greetingEnglish = 'Good morning';
    greetingBengali = 'শুভ সকাল';
    subtextBengali = 'সকালের আলো ও হালকা ওয়ার্কআউট আপনার শরীরের এনার্জি বাড়িয়ে তুলবে।';
    subtextEnglish = 'Wake up your joints, stimulate blood circulation, and activate full-body energy.';
  } else if (hours >= 12 && hours < 17) {
    period = 'afternoon';
    greetingEnglish = 'Good afternoon';
    greetingBengali = 'শুভ অপরাহ্ন';
    subtextBengali = 'দিনের মধ্যভাগে একঘেয়েমি কাটাতে সামান্য স্ট্রেচিং বা মোবিলিটি করে নিন।';
    subtextEnglish = 'Take a moment to step away from your desk and reset your posture.';
  } else if (hours >= 17 && hours < 21) {
    period = 'evening';
    greetingEnglish = 'Good evening';
    greetingBengali = 'শুভ সন্ধ্যা';
    subtextBengali = 'দিনের কাজের ক্লান্তি ঝেড়ে ফেলতে বিকালের পোস্টার ও কোর সেশন সম্পন্ন করুন।';
    subtextEnglish = 'Decompress after a long day of sitting and restore your back alignment.';
  } else {
    // 21:00 to 04:59 (Night)
    period = 'night';
    greetingEnglish = 'Good night';
    greetingBengali = 'শুভ রাত্রি';
    subtextBengali = 'শান্ত থাকুন। এখন গভীর ঘুমের জন্য পেশির চাপ ও ক্লান্তি দূর করার সময়।';
    subtextEnglish = 'Shift into recovery. Practice gentle breathing to prepare for deep, restorative sleep.';
  }

  const isMorning = period === 'morning';
  const isEveningOrNight = period === 'evening' || period === 'night' || period === 'afternoon';

  return {
    currentTime,
    timeString12,
    timeString24,
    timeHM24,
    dateString,
    period,
    isMorning,
    isEveningOrNight,
    greetingEnglish,
    greetingBengali,
    subtextBengali,
    subtextEnglish
  };
}
