import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
  'active:scale-95 inline-flex items-center selected:bg-red-500 focus-visible:ring-2 ring-slate-500 justify-center rounded-md text-sm font-medium transition-colors focus:outline-none  disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900',
  {
    variants: {
      variant: {
        default:
          'bg-zinc-200 text-slate-900 hover:bg-zinc-100',
        destructive: 'text-white hover:bg-red-600 dark:hover:bg-red-600',
        danger: 'text-white bg-yellow-500 ',
        outline:
          'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 outline outline-1 outline-zinc-300',
        subtle:
          'hover:bg-zinc-200 bg-zinc-100 text-zinc-900',
        ghost:
          'bg-transparent dark:hover:bg-neutral-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 data-[state=open]:bg-transparent data-[state=open]:bg-transparent',
        link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent',
        cta: 'bg-[#ffd12b] hover:bg-[#ffd12b]/90 text-black font-semibold'
      },
      size: {
        default: 'h-9 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        xs: 'h-8 px-1.5 rounded-sm',
        lg: 'h-11 px-8 rounded-md',
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}>
        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }