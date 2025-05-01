"use client"

import { memo } from "react"
import { useConverterContext } from "@/context/converterContext"
import { converterConfig } from "@/config/converterConfig"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { __ } from "@/utils/i18n"

const ConversionFormula = () => {
  const { category, fromUnit, toUnit, inputValue, convertedValue } = useConverterContext()

  // Only show formula if we have input and output values
  if (!inputValue || !convertedValue) {
    return null
  }

  // Use the getFormula method from the config
  const formula = converterConfig[category].getFormula(fromUnit, toUnit, inputValue, convertedValue)

  return (
    <Card className="mt-4 w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{__("formula.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-mono">{formula}</p>
      </CardContent>
    </Card>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const MemoizedConversionFormula = memo(ConversionFormula)
