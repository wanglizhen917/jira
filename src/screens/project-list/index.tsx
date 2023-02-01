import { List, Project } from './list'
import { SearchPanel } from './search-panel'
import { useState, useEffect } from 'react'
import { cleanObject, useDocumentTitle } from 'utils'
import React from 'react'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { useAsync } from 'utils/use-async'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })

  const debounceParam = useDebounce(param, 200)
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(debounceParam)

  const { data: users } = useUsers()

  useDocumentTitle('项目列表')

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      />
      {error ? (
        <Typography.Text type={'danger'}>
          {error.message}
        </Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    //TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

//后面用泛型
export const useDebounce = <V,>(value: V, delay?: number) => {
  const [debounceValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(
      () => setDebouncedValue(value),
      delay,
    )
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue
}
