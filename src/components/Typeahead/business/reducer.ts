import { Reducer } from "react"
import { defaultState } from "../defaultSettings"
import {
  TypeaheadDataList,
  TypeaheadItems,
  TypeaheadProps,
  TypeaheadReducerAction,
  TypeaheadReducerActionEnum,
  TypeaheadReducerState,
  TypeaheadSelectedItemsList,
} from "../types"

const processSelectedItems = (
  isMultiple: boolean,
  items: TypeaheadItems,
  prevState: TypeaheadReducerState
): TypeaheadReducerState["selectedItems"] => {
  if (isMultiple) {
    // we set and filter the new data (removing duplicates)
    prevState.selectedItems = [
      ...((prevState.selectedItems as TypeaheadSelectedItemsList) || []),
      ...(Array.isArray(items) ? items : [items]),
    ].filter(
      (value, index, self) =>
        index === self.findIndex((item) => item.id === value.id)
    )
  } else {
    prevState.selectedItems = items
  }

  return prevState.selectedItems
}

const removeSelectedItem = (
  id: number | string,
  prevState: TypeaheadReducerState
) =>
  ((prevState.selectedItems as TypeaheadSelectedItemsList) || []).filter(
    (item) => item.id !== id
  )

/**
 * The reducer factory
 * @param {boolean} multiple
 * @returns {Reducer<
 *  TypeaheadReducerState,
 *  TypeaheadReducerAction
 * >} A react compliant reducer
 */
export const reducerFactory = ({
  multiple = false,
}: TypeaheadProps): Reducer<TypeaheadReducerState, TypeaheadReducerAction> => {
  return (prevState = defaultState, action): TypeaheadReducerState => {
    let newState = { ...prevState }

    switch (action.type) {
      case TypeaheadReducerActionEnum.ADD_ITEM:
        newState = {
          ...newState,
          selectedItems: processSelectedItems(
            multiple,
            action.package as TypeaheadItems,
            newState
          ),
          term: "",
          activeItem: 0,
        }
        break
      case TypeaheadReducerActionEnum.REMOVE_ITEM:
        newState = {
          ...newState,
          selectedItems: multiple
            ? removeSelectedItem(action.package as number | string, newState)
            : null,
          term: !multiple ? "" : newState.term,
        }
        break
      case TypeaheadReducerActionEnum.UPDATE_TERM:
        newState = {
          ...newState,
          term: action.package as string,
          selectedItems:
            !multiple && !!newState.selectedItems
              ? null
              : newState.selectedItems,
        }
        break
      case TypeaheadReducerActionEnum.SET_DATA:
        newState = { ...newState, data: action.package as TypeaheadDataList }
        break
      case TypeaheadReducerActionEnum.CACHE_ITEMS:
        newState = {
          ...newState,
          cachedResults: action.package as Map<string, TypeaheadDataList>,
        }
        break
      case TypeaheadReducerActionEnum.SET_ACTIVE_ITEM:
        newState = {
          ...newState,
          activeItem:
            !isNaN(action.package) && Number(action.package) !== -1
              ? Number(action.package)
              : 0,
        }
        break
      case TypeaheadReducerActionEnum.TOGGLE_SHOW_LIST:
        newState = {
          ...newState,
          show: !!action.package,
        }
        break
      case TypeaheadReducerActionEnum.TOGGLE_LOADING:
        newState = {
          ...newState,
          loading: !!action.package,
        }
        break
    }

    return newState
  }
}
