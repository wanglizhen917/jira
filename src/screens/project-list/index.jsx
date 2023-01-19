/* eslint-disable no-undef */
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useState, useEffect } from 'react'
import { cleanObject } from 'utils'
import qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })

  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const debounceParam = useDebounce(param, 2000)

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(
        cleanObject(debounceParam),
      )}`,
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debounceParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
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

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebouncedValue] = useState([])

  useEffect(() => {
    const timeout = setTimeout(
      () => setDebouncedValue(value),
      delay,
    )
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue
}
