import React from "react"
import { CachingHandler } from "./implementations/cachingHandler"
import {
  TypeaheadCachingProps,
  TypeaheadDataList,
  TypeaheadExternalProps,
  TypeaheadListItemsProps,
  TypeaheadMenuSettings,
  TypeaheadReducerState,
} from "./types"

export const inputStyles: Record<string, React.CSSProperties> = {
  root: {
    flexWrap: "wrap",
    padding: 8,
  },
  input: {
    width: 0,
    minWidth: 30,
    flexGrow: 1,
    padding: "8px !important",
  },
}

export const defaultCachingSettings: TypeaheadCachingProps = {
  caching: false,
  setCachedResults: (term, data, currentCachedResults, callback) =>
    CachingHandler.setCache(term, data, currentCachedResults, callback),
  getCachedResults: (term, currentCachedResults) =>
    CachingHandler.getCache(term, currentCachedResults),
}

export const defaultExternalSettings: TypeaheadExternalProps = {
  external: false,
  url: "",
  criteria: "",
}

export const defaultState: TypeaheadReducerState = {
  selectedItems: null,
  data: [],
  term: "",
  cachedResults: new Map<string, TypeaheadDataList>(),
  activeItem: 0,
  show: false,
  loading: false,
}

export const defaultMenuSettings: TypeaheadMenuSettings = {
  maxMenuHeight: 320,
  minItemHeight: 40,
  menuLabels: {
    fetchingResults: "Fetching results",
    noResultsFound: "No results found",
  },
}

export const defaultTypeaheadContext: TypeaheadListItemsProps = {
  show: false,
  activeItem: 0,
  data: [],
  onClick: (_data) => null,
  selectedItems: null,
  multiple: false,
  inputHeight: null,
  showMenu: () => null,
  onKeyDown: () => null,
  onChangeInput: () => null,
  term: "",
  deferredTerm: "",
  label: "",
  placeholder: "",
  onRemoveItem: () => null,
  setInputRef: () => null,
  loading: false,
  ...defaultMenuSettings,
}

export const keyDownAllowedCodes = [
  "Enter",
  "NumpadEnter",
  "ArrowDown",
  "ArrowUp",
  "Backspace",
  "Escape",
]
