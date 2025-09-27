"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectContextType {
  value?: string
  onValueChange?: (value: string) => void
}

const SelectContext = React.createContext<SelectContextType>({})

const Select = ({ value, onValueChange, required, children }: {
  value?: string
  onValueChange?: (value: string) => void
  required?: boolean
  children: React.ReactNode
}) => {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      {children}
    </SelectContext.Provider>
  )
}

const SelectTrigger = ({ className, children }: {
  className?: string
  children: React.ReactNode
}) => (
  <div className={cn("relative", className)}>
    {children}
  </div>
)

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const context = React.useContext(SelectContext)

  return (
    <select
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      value={context.value || ""}
      onChange={(e) => context.onValueChange?.(e.target.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      <option value="single-oven">Single Oven Cleaning</option>
      <option value="double-oven">Double Oven Cleaning</option>
      <option value="commercial">Commercial Oven Cleaning</option>
      <option value="cooktop">Cooktop & Range Cleaning</option>
      <option value="move-out">Move-Out Cleaning</option>
      <option value="maintenance">Maintenance Package</option>
    </select>
  )
}

const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <option value={value}>{children}</option>
)

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
