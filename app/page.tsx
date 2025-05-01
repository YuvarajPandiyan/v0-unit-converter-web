import { ConverterProvider } from "@/context/converterContext"
import { MemoizedConverterForm } from "@/components/converterForm"
import { MemoizedConversionFormula } from "@/components/conversionFormula"
import { MemoizedRecentConversions } from "@/components/recentConversions"
import { MemoizedThemeToggle } from "@/components/themeToggle"
import { __ } from "@/utils/i18n"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <MemoizedThemeToggle />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">{__("app.title")}</h1>
        <ConverterProvider>
          <div className="space-y-4">
            <MemoizedConverterForm />
            <MemoizedConversionFormula />
            <MemoizedRecentConversions />
          </div>
        </ConverterProvider>
      </div>
    </main>
  )
}
