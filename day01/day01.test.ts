import { it, expect } from "vitest"
import { extractDigits, extractDigitsWithText, getValues } from "./day01"

it("extracts first and last digits from a line", () => {
    expect(extractDigits("pqr3stu8vwx")).toBe(38)
    expect(extractDigits("treb7uchet")).toBe(77)
})

it("sums all first and last digits", () => {
    const testData = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"]
    expect(getValues(testData)).toBe(142)
})

it("extracts first and last strings or digits", () => {
    expect(extractDigitsWithText("two1nine")).toBe(29)
    expect(extractDigitsWithText("eightwothree")).toBe(83)
    expect(extractDigitsWithText("4nineeightseven2")).toBe(42)
    expect(extractDigitsWithText("zoneight234")).toBe(14)
    expect(extractDigitsWithText("four13")).toBe(43)
    expect(extractDigitsWithText("89qcgfqtsdcmktmctwo2seven9tqlbffgrjg")).toBe(89)
    expect(extractDigitsWithText("8five6")).toBe(86)
    expect(extractDigitsWithText("4three3")).toBe(43)
    expect(extractDigitsWithText("59twosplbcrzmgtdrjmrhmhthreetwo4")).toBe(54)
    expect(extractDigitsWithText("dlm538nine")).toBe(59)
    expect(extractDigitsWithText("nineight7")).toBe(97)
    expect(extractDigitsWithText("nineight")).toBe(98)
    expect(extractDigitsWithText("oneight")).toBe(18)
})

it("replaces strings with digits and sums them", () => {
    const testData = [
        "two1nine",
        "eightwothree",
        "abcone2threexyz",
        "xtwone3four",
        "4nineeightseven2",
        "zoneight234",
        "7pqrstsixteen",
    ]

    expect(getValues(["two1nine"], true)).toBe(29)
    expect(getValues(["eightwothree"], true)).toBe(83)
    expect(getValues(["abcone2threexyz"], true)).toBe(13)
    expect(getValues(["xtwone3four"], true)).toBe(24)
    expect(getValues(["4nineeightseven2"], true)).toBe(42)
    expect(getValues(["zoneight234"], true)).toBe(14)
    expect(getValues(["7pqrstsixteen"], true)).toBe(76)

    expect(getValues(testData, true)).toBe(281)
})
