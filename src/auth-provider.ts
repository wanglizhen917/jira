import { User } from 'screens/project-list/search-panel'

const localStorageKey = '__auth_provider_token__'
const apiUrl = process.env.REACT_APP_API_URL

export const getToken = () =>
  window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = async (data: {
  username: string
  password: string
}) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (response.ok) {
    return handleUserResponse(await response.json())
  }
  return await Promise.reject(await response.json())
}

export const register = async (data: {
  username: string
  password: string
}) => {
  const response = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (response.ok) {
    return handleUserResponse(await response.json())
  }
  return await Promise.reject(await response.json())
}

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
