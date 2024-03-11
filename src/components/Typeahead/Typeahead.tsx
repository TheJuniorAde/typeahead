import React, { useEffect, useMemo, useRef, useTransition } from "react"
import { TypeaheadProps } from "./types"
import {
  validateCachingConstraints,
  validateExternalSourceConstraints,
  validateMenuSettingsConstraint,
  validateSelectedItemsConstraint,
} from "./business/constraints"
import {
  defaultCachingSettings,
  defaultExternalSettings,
  defaultMenuSettings,
  defaultTypeaheadContext,
} from "./defaultSettings"
import { useTypeahead } from "./business/useTypeahead"
import { ClickOutHandler } from "../ClickOutHandler/ClickOutHandler"
import { DropdownList } from "./components/Dropdown"
import { BaseInput } from "./components/BaseInput"

import "./Typeahead.css"

/**
 * The main context for the component. It holds all the props needed in the list and the input
 */
export const TypeaheadContext = React.createContext(defaultTypeaheadContext)

/**
 * A simple and lightweight typeahead component
 * @param {TypeaheadProps} props
 * @example
 * // with `multiple`
 * <Typeahead
 *   multiple
 *   onChange={(newValues) => {
 *     setValues((newValues as TypeaheadSelectedItemsList) || []);
 *   }}
 *   placeholder="With Custom Placeholder"
 *   selected={[{ id: 1, label: "Value" }]}
 *   options={[{ id: 1, label: "Value" }, { id: 2, label: "Value 2" }]}
 *  />
 * // with caching and external data
 * <Typeahead
 *   onChange={(newValues) => {
 *     setValue((newValues as TypeaheadSelectedItem) || null);
 *   }}
 *   cachingSettings={{ caching: true }}
 *   externalSettings={{
 *     external: true,
 *     url: "https://api.publicapis.org/entries",
 *     criteria: "title",
 *     transform,
 *   }}
 *   label="With caching and external api requests"
 * />
 */
export const Typeahead: React.FC<TypeaheadProps> = ({
  cachingSettings = defaultCachingSettings,
  externalSettings = defaultExternalSettings,
  multiple = false,
  closeOnSelect = false,
  options = [],
  selected = multiple ? [] : undefined,
  onChange,
  searchTerm = "",
  label = "",
  placeholder = "",
  menuSettings = defaultMenuSettings,
}) => {
  const [, startTransition] = useTransition()

  const inputRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // holds the transformed props in a memoized state
  const memoizedProps = useMemo(
    () => ({
      cachingSettings: {
        ...defaultCachingSettings,
        ...(cachingSettings ?? {}),
      },
      externalSettings: {
        ...defaultExternalSettings,
        ...(externalSettings ?? {}),
      },
      menuSettings: {
        ...defaultMenuSettings,
        ...(menuSettings ?? {}),
        menuLabels: {
          ...defaultMenuSettings.menuLabels,
          ...(menuSettings.menuLabels ?? {}),
        },
      },
      multiple,
      options,
      selected,
      onChange,
      searchTerm,
      label,
      placeholder,
    }),
    [
      cachingSettings,
      externalSettings,
      multiple,
      options,
      selected,
      onChange,
      searchTerm,
      label,
      placeholder,
      menuSettings,
    ]
  )

  useEffect(() => {
    // we check for all the constraints that apply
    validateSelectedItemsConstraint(
      memoizedProps.multiple,
      memoizedProps.selected!
    )
    validateCachingConstraints(
      memoizedProps.cachingSettings.caching!,
      memoizedProps.cachingSettings
    )
    validateExternalSourceConstraints(
      memoizedProps.externalSettings.external!,
      memoizedProps.externalSettings
    )
    validateMenuSettingsConstraint(memoizedProps.menuSettings)
  }, [
    memoizedProps.menuSettings,
    memoizedProps.multiple,
    memoizedProps.selected,
    memoizedProps.cachingSettings,
    memoizedProps.externalSettings,
  ])

  const typeahead = useTypeahead(memoizedProps)

  useEffect(() => {
    startTransition(() => {
      memoizedProps.onChange(typeahead.selectedItems)

      if (!multiple && closeOnSelect) typeahead.showMenu(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeahead.selectedItems])

  useEffect(() => {
    startTransition(() => {
      typeahead.filterData(typeahead.deferredTerm)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeahead.deferredTerm])

  // when the current active item is changed (through keyDown events), we must scroll the list to show it to the screen
  useEffect(() => {
    if (!containerRef.current || !typeahead.activeItem) return

    const el = containerRef.current.querySelector(
      `#list-item-${typeahead.activeItem}`
    )

    // @ts-ignore
    // As implementing a full blown virtualised list could be too problematic for this test,
    // I've decided to use this small snippet, where it scrolls to the item when navigating with the keyboard
    // WARNING: does not work with firefox and firefox mobile
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
    if (el?.scrollIntoViewIfNeeded)
      //@ts-ignore
      el?.scrollIntoViewIfNeeded(false)
  }, [typeahead.activeItem])

  return (
    <ClickOutHandler
      onClickOut={() => {
        typeahead.showMenu(false)
      }}
    >
      <div style={{ position: "relative" }} ref={containerRef}>
        <TypeaheadContext.Provider
          value={{
            ...typeahead,
            onClick: typeahead.onChangeCallback,
            inputHeight: inputRef.current?.offsetHeight,
            setInputRef: (ref) => (inputRef.current = ref),
          }}
        >
          <BaseInput key="typeahead-root-input" />
          <DropdownList key="typeahead-list" />
        </TypeaheadContext.Provider>
      </div>
    </ClickOutHandler>
  )
}
