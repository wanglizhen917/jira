import { useCallback, useMemo } from 'react'
import { useUrlQueryParam } from 'utils/url'

export const useProjectsSearchParams = () => {
  //基本类型可以放到依赖里,组件状态可以放到依赖里，非组件状态绝不可以放到依赖里
  const [param, setParam] = useUrlQueryParam([
    'name',
    'personId',
  ])
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param],
    ),
    setParam,
  ] as const
}

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(
    ['projectCreate'],
  )

  const open = useCallback(() => {
    setProjectCreate({ projectCreate: true })
  }, [setProjectCreate])
  const close = useCallback(() => {
    setProjectCreate({ projectCreate: false })
  }, [setProjectCreate])

  return {
    projectModalOpen: projectCreate === 'true',
    open,
    close,
  }
}
