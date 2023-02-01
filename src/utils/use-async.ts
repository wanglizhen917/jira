import { useRef, useState } from 'react'

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

  //useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数()=>{}，而是要()=>()=>{}
  const [retry, setRetry] = useState(() => () => {})

  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null,
    })

  const setError = (error: Error) =>
    setState({
      error: error,
      stat: 'error',
      data: null,
    })

  const run = async (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> },
  ) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setRetry(() => () => {
      if (runConfig?.retry) run(runConfig?.retry(), runConfig)
    })
    setState({ ...state, stat: 'loading' })
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
  }

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
