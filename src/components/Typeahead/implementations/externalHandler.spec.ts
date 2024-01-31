import nock from "nock"
import { ExternalHandler } from "./externalHandler"
import { defaultOptions } from "../../../test-utils"
import { TypeaheadProps } from "../types"
import { waitFor } from "@testing-library/react"

describe("ExternalHandler", () => {
  it("handles external fetching correctly", async () => {
    const dispatch = jest.fn()

    nock.disableNetConnect()
    nock.enableNetConnect("127.0.0.1")

    nock("http://test.com")
      .get("/?q=term")
      .reply(200, { data: defaultOptions })
      .get("/?q=termo")
      .reply(200, defaultOptions)

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
