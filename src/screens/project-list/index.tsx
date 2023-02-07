import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce, useDocumentTitle } from 'utils'
import React from 'react'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { Button } from 'antd/es/radio'
import { Row } from 'components/lib'
import { useDispatch } from 'react-redux'
import { projectListActions } from './project-list.slice'

export const ProjectListScreen = () => {
  const dispatch = useDispatch()
  const [param, setParam] = useProjectsSearchParams()
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200))

  const { data: users } = useUsers()

  useDocumentTitle('项目列表')

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button
          onClick={() =>
            dispatch(projectListActions.openProjectModal)
          }
        >
          创建项目
        </Button>
      </Row>

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
        refresh={retry}
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
