import React, { useCallback, useState } from 'react'
import { useMount } from 'utils'

interface PersonProps {
  name: string
  age: number
}

export const TsReactTest = () => {
  const persons: PersonProps[] = [
    { name: 'jack', age: 25 },
    { name: 'dd', age: 34 },
  ]

  const { value, clear, removeIndex, add } = useArray(persons)

  useMount(() => {
    //console.log(value.notExist)
    //add({name:'ssss'})
    //removeIndex("123")
  })

  return (
    <div>
      <button
        onClick={() => {
          add({ name: 'test', age: 34 })
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          removeIndex(0)
        }}
      >
        Remove first
      </button>
      <button
        onClick={() => {
          clear()
        }}
      >
        Clear
      </button>
      <ul>
        {value.map(({ name, age }, i) => {
          return (
            <li key={i}>
              {i} - {name} - {age}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const useArray = <T,>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)

  const add = useCallback(
    (item: T) => {
      setValue([...value, item])
    },
    [value],
  )

  const removeIndex = useCallback(
    (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    },
    [value],
  )

  const clear = useCallback(() => {
    setValue([])
  }, [])

  return {
    value,
    clear,
    removeIndex,
    add,
  }
}
