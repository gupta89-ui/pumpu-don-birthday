type BirthdayCountdown = {
  isBirthday: boolean
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function getBirthdayCountdown(
  month: number,
  day: number,
  now = new Date()
): BirthdayCountdown {
  const isBirthday = now.getMonth() + 1 === month && now.getDate() === day
  const target = new Date(now.getFullYear(), month - 1, day)

  if (!isBirthday && target.getTime() < now.getTime()) {
    target.setFullYear(target.getFullYear() + 1)
  }

  const remaining = Math.max(0, target.getTime() - now.getTime())
  const days = Math.floor(remaining / 86_400_000)
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000)
  const minutes = Math.floor((remaining % 3_600_000) / 60_000)
  const seconds = Math.floor((remaining % 60_000) / 1_000)

  return { isBirthday, days, hours, minutes, seconds }
}

export function formatBirthdayDate(month: number, day: number): string {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric' }).format(
    new Date(2024, month - 1, day)
  )
}
