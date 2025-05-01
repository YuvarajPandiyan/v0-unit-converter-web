"use client"

import { useEffect, memo } from "react"
import { useConverterContext } from "@/context/converterContext"
import { converterConfig } from "@/config/converterConfig"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { __ } from "@/utils/i18n"

const ConverterForm = () => {
  const {
    category,
    fromUnit,
    toUnit,
    inputValue,
    convertedValue,
    categories,
    units,
    setCategory,
    setFromUnit,
    setToUnit,
    setInputValue,
    convert,
    swapUnits,
  } = useConverterContext()

  // Convert automatically when any value changes
  useEffect(() => {
    convert()
  }, [category, fromUnit, toUnit, inputValue, convert])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{__("app.title")}</CardTitle>
        <CardDescription>{__("app.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Selection */}
        <div className="space-y-2">
          <Label htmlFor="category">{__("form.category")}</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder={__("form.category")} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {__(`category.${cat}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] items-end gap-2">
          {/* From Unit */}
          <div className="space-y-2">
            <Label htmlFor="fromUnit">{__("form.from")}</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="fromUnit">
                <SelectValue placeholder={__("form.from")} />
              </SelectTrigger>
              <SelectContent>
                {units[category].map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {converterConfig[category].units[unit].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <Button variant="ghost" size="icon" className="mb-0.5" onClick={swapUnits} aria-label={__("units.swap")}>
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          {/* To Unit */}
          <div className="space-y-2">
            <Label htmlFor="toUnit">{__("form.to")}</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger id="toUnit">
                <SelectValue placeholder={__("form.to")} />
              </SelectTrigger>
              <SelectContent>
                {units[category].map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {converterConfig[category].units[unit].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Input Value */}
        <div className="space-y-2">
          <Label htmlFor="inputValue">{__("form.value")}</Label>
          <Input
            id="inputValue"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={__("form.value")}
          />
        </div>

        {/* Result */}
        <div className="space-y-2">
          <Label htmlFor="result">{__("form.result")}</Label>
          <Input id="result" value={convertedValue} readOnly className="bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const MemoizedConverterForm = memo(ConverterForm)
