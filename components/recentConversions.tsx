"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { useConverterContext } from "@/context/converterContext"
import { converterConfig } from "@/config/converterConfig"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, X } from "lucide-react"
import { __ } from "@/utils/i18n"

type RecentConversion = {
  id: string
  category: string
  fromUnit: string
  toUnit: string
  inputValue: string
  convertedValue: string
  timestamp: number
}

// Storage key for recent conversions
const RECENT_CONVERSIONS_KEY = "recent_conversions"

const RecentConversions = () => {
  const [recentConversions, setRecentConversions] = useState<RecentConversion[]>([])
  const { category, fromUnit, toUnit, inputValue, convertedValue, setCategory, setFromUnit, setToUnit, setInputValue } =
    useConverterContext()

  // Load recent conversions from localStorage on mount
  useEffect(() => {
    try {
      const savedConversions = localStorage.getItem(RECENT_CONVERSIONS_KEY)
      if (savedConversions) {
        setRecentConversions(JSON.parse(savedConversions))
      }
    } catch (error) {
      console.error("Error loading recent conversions:", error)
    }
  }, [])

  // Save a conversion when it's performed
  useEffect(() => {
    if (inputValue && convertedValue) {
      const newConversion: RecentConversion = {
        id: Date.now().toString(),
        category,
        fromUnit,
        toUnit,
        inputValue,
        convertedValue,
        timestamp: Date.now(),
      }

      // Use functional update to avoid dependency on recentConversions
      setRecentConversions((prevConversions) => {
        // Add to recent conversions, keeping only the last 5
        const updatedConversions = [
          newConversion,
          ...prevConversions.filter(
            (c) =>
              !(
                c.category === category &&
                c.fromUnit === fromUnit &&
                c.toUnit === toUnit &&
                c.inputValue === inputValue
              ),
          ),
        ].slice(0, 5)

        // Save to localStorage
        try {
          localStorage.setItem(RECENT_CONVERSIONS_KEY, JSON.stringify(updatedConversions))
        } catch (error) {
          console.error("Error saving recent conversions:", error)
        }

        return updatedConversions
      })
    }
  }, [convertedValue, category, fromUnit, toUnit, inputValue]) // Removed recentConversions from dependencies

  // Apply a recent conversion
  const applyConversion = useCallback(
    (conversion: RecentConversion) => {
      setCategory(conversion.category)
      setFromUnit(conversion.fromUnit)
      setToUnit(conversion.toUnit)
      setInputValue(conversion.inputValue)
    },
    [setCategory, setFromUnit, setToUnit, setInputValue],
  )

  // Remove a conversion from history
  const removeConversion = useCallback(
    (id: string) => {
      const updatedConversions = recentConversions.filter((c) => c.id !== id)
      setRecentConversions(updatedConversions)

      try {
        localStorage.setItem(RECENT_CONVERSIONS_KEY, JSON.stringify(updatedConversions))
      } catch (error) {
        console.error("Error saving recent conversions:", error)
      }
    },
    [recentConversions],
  )

  if (recentConversions.length === 0) {
    return null
  }

  return (
    <Card className="mt-4 w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          {__("recent.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recentConversions.map((conversion) => (
            <li key={conversion.id} className="flex justify-between items-center text-sm p-2 rounded hover:bg-muted">
              <Button
                variant="ghost"
                className="h-auto p-0 text-left justify-start font-normal w-full"
                onClick={() => applyConversion(conversion)}
              >
                <span className="truncate">
                  {conversion.inputValue} {converterConfig[conversion.category].units[conversion.fromUnit].label} ={" "}
                  {conversion.convertedValue} {converterConfig[conversion.category].units[conversion.toUnit].label}
                </span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation()
                  removeConversion(conversion.id)
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const MemoizedRecentConversions = memo(RecentConversions)
