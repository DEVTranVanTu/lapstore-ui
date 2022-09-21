export const capitalizeString = (str: string): string => {
  if (!str) return ''

  return `${str[0].toUpperCase()}${str.slice(1)}`
}

export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green'
  if (mark >= 4) return 'goldenrod'
  return 'red'
}

export const linkToName = (name: string): string => {
  return name
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    .replace(/\s/gi, '-')
}

export function formatVND(value?: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value || 0)
}

export function getUserInfo() {
  const user = localStorage.getItem('user_infor')
  return user ? JSON.parse(user) : undefined
}

export function setUserInfo(data: object) {
  const user =
    data && typeof data === 'object' ? JSON.stringify(data) : JSON.stringify({})
  return localStorage.setItem('user_infor', user)
}

export function removeUserInfo() {
  return localStorage.removeItem('user_infor')
}

export function getAuthToken() {
  return localStorage.getItem('token')
}

export function setAuthToken(token: string) {
  return localStorage.setItem('token', token)
}

export function removeAuthToken() {
  return localStorage.removeItem('token')
}
