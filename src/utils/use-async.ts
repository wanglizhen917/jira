import { useCallback, useRef, useState } from 'react'
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

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig,
) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  })

  const mountedRef = useMountedRef()

  //useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数()=>{}，而是要()=>()=>{}
  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: 'success',
        error: null,
      }),
    [],
  )

  const setError = useCallback(
    (error: Error) =>
      setState({
        error: error,
        stat: 'error',
        data: null,
      }),
    [],
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
      setState((prev) => ({ ...prev, stat: 'loading' }))
      return promise
        .then((data) => {
          if (mountedRef.current) setData(data)
          return data
        })
        .catch((error) => {
          setError(error)
          if (config.throwOnError) return Promise.reject(error)
          return error
        })
    },
    [config.throwOnError, mountedRef, setData, setError],
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
