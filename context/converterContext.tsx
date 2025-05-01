"use client"

import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from "react"
import { converterConfig } from "@/config/converterConfig"

// Define types for our context
type ConverterContextType = {
  category: string
  fromUnit: string
  toUnit: string
  inputValue: string
  convertedValue: string
  categories: string[]
  units: { [key: string]: string[] }
  setCategory: (category: string) => void
  setFromUnit: (unit: string) => void
  setToUnit: (unit: string) => void
  setInputValue: (value: string) => void
  convert: () => void
  swapUnits: () => void
}

// Create the context with default values
const ConverterContext = createContext<ConverterContextType | undefined>(undefined)

// Custom hook to use the context
export const useConverterContext = () => {
  const context = useContext(ConverterContext)
  if (!context) {
    throw new Error("useConverterContext must be used within a ConverterProvider")
  }
  return context
}

// Storage key for persisting state
const STORAGE_KEY = "converter_state"

// Provider component
export const ConverterProvider = ({ children }: { children: ReactNode }) => {
  // Extract categories and units from config
  const categories = useMemo(() => Object.keys(converterConfig), [])
  const units = useMemo(
    () => Object.fromEntries(categories.map((category) => [category, Object.keys(converterConfig[category].units)])),
    [categories],
  )

  // Initialize state with default values
  const [category, setCategory] = useState(categories[0])
  const [fromUnit, setFromUnit] = useState("")
  const [toUnit, setToUnit] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [convertedValue, setConvertedValue] = useState("")

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY)
      if (savedState) {
        const parsedState = JSON.parse(savedState)
        setCategory(parsedState.category || categories[0])
        setFromUnit(parsedState.fromUnit || "")
        setToUnit(parsedState.toUnit || "")
        setInputValue(parsedState.inputValue || "")
      }
    } catch (error) {
      console.error("Error loading saved state:", error)
    }
  }, [categories])

  // Initialize units when category changes or on first load
  useEffect(() => {
    if (!fromUnit || !units[category].includes(fromUnit)) {
      setFromUnit(units[category][0])
    }
    if (!toUnit || !units[category].includes(toUnit)) {
      setToUnit(units[category][1])
    }
  }, [category, fromUnit, toUnit, units])

  // Save state to localStorage when it changes
  useEffect(() => {
    if (category && fromUnit && toUnit) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            category,
            fromUnit,
            toUnit,
            inputValue,
          }),
        )
      } catch (error) {
        console.error("Error saving state:", error)
      }
    }
  }, [category, fromUnit, toUnit, inputValue])

  // Conversion function
  const convert = useCallback(() => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setConvertedValue("")
      return
    }

    const value = Number.parseFloat(inputValue)
    const categoryConfig = converterConfig[category]

    // Get conversion functions
    const fromUnitConfig = categoryConfig.units[fromUnit]
    const toUnitConfig = categoryConfig.units[toUnit]

    // Convert from source unit to base unit, then from base unit to target unit
    const baseValue = fromUnitConfig.toBase(value)
    const result = toUnitConfig.fromBase(baseValue)

    // Format the result based on the category's precision
    setConvertedValue(result.toFixed(categoryConfig.precision))
  }, [category, fromUnit, toUnit, inputValue])

  // Swap units function
  const swapUnits = useCallback(() => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }, [fromUnit, toUnit])

  // Update category with proper state management
  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      setCategory(newCategory)
      setFromUnit(units[newCategory][0])
      setToUnit(units[newCategory][1])
      setConvertedValue("")
    },
    [units],
  )

  // Value object to be provided by the context
  const value = useMemo(
    () => ({
      category,
      fromUnit,
      toUnit,
      inputValue,
      convertedValue,
      categories,
      units,
      setCategory: handleCategoryChange,
      setFromUnit,
      setToUnit,
      setInputValue,
      convert,
      swapUnits,
    }),
    [
      category,
      fromUnit,
      toUnit,
      inputValue,
      convertedValue,
      categories,
      units,
      handleCategoryChange,
      convert,
      swapUnits,
    ],
  )

  return <ConverterContext.Provider value={value}>{children}</ConverterContext.Provider>
}
