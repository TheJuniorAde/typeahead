import React, { useMemo, useState } from "react"
import "./App.css"
import {
  Typeahead,
  TypeaheadSelectedItem,
  TypeaheadSelectedItemsList,
} from "./components/Typeahead"

function App() {
  const [, setValues] = useState<TypeaheadSelectedItemsList>([])
  const [, setValue] = useState<TypeaheadSelectedItem>()

  const options = useMemo(
    () =>
      Array(1000)
        .fill(null)
        .map((_: null, index) => ({
          id: index + 1,
          label: `Value ${index + 1}`,
        })),
    []
  )

  const externalSettings = {
    external: true,
    url: "https://api.publicapis.org/entries",
    criteria: "title",
    transform: (data: {
      count: number
      entries: Array<{ API: string; Description: string }>
    }) =>
      data.entries.map((item) => ({
        id: item.API,
        label: `${item.API} - ${item.Description}`,
      })),
  }

  return (
    <div className="App">
      <Typeahead
        onChange={(newValue) => {
          setValue((newValue as TypeaheadSelectedItem) || null)
        }}
        label="Remote fetched data (no cache)"
        placeholder="custom placeholder"
        closeOnSelect
        externalSettings={externalSettings}
      />
      <Typeahead
        onChange={(newValue) => {
          setValue((newValue as TypeaheadSelectedItem) || null)
        }}
        label="Remote fetched data (cached)"
        placeholder="custom placeholder"
        cachingSettings={{
          caching: true,
        }}
        externalSettings={externalSettings}
      />
      <Typeahead
        multiple
        onChange={(newValues) => {
          setValues((newValues as TypeaheadSelectedItemsList) || [])
        }}
        label="Multiple selection"
        placeholder="custom placeholder"
        selected={[{ id: 1, label: "Value" }]}
        options={options}
      />
      <Typeahead
        onChange={(newValue) => {
          setValue((newValue as TypeaheadSelectedItem) || null)
        }}
        label="Single single selection"
        placeholder="custom placeholder"
        options={options}
      />
    </div>
  )
}

export default App
