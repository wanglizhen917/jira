import { Button, Drawer } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  projectListActions,
  selectProjectModalOpen,
} from './project-list.slice'

export const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)
  const onClose = () =>
    dispatch(projectListActions.closeProjectModal)
  return (
    <Drawer
      onClose={onClose}
      width={'100%'}
      visible={projectModalOpen}
    >
      <h1>Project Modal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  )
}
