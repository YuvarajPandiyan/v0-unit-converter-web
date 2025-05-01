// Define the converter configuration type
export type ConverterConfig = {
  [category: string]: {
    label: string
    precision: number
    units: {
      [unit: string]: {
        label: string
        toBase: (value: number) => number
        fromBase: (value: number) => number
      }
    }
    getFormula: (fromUnit: string, toUnit: string, inputValue: string, convertedValue: string) => string
  }
}

// Create the converter configuration
export const converterConfig: ConverterConfig = {
  length: {
    label: "Length",
    precision: 4,
    units: {
      meter: {
        label: "Meter (m)",
        toBase: (value: number) => value,
        fromBase: (value: number) => value,
      },
      kilometer: {
        label: "Kilometer (km)",
        toBase: (value: number) => value * 1000,
        fromBase: (value: number) => value / 1000,
      },
      centimeter: {
        label: "Centimeter (cm)",
        toBase: (value: number) => value / 100,
        fromBase: (value: number) => value * 100,
      },
      millimeter: {
        label: "Millimeter (mm)",
        toBase: (value: number) => value / 1000,
        fromBase: (value: number) => value * 1000,
      },
      inch: {
        label: "Inch (in)",
        toBase: (value: number) => value * 0.0254,
        fromBase: (value: number) => value / 0.0254,
      },
      foot: {
        label: "Foot (ft)",
        toBase: (value: number) => value * 0.3048,
        fromBase: (value: number) => value / 0.3048,
      },
      yard: {
        label: "Yard (yd)",
        toBase: (value: number) => value * 0.9144,
        fromBase: (value: number) => value / 0.9144,
      },
      mile: {
        label: "Mile (mi)",
        toBase: (value: number) => value * 1609.344,
        fromBase: (value: number) => value / 1609.344,
      },
    },
    getFormula: (fromUnit, toUnit, inputValue, convertedValue) => {
      const fromLabel = converterConfig.length.units[fromUnit].label
      const toLabel = converterConfig.length.units[toUnit].label
      return `${inputValue} ${fromLabel} = ${convertedValue} ${toLabel}`
    },
  },
  weight: {
    label: "Weight",
    precision: 4,
    units: {
      kilogram: {
        label: "Kilogram (kg)",
        toBase: (value: number) => value,
        fromBase: (value: number) => value,
      },
      gram: {
        label: "Gram (g)",
        toBase: (value: number) => value / 1000,
        fromBase: (value: number) => value * 1000,
      },
      milligram: {
        label: "Milligram (mg)",
        toBase: (value: number) => value / 1000000,
        fromBase: (value: number) => value * 1000000,
      },
      pound: {
        label: "Pound (lb)",
        toBase: (value: number) => value * 0.45359237,
        fromBase: (value: number) => value / 0.45359237,
      },
      ounce: {
        label: "Ounce (oz)",
        toBase: (value: number) => value * 0.028349523125,
        fromBase: (value: number) => value / 0.028349523125,
      },
      ton: {
        label: "Metric Ton (t)",
        toBase: (value: number) => value * 1000,
        fromBase: (value: number) => value / 1000,
      },
    },
    getFormula: (fromUnit, toUnit, inputValue, convertedValue) => {
      const fromLabel = converterConfig.weight.units[fromUnit].label
      const toLabel = converterConfig.weight.units[toUnit].label
      return `${inputValue} ${fromLabel} = ${convertedValue} ${toLabel}`
    },
  },
  temperature: {
    label: "Temperature",
    precision: 2,
    units: {
      celsius: {
        label: "Celsius (°C)",
        toBase: (value: number) => value,
        fromBase: (value: number) => value,
      },
      fahrenheit: {
        label: "Fahrenheit (°F)",
        toBase: (value: number) => (value - 32) * (5 / 9),
        fromBase: (value: number) => value * (9 / 5) + 32,
      },
      kelvin: {
        label: "Kelvin (K)",
        toBase: (value: number) => value - 273.15,
        fromBase: (value: number) => value + 273.15,
      },
    },
    getFormula: (fromUnit, toUnit, inputValue, convertedValue) => {
      if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        return `(${inputValue} °C × 9/5) + 32 = ${convertedValue} °F`
      } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        return `(${inputValue} °F - 32) × 5/9 = ${convertedValue} °C`
      } else if (fromUnit === "celsius" && toUnit === "kelvin") {
        return `${inputValue} °C + 273.15 = ${convertedValue} K`
      } else if (fromUnit === "kelvin" && toUnit === "celsius") {
        return `${inputValue} K - 273.15 = ${convertedValue} °C`
      } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
        return `(${inputValue} °F - 32) × 5/9 + 273.15 = ${convertedValue} K`
      } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
        return `(${inputValue} K - 273.15) × 9/5 + 32 = ${convertedValue} °F`
      } else {
        const fromLabel = converterConfig.temperature.units[fromUnit].label
        const toLabel = converterConfig.temperature.units[toUnit].label
        return `${inputValue} ${fromLabel} = ${convertedValue} ${toLabel}`
      }
    },
  },
  area: {
    label: "Area",
    precision: 4,
    units: {
      squareMeter: {
        label: "Square Meter (m²)",
        toBase: (value: number) => value,
        fromBase: (value: number) => value,
      },
      squareKilometer: {
        label: "Square Kilometer (km²)",
        toBase: (value: number) => value * 1000000,
        fromBase: (value: number) => value / 1000000,
      },
      squareCentimeter: {
        label: "Square Centimeter (cm²)",
        toBase: (value: number) => value / 10000,
        fromBase: (value: number) => value * 10000,
      },
      squareMillimeter: {
        label: "Square Millimeter (mm²)",
        toBase: (value: number) => value / 1000000,
        fromBase: (value: number) => value * 1000000,
      },
      acre: {
        label: "Acre",
        toBase: (value: number) => value * 4046.8564224,
        fromBase: (value: number) => value / 4046.8564224,
      },
      hectare: {
        label: "Hectare (ha)",
        toBase: (value: number) => value * 10000,
        fromBase: (value: number) => value / 10000,
      },
      squareFoot: {
        label: "Square Foot (ft²)",
        toBase: (value: number) => value * 0.09290304,
        fromBase: (value: number) => value / 0.09290304,
      },
    },
    getFormula: (fromUnit, toUnit, inputValue, convertedValue) => {
      const fromLabel = converterConfig.area.units[fromUnit].label
      const toLabel = converterConfig.area.units[toUnit].label
      return `${inputValue} ${fromLabel} = ${convertedValue} ${toLabel}`
    },
  },
  volume: {
    label: "Volume",
    precision: 4,
    units: {
      liter: {
        label: "Liter (L)",
        toBase: (value: number) => value,
        fromBase: (value: number) => value,
      },
      milliliter: {
        label: "Milliliter (mL)",
        toBase: (value: number) => value / 1000,
        fromBase: (value: number) => value * 1000,
      },
      cubicMeter: {
        label: "Cubic Meter (m³)",
        toBase: (value: number) => value * 1000,
        fromBase: (value: number) => value / 1000,
      },
      gallon: {
        label: "US Gallon (gal)",
        toBase: (value: number) => value * 3.78541178,
        fromBase: (value: number) => value / 3.78541178,
      },
      quart: {
        label: "US Quart (qt)",
        toBase: (value: number) => value * 0.946352946,
        fromBase: (value: number) => value / 0.946352946,
      },
      pint: {
        label: "US Pint (pt)",
        toBase: (value: number) => value * 0.473176473,
        fromBase: (value: number) => value / 0.473176473,
      },
      fluidOunce: {
        label: "US Fluid Ounce (fl oz)",
        toBase: (value: number) => value * 0.0295735296,
        fromBase: (value: number) => value / 0.0295735296,
      },
    },
    getFormula: (fromUnit, toUnit, inputValue, convertedValue) => {
      const fromLabel = converterConfig.volume.units[fromUnit].label
      const toLabel = converterConfig.volume.units[toUnit].label
      return `${inputValue} ${fromLabel} = ${convertedValue} ${toLabel}`
    },
  },
}
