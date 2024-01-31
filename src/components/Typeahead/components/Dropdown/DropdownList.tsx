import React, { useCallback, useContext } from "react"

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
