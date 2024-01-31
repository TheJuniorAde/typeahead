import { useCallback, useReducer } from "react"
import { defaultState } from "../defaultSettings"
import { reducerFactory } from "./reducer"
import {
  TypeaheadDataList,
  TypeaheadProps,
  TypeaheadReducerActionEnum,
  TypeaheadSelectedItem,
  TypeaheadSelectedItems,
  TypeaheadSelectedItemsList,
} from "../types"
import { ExternalHandler } from "../implementations/externalHandler"
import { useTextDebounce } from "./useTextDebounce"

/**
 * The main hook for the typeahead component. It holds most of the logic for changes, data filtering, caching and data fetching
 * @param {TypeaheadProps} memoizedProps
 * @returns a bunch of data (see the examples)
 * @example
 * const {
 *   onChangeInput, // the callback for the base input
 *   showMenu, // a utility to toggle the menu
 *   onChangeCallback, // the callback for the selection
 *   onRemoveItem, // the callback for the removal of an item
 *   onKeyDown, // the main handler of keyboard events (mostly related to scrolling and removing of items)
 *   filterData, // the function to filter the data available to the list
 *   selectedItems, // it can be a single item or an array of items
 *   term, // the typed search
 *   show, // the typeahead is displayed
 *   data, // the typeahead data
 *   activeItem, // the current highlighted item
 *   multiple, // the typeahead is a multiple selection?
 *   label, // the label of the input component
 *   placeholder, // the placeholder of the input component
 *   loading, // the typeahead is fetching data?
 *   deferredTerm, // for performance reasons, we defer the term, so the renders doesn't block the application
 *   maxMenuHeight, // the typeahead max menu height
 *   minItemHeight, // the typeahead min item height
 *   menuLabels, // the texts for fetching data and no results found
 * } = useTypeahead(memoizedProps)
 */
export const useTypeahead = (memoizedProps: TypeaheadProps) => {
  const {
    label = "",
    placeholder = "",
    multiple = false,
    menuSettings,
  } = memoizedProps
  const [
    { selectedItems, data, term, cachedResults, activeItem, show, loading },
    dispatch,
  ] = useReducer(reducerFactory(memoizedProps), {
    ...defaultState,
    selectedItems: memoizedProps.selected as TypeaheadSelectedItems,
    term: String(memoizedProps.searchTerm),
    data: memoizedProps.options as TypeaheadDataList,
  })

  const deferredTerm = useTextDebounce(term, 500)

  const onChangeInput = useCallback((value: string) => {
    dispatch({
      type: TypeaheadReducerActionEnum.UPDATE_TERM,
      package: value,
    })
  }, [])

  const showMenu = useCallback(
    (mustShow = false) =>
      dispatch({
        type: TypeaheadReducerActionEnum.TOGGLE_SHOW_LIST,
        package: mustShow,
      }),
    []
  )

  const onChangeCallback = useCallback((newValue: TypeaheadSelectedItems) => {
    dispatch({
      type: TypeaheadReducerActionEnum.ADD_ITEM,
      package: newValue,
    })
  }, [])

  const onRemoveItem = useCallback(
    (item: TypeaheadSelectedItem) => {
      dispatch({
        type: TypeaheadReducerActionEnum.REMOVE_ITEM,
        package: item.id,
      })

      !memoizedProps.multiple && showMenu(false)
    },
    [memoizedProps.multiple, showMenu]
  )

  const onKeyDown = useCallback(
    (keyCode: string) => {
      let newActiveItem = null

      // if it's a `multiple` typeahead we must delete the last selected item if backspace is hit and no content exists inside `term`
      if (
        keyCode === "Backspace" &&
        memoizedProps.multiple &&
        (selectedItems as TypeaheadSelectedItemsList).length > 0 &&
        term.length === 0
      ) {
        onRemoveItem((selectedItems as TypeaheadSelectedItemsList).pop()!)
      } else if (["Enter", "NumpadEnter"].includes(keyCode)) {
        onChangeCallback(data[activeItem])
        showMenu(false)
      } else if (keyCode === "ArrowUp" && activeItem >= 0) {
        newActiveItem = (activeItem === 0 ? data.length : activeItem) - 1
      } else if (keyCode === "ArrowDown" && activeItem + 1 < data.length) {
        newActiveItem = activeItem + 1
      }

      dispatch({
        type: TypeaheadReducerActionEnum.SET_ACTIVE_ITEM,
        package: newActiveItem || 0,
      })
    },
    [
      activeItem,
      data,
      onChangeCallback,
      showMenu,
      term,
      selectedItems,
      memoizedProps.multiple,
      onRemoveItem,
    ]
  )

  /**
   * The function that filters all the data based on the term typed.
   * If the settings allow, the function loads the cached results and searches for the entry that matches the new `term`.
   * If the settings allow, the function loads the data from the external api provided to the component.
   * In the end, if the settings allow, we cache the data
   */
  const filterData = useCallback(
    async (newTerm: string) => {
      const trimmedTerm = newTerm.trim()

      let newData: TypeaheadDataList = []

      // we do not cache data if `options` is provided for the component
      if (
        memoizedProps.cachingSettings!.caching &&
        memoizedProps.options!.length === 0
      ) {
        newData = memoizedProps.cachingSettings!.getCachedResults!(
          trimmedTerm,
          cachedResults
        )
      } else {
        newData = memoizedProps.options!.filter((item) =>
          String(item.label).toLowerCase().includes(trimmedTerm.toLowerCase())
        )
      }

      // we only want to fetch new data if no cached results exist
      if (memoizedProps.externalSettings!.external && newData.length === 0) {
        newData = await ExternalHandler.fetchData(
          dispatch,
          memoizedProps,
          newTerm
        )
      }

      dispatch({
        type: TypeaheadReducerActionEnum.SET_DATA,
        package: newData,
      })

      if (memoizedProps.cachingSettings!.caching) {
        memoizedProps.cachingSettings!.setCachedResults!(
          newTerm,
          newData,
          cachedResults,
          (newCache) => {
            dispatch({
              type: TypeaheadReducerActionEnum.CACHE_ITEMS,
              package: newCache,
            })
          }
        )
      }
    },
    [memoizedProps, cachedResults]
  )

  return {
    onChangeInput,
    showMenu,
    onChangeCallback,
    onRemoveItem,
    onKeyDown,
    filterData,
    selectedItems,
    term,
    show,
    data,
    activeItem,
    multiple,
    label,
    placeholder,
    loading,
    deferredTerm,
    maxMenuHeight: menuSettings!.maxMenuHeight!,
    minItemHeight: menuSettings!.minItemHeight!,
    menuLabels: menuSettings!.menuLabels!,
  }
}
