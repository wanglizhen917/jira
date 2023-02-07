import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useAsync } from 'utils/use-async'
import {
  FullPageErrorFallback,
  FullPageLoading,
} from 'components/lib'
import { useMount } from 'utils'
import * as authStore from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { bootstrap } from 'store/auth.slice'

export interface AuthForm {
  username: string
  password: string
}

export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

export const AuthProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
  } = useAsync<User | null>()

  const dispatch: (...args: any) => Promise<User> = useDispatch()

  useMount(() => {
    run(dispatch(bootstrap()))
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }
  return <div>{children}</div>
}

export const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector(authStore.selectUser)
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form) as any),
    [dispatch],
  )
  const register = useCallback(
    (form: AuthForm) =>
      dispatch(authStore.register(form) as any),
    [dispatch],
  )
  const logout = useCallback(
    () => dispatch(authStore.logout() as any),
    [dispatch],
  )
  return {
    user,
    login,
    register,
    logout,
  }
}
