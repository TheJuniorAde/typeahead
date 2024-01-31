import {
  TypeaheadCachingProps,
  TypeaheadExternalProps,
  TypeaheadMenuSettings,
  TypeaheadSelectedItems,
} from "../types"

export const getErrorTag = (value: string) => `[TypeaheadError]:[${value}]`

export const validateMenuSettingsConstraint = (
  props: TypeaheadMenuSettings
) => {
  if (props.maxMenuHeight === 0 || props.minItemHeight === 0) {
    throw new Error(
      `${getErrorTag(
        "menuSettings"
      )}: neither 'maxMenuHeight' nor 'minItemHeight' can be less than 1`
    )
  }

  if (props.minItemHeight > props.maxMenuHeight) {
    throw new Error(
      `${getErrorTag(
        "menuSettings"
      )}: 'minItemHeight' must not be higher than 'maxMenuHeight'`
    )
  }

  if (
    props.menuLabels &&
    (!props.menuLabels.fetchingResults.trim() ||
      !props.menuLabels.noResultsFound.trim())
  ) {
    throw new Error(
      `${getErrorTag(
        "menuSettings"
      )}: neither 'menuLabels.fetchingResults' nor 'menuLabels.noResultsFound' can be an empty string`
    )
  }
}

export const validateSelectedItemsConstraint = (
  isMultiple: boolean,
  selectedItems: TypeaheadSelectedItems
) => {
  if (isMultiple && selectedItems && !Array.isArray(selectedItems)) {
    throw new Error(
      `${getErrorTag(
        "selected"
      )}: when 'multiple' is true, 'selected' must be an array`
    )
  }

  if (!isMultiple && selectedItems && Array.isArray(selectedItems)) {
    throw new Error(
      `${getErrorTag(
        "selected"
      )}: when 'multiple' is false, 'selected' must be an object`
    )
  }
}

export const validateExternalSourceConstraints = (
  isExternal: boolean,
  props: TypeaheadExternalProps
) => {
  if (isExternal) {
    if (!props.url && !props.getUrl) {
      throw new Error(
        `${getErrorTag(
          "externalSettings"
        )}: when 'externalSettings.external' is true, either 'externalSettings.url' OR 'externalSettings.getUrl' must be set`
      )
    }

    if ((!props.criteria || props.criteria === "") && !!props.url) {
      throw new Error(
        `${getErrorTag(
          "externalSettings"
        )}: when 'externalSettings.external' is true and 'externalSettings.url' is informed, 'externalSettings.criteria' must be informed`
      )
    }

    if (!props.transform) {
      throw new Error(
        `${getErrorTag(
          "externalSettings"
        )}: when 'externalSettings.external' is true, 'externalSettings.transform' must be informed`
      )
    }
  }
}

export const validateCachingConstraints = (
  isCachingEnabled: boolean,
  props: TypeaheadCachingProps
) => {
  if (isCachingEnabled) {
    if (
      (!props.getCachedResults && props.setCachedResults) ||
      (props.getCachedResults && !props.setCachedResults)
    ) {
      throw new Error(
        `${getErrorTag(
          "cachingSettings"
        )}: when 'cachingSettings.caching' is true and either 'cachingSettings.getChachedResults' or 'cachingSettings.setChachedResults' are set, you must provide the implementation to both functions`
      )
    }
  }
}
