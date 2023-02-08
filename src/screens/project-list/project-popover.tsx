import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import React from 'react'
import { useProjects } from 'utils/project'
import { useProjectModal } from './util'

export const ProjectPopover = () => {
  const { open } = useProjectModal()
  const { data } = useProjects()
  const pinnedProjects = data?.filter((project) => project.pin)
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">
        收藏项目
      </Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item
            key={project.id}
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type="link" onClick={open}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )
  return (
    <Popover content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
