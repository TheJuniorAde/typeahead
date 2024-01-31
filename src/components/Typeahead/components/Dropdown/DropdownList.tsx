import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react"

import { TypeaheadContext } from "../../Typeahead"
import { TypeaheadDataList, TypeaheadDataListItem } from "../../types"
import { DropdownListItem } from "./DropdownListItem"
import {
  getItems,
  getDropdownStyles,
  getListStyles,
} from "../../business/utils"
import { List } from "../List"

import "./DropdownList.css"

/**
 * The pop-up list component
 */
export const DropdownList: React.FC = () => {
  const {
    activeItem,
    onClick,
    selectedItems,
    multiple,
    show,
    inputHeight,
    loading,
    maxMenuHeight,
    minItemHeight,
  } = useContext(TypeaheadContext)

  const [mustResize, setMustResize] = useState(false)

  const checkIfSelected = useCallback(
    (item: TypeaheadDataListItem) => {
      const currentData: TypeaheadDataList = getItems(selectedItems, multiple)

      return (
        currentData
          .filter((dataItem) => dataItem && dataItem.id !== -1)
          .findIndex((dataItem) => dataItem.id === item.id) !== -1
      )
    },
    [selectedItems, multiple]
  )

  const renderRow = (item: TypeaheadDataListItem, index: number) => (
    <DropdownListItem
      index={index}
      item={item}
      activeItem={activeItem}
      loading={loading}
      onClick={onClick}
      checkIfSelected={checkIfSelected}
      key={`list-item-${index}`}
      minItemHeight={minItemHeight}
    />
  )

  // when the current active item is changed (through keyDown events), we must scroll the list to show it to the screen
  useEffect(() => {
    const el = document.getElementById(`list-item-${activeItem}`)

    // @ts-ignore
    // As implementing a full blown virtualised list could be too problematic for this test,
    // I've decided to use this small snippet, where it scrolls to the item when navigating with the keyboard
    // WARNING: does not work with firefox and firefox mobile
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
    if (el?.scrollIntoViewIfNeeded)
      //@ts-ignore
      el?.scrollIntoViewIfNeeded(false)
  }, [activeItem])

  // size calculations happens very fast, and sometimes the component does not re-render the resized list properly. So, we force it to
  useLayoutEffect(() => {
    mustResize && setMustResize(!mustResize)
  }, [mustResize])

  return (
    <div
      className="dropdown-list-root"
      style={getDropdownStyles(show, inputHeight)}
    >
      <div
        className="dropdown-list-container"
        style={{ maxHeight: maxMenuHeight }}
      >
        <List style={getListStyles(maxMenuHeight)} renderRow={renderRow} />
      </div>
    </div>
  )
}
