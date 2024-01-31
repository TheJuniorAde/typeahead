export type TypeaheadDataListItem = {
  id: string | number
  label: string | number
}

export type TypeaheadSelectedItem = TypeaheadDataListItem

export type TypeaheadSelectedItemsList = TypeaheadSelectedItem[]

export type TypeaheadSelectedItems =
  | TypeaheadSelectedItem
  | TypeaheadSelectedItemsList
  | null

export type TypeaheadItems = TypeaheadDataListItem | TypeaheadDataListItem[]

export type TypeaheadDataList = TypeaheadDataListItem[]

export type TypeaheadExternalTransformCallback = (
  data: any
) => TypeaheadDataList

export interface TypeaheadExternalProps {
  external?: boolean
  url?: string
  criteria?: string
  getUrl?: (term: string) => string
  transform?: TypeaheadExternalTransformCallback
}

export interface TypeaheadCachingProps {
  caching?: boolean
  setCachedResults?: (
    term: string,
    data: TypeaheadDataList,
    currentCachedResults?: TypeaheadReducerState["cachedResults"],
    callback?: (data: TypeaheadReducerState["cachedResults"]) => void
  ) => void
  getCachedResults?: (
    term: string,
    currentCachedResults?: TypeaheadReducerState["cachedResults"]
  ) => TypeaheadDataList
}

export interface TypeaheadMenuSettingsLabels {
  fetchingResults: string
  noResultsFound: string
}

export interface TypeaheadMenuSettings {
  maxMenuHeight: number
  minItemHeight: number
  menuLabels: TypeaheadMenuSettingsLabels
}

export interface TypeaheadProps {
  cachingSettings?: TypeaheadCachingProps
  externalSettings?: TypeaheadExternalProps
  multiple?: boolean
  options?: TypeaheadDataList
  selected?: TypeaheadSelectedItems
  onChange: (value: TypeaheadSelectedItems) => void
  searchTerm?: string
  placeholder?: string
  label?: string
  menuSettings?: Partial<TypeaheadMenuSettings>
}

export interface TypeaheadReducerState {
  selectedItems: TypeaheadSelectedItems
  data: TypeaheadDataList
  term: string
  cachedResults: Map<string, TypeaheadDataList>
  activeItem: number
  show: boolean
  loading: boolean
}

export enum TypeaheadReducerActionEnum {
  REMOVE_ITEM,
  ADD_ITEM,
  UPDATE_TERM,
  SET_DATA,
  CACHE_ITEMS,
  SET_ACTIVE_ITEM,
  TOGGLE_SHOW_LIST,
  TOGGLE_LOADING,
}

export interface TypeaheadReducerAction {
  type: TypeaheadReducerActionEnum
  package?: any
}

export interface TypeaheadListItemsProps {
  data: TypeaheadDataList
  activeItem: number
  onClick: (data: TypeaheadDataListItem) => void
  selectedItems: TypeaheadSelectedItems
  multiple: boolean
  show: boolean
  inputHeight: any
  showMenu: (mustShow?: boolean) => void
  onChangeInput: (value: string) => void
  onKeyDown: (keyCode: string) => void
  term: string
  deferredTerm: string
  placeholder: string
  label: string
  onRemoveItem: (item: TypeaheadSelectedItem) => void
  setInputRef: (ref: HTMLDivElement | null) => void
  loading: boolean
  maxMenuHeight: number
  minItemHeight: number
  menuLabels: TypeaheadMenuSettingsLabels
}

export interface ItemProps {
  index: number
  activeItem: number
  item: TypeaheadDataListItem
  loading: boolean
  onClick: (item: TypeaheadDataListItem) => void
  checkIfSelected: (item: TypeaheadDataListItem) => boolean
  minItemHeight: number
}
