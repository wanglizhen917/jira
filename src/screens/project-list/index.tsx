import { List } from './list'
import { SearchPanel } from './search-panel'
import { useState } from 'react'
import { useDebounce, useDocumentTitle } from 'utils'
import React from 'react'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'

export const ProjectListScreen = () => {
  //基本类型可以放到依赖里,组件状态可以放到依赖里，非组件状态绝不可以放到依赖里
  const [param, setParam] = useUrlQueryParam([
    'name',
    'personId',
  ])
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

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
