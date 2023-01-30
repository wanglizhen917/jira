/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { List } from './list'
import { SearchPanel, SearchPanelProps } from './search-panel'
import { useState, useEffect } from 'react'
import { cleanObject } from 'utils'
import qs from 'qs'
import React from 'react'
import { useHttp } from 'utils/http'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })

  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const debounceParam = useDebounce(param, 200)
  const client = useHttp()

  useEffect(() => {
    client('projects', {
      data: cleanObject(debounceParam),
    }).then(setList)
  }, [debounceParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      />
      <List users={users} list={list} />
    </div>
  )
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
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
