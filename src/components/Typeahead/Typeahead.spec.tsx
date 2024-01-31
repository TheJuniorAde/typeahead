import React from "react"
import { fireEvent, render, waitFor } from "@testing-library/react"
import { Typeahead } from "./Typeahead"
import { defaultOptions } from "../../test-utils"

describe("Typeahead", () => {
  it("renders correctly with options", async () => {
    const setValues = jest.fn()

    const { getByTestId, getAllByTestId } = render(
      <Typeahead
        onChange={(newValues) => {
          setValues(newValues)
        }}
        placeholder="With Custom Placeholder"
        selected={defaultOptions[0]}
        options={defaultOptions}
      />
    )

    await waitFor(() => expect(getByTestId("typeahead-input")).toBeTruthy())

    fireEvent.click(getByTestId("typeahead-input"))

    await waitFor(() =>
      expect(getAllByTestId("typeahead-list-item")).toBeTruthy()
    )

    expect(getAllByTestId("typeahead-list-item")).toHaveLength(4)
  })

  it("renders correctly with options and multiple selection", async () => {
    const setValues = jest.fn()

    const { getByTestId, getAllByTestId } = render(
      <Typeahead
        multiple
        onChange={(newValues) => {
          setValues(newValues)
        }}
        placeholder="With Custom Placeholder"
        selected={[defaultOptions[0]]}
        options={defaultOptions}
      />
    )

    await waitFor(() => expect(getByTestId("typeahead-input")).toBeTruthy())

    fireEvent.click(getByTestId("typeahead-input"))

    await waitFor(() =>
      expect(getAllByTestId("typeahead-list-item")).toBeTruthy()
    )

    expect(getAllByTestId("typeahead-selected-item")).toHaveLength(1)
  })

  it("clears selection", async () => {
    const setValues = jest.fn()

    const { getByTestId, getAllByTestId } = render(
      <Typeahead
        multiple
        onChange={(newValues) => {
          setValues(newValues)
        }}
        placeholder="With Custom Placeholder"
        selected={[defaultOptions[0]]}
        options={defaultOptions}
      />
    )

    await waitFor(() => expect(getByTestId("typeahead-input")).toBeTruthy())

    fireEvent.click(getByTestId("typeahead-input"))

    await waitFor(() =>
      expect(getAllByTestId("typeahead-list-item")).toBeTruthy()
    )

    fireEvent.click(
      getByTestId("typeahead-selected-item").querySelector("svg")!
    )
    expect(setValues).toHaveBeenCalledWith([])
  })

  it("calls event on change", async () => {
    const setValues = jest.fn()

    const { getByTestId, getAllByTestId } = render(
      <Typeahead
        onChange={(newValues) => {
          setValues(newValues)
        }}
        placeholder="With Custom Placeholder"
        selected={defaultOptions[0]}
        options={defaultOptions}
      />
    )

    await waitFor(() => expect(getByTestId("typeahead-input")).toBeTruthy())

    fireEvent.click(getByTestId("typeahead-input"))

    await waitFor(() =>
      expect(getAllByTestId("typeahead-list-item")).toBeTruthy()
    )

    fireEvent.click(getAllByTestId("typeahead-list-item")[1])

    expect(setValues).toHaveBeenCalledWith(defaultOptions[1])
  })
})
