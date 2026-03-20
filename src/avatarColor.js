const COLORS = [
  '#e53935', '#d81b60', '#8e24aa', '#5e35b1',
  '#3949ab', '#1e88e5', '#039be5', '#00acc1',
  '#00897b', '#43a047', '#7cb342', '#c0ca33',
  '#f4511e', '#6d4c41', '#546e7a', '#ef6c00',
]

export function avatarColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return COLORS[Math.abs(hash) % COLORS.length]
}
