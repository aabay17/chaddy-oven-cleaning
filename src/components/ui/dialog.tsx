"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DialogContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined)

const Dialog = ({ open, onOpenChange, children }: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = React.useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

interface DialogTriggerProps {
  asChild?: boolean
  children: React.ReactNode
  onClick?: () => void
  [key: string]: unknown
}

const DialogTrigger = ({ asChild, children, ...props }: DialogTriggerProps) => {
  const context = React.useContext(DialogContext)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...children.props,
      onClick: () => context?.onOpenChange(true)
    })
  }

  return (
    <button {...props} onClick={() => context?.onOpenChange(true)}>
      {children}
    </button>
  )
}

interface DialogContentProps {
  className?: string
  children: React.ReactNode
  [key: string]: unknown
}

const DialogContent = ({ className, children, ...props }: DialogContentProps) => {
  const context = React.useContext(DialogContext)

  if (!context?.open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => context.onOpenChange(false)}
      />
      <div
        className={cn(
          "relative z-50 max-w-lg w-full mx-4 bg-background p-6 rounded-lg shadow-lg",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

interface DialogHeaderProps {
  className?: string
  children: React.ReactNode
}

const DialogHeader = ({ className, children, ...props }: DialogHeaderProps) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props}>
    {children}
  </div>
)

interface DialogTitleProps {
  className?: string
  children: React.ReactNode
}

const DialogTitle = ({ className, children, ...props }: DialogTitleProps) => (
  <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
    {children}
  </h2>
)

interface DialogDescriptionProps {
  className?: string
  children: React.ReactNode
}

const DialogDescription = ({ className, children, ...props }: DialogDescriptionProps) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </p>
)

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}
