import { useCallback, useEffect } from 'react'
import { Project } from 'screens/project-list/list'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  const { run, ...result } = useAsync<Project[]>()

  const fetchProjects = useCallback(
    () =>
      client('projects', {
        data: cleanObject(param || {}),
      }),
    [client, param],
  )

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    })
  }, [fetchProjects, param, run])

  return result
}

export const useEditProject = () => {
  const { run, ...result } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    )
  }

  return { mutate, ...result }
}
