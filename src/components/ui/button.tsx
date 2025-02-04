import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[14px] font-medium transition-colors focus:outline-purple-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:cursor-pointer shadow-none",
  {
    variants: {
      variant: {
        default:
          "text-purple-0 bg-purple-500 focus-visible:ring-purple-500 hover:text-purple-500 hover:bg-purple-100  disabled:bg-purple-50 disabled:text-purple-300 font-medium",
        destructive:
          "bg-error border-error text-purple-0 border-2	hover:border-orange-600 focus-visible:ring-error focus:outline-error hover:bg-orange-400 hover:text-purple-925",
        outline:
          "bg-purple-0 border-purple-500 text-purple-500 flex shadow-none justify-center items-center gap-2 p-1   hover:bg-purple-100 disabled:border-purple-200 disabled:bg-purple-0 max-w-min disabled:opacity-50",
        outline_ghost:
          "bg-purple-0 border-purple-500 text-purple-500 flex shadow-none justify-center items-center gap-2 p-1 hover:bg-purple-100 disabled:border-purple-200 disabled:bg-purple-0 max-w-min disabled:opacity-50 shadow-sm focus-visible:outline-none focus-visible:ring-1 border-purple-100 w-auto max-w-[62px] xl:max-w-[160px] p-2 xl:p-[15px]  rounded-lg text-[10px] sm:portrait:text-xs md:landscape:text-xs xl:text-sm 2xl:text-base font-normal text-purple-925 placeholder:text-solitude-100 focus-visible:ring-purple-500 truncate",
        secondary:
          "bg-purple-100 text-secondary-foreground shadow-sm hover:bg-purple-100/80",
        ghost: "hover:bg-purple-100 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "p-1 ",
        defaultTags: "p-1 md:p-2 w-full",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        formTrigger:
          "h-[20px]  sm:landscape:h-[20px] sm:portrait:h-[28px] md:landscape:h-[28px] md:h-[30px] xl:portrait:h-[38px] xl:landscape:h-[38px] 2xl:portrait:h-[50px] 2xl:landscape:h-[50px] md:w-max md:p-2 xl:h-[50px] ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
