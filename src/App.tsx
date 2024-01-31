import React, { useState } from "react"
import "./App.css"
import { Typeahead, TypeaheadSelectedItemsList } from "./components/Typeahead"

function App() {
  const [, setValues] = useState<TypeaheadSelectedItemsList>([])

  return (
    <div className="App">
      <Typeahead
        multiple
        onChange={(newValues) => {
          setValues((newValues as TypeaheadSelectedItemsList) || [])
        }}
        label="Typeahead"
        placeholder="With Custom Placeholder"
        selected={[{ id: 1, label: "Value" }]}
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
