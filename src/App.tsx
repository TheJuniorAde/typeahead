import React, { useState } from "react"
import "./App.css"
import {
  Typeahead,
  TypeaheadSelectedItem,
  TypeaheadSelectedItemsList,
} from "./components/Typeahead"

function App() {
  const [, setValues] = useState<TypeaheadSelectedItemsList>([])
  const [, setValue] = useState<TypeaheadSelectedItem>()

  return (
    <div className="App">
      <Typeahead
        multiple
        onChange={(newValues) => {
          setValues((newValues as TypeaheadSelectedItemsList) || [])
        }}
        label="Multiple"
        placeholder="custom placeholder"
        selected={[{ id: 1, label: "Value" }]}
        options={Array(1000)
          .fill(null)
          .map((_: null, index) => ({
            id: index + 1,
            label: `Value ${index + 1}`,
          }))}
      />
      <Typeahead
        onChange={(newValue) => {
          setValue((newValue as TypeaheadSelectedItem) || null)
        }}
        label="Single"
        placeholder="custom placeholder"
        options={Array(1000)
          .fill(null)
          .map((_: null, index) => ({
            id: index + 1,
            label: `Value ${index + 1}`,
          }))}
      />
    </div>
  )
}

export default App
