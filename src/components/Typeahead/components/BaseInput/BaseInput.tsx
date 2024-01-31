import React, { useContext, useId } from "react"

import { TypeaheadContext } from "../../Typeahead"
import { InputEndAdornment, InputStartAdornment } from "./Adornments"
import { inputStyles, keyDownAllowedCodes } from "../../defaultSettings"
import { getCurrentValue } from "../../business/utils"

import "./BaseInput.css"

/**
 * The base input for the typeahead component (basically a text field with many listeners)
 */
export const BaseInput: React.FC = () => {
  const {
    onChangeInput,
    show,
    showMenu,
    onKeyDown,
    multiple,
    term,
    selectedItems,
    label,
    placeholder,
    setInputRef,
  } = useContext(TypeaheadContext)

  const inputId = useId()

  const handleKeyDown = (code: string) => {
    if (show && code === "Escape") {
      showMenu(false)
    } else if (!show && code !== "Escape") {
      showMenu(true)
    }

    if (keyDownAllowedCodes.includes(code)) {
      onKeyDown(code)
    }
  }

  return (
    <div
      className="base-input-root"
      style={inputStyles.root}
      ref={(newRef) => setInputRef(newRef)}
    >
      <label htmlFor={inputId}>{label}</label>
      <div className="base-input-text-field">
        <InputStartAdornment />
        <input
          type="text"
          id={inputId}
          onChange={(event) => {
            onChangeInput(event.target.value)
          }}
          key="typeahead-input"
          style={inputStyles.input}
          onKeyDown={(event) => {
            handleKeyDown(event.code)
          }}
          value={getCurrentValue(multiple, term, selectedItems)}
          onClick={(event) => {
            showMenu(!!event.currentTarget)
          }}
          placeholder={placeholder}
          autoComplete="off"
          data-testid="typeahead-input"
        />
        <InputEndAdornment />
      </div>
    </div>
  )
}
