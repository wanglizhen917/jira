import { useCallback, useReducer, useRef, useState } from 'react'
import { useMountedRef } from 'utils'

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
}

const defaultConfig = {
  throwOnError: false,
}

const useSafeDispatch = <T>(
  dispatch: (...args: T[]) => void,
) => {
  const mountedRef = useMountedRef()
  return useCallback(
    (...args: T[]) =>
      mountedRef.current ? dispatch(...args) : void 0,
    [dispatch, mountedRef],
  )
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig,
) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({
      ...state,
      ...action,
    }),
    {
      ...defaultInitialState,
      ...initialState,
    },
  )

  const safeDispatch = useSafeDispatch(dispatch)

  //useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数()=>{}，而是要()=>()=>{}
  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null,
      }),
    [safeDispatch],
  )

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error: error,
        stat: 'error',
        data: null,
      }),
    [safeDispatch],
  )

  const run = useCallback(
    async (
      promise: Promise<D>,
      runConfig?: { retry: () => Promise<D> },
    ) => {
      if (!promise || !promise.then) {
        throw new Error('请传入 Promise 类型数据')
      }
      setRetry(() => () => {
        if (runConfig?.retry) run(runConfig?.retry(), runConfig)
      })

      //会造成无限循环，因为这state改变了，依赖项里又有state，就会循环.解决办法是，不要用到state，使用函数式写法
      //setState({ ...state, stat: 'loading' })
      safeDispatch({ stat: 'loading' })
      return promise
        .then((data) => {
          setData(data)
          return data
        })
        .catch((error) => {
          setError(error)
          if (config.throwOnError) return Promise.reject(error)
          return error
        })
    },
    [config.throwOnError, safeDispatch, setData, setError],
  )

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    retry,
    setData,
    setError,
    ...state,
  }
}
