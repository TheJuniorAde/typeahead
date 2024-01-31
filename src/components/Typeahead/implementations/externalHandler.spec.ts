import { ExternalHandler } from "./externalHandler"
import { defaultOptions } from "../../../test-utils"
import { TypeaheadProps } from "../types"
import { waitFor } from "@testing-library/react"
import { FetchMock } from "jest-fetch-mock"

describe("ExternalHandler", () => {
  beforeEach(() => {
    ;(fetch as FetchMock).resetMocks()
  })
  it("handles external fetching correctly", async () => {
    const dispatch = jest.fn()

    ;(fetch as FetchMock).mockResponseOnce(
      JSON.stringify({ data: defaultOptions })
    )

    const result = await ExternalHandler.fetchData(
      dispatch,
      {
        externalSettings: {
          criteria: "q",
          url: "http://test.com/",
          transform: (data) => data.data,
        },
      } as TypeaheadProps,
      "term"
    )

    expect(result).toEqual(defaultOptions)
    ;(fetch as FetchMock).mockResponseOnce(JSON.stringify(defaultOptions))

    const result2 = await ExternalHandler.fetchData(
      dispatch,
      {
        externalSettings: {
          getUrl: (term) => `http://test.com/?q=${term}`,
        },
      } as TypeaheadProps,
      "termo"
    )

    expect(result2).toEqual(defaultOptions)

    jest.spyOn(console, "error")

    await ExternalHandler.fetchData(
      dispatch,
      {
        externalSettings: {
          criteria: "q",
          url: "http://tests.com/",
          transform: (data) => data.data,
        },
      } as TypeaheadProps,
      "term"
    )

    await waitFor(() => expect(console.error).toHaveBeenCalled())
  })
})
