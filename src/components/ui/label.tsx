import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        uploadLabel:
          "flex flex-col items-center justify-center xl:h-[150px] border-2 border-dashed rounded-xl font-medium text-[10px] sm:portrait:text-xs md:landscape:text-xs xl:text-sm 2xl:text-base  font-normal border-purple-100 hover:border-purple-500 hover:cursor-pointer w-full p-3 text-center",
        filterLabel:
          "flex flex-col gap-[4px] text-[10px] sm:portrait:text-xs md:landscape:text-xs xl:text-sm 2xl:text-base ",
        default: "flex gap-0.5 text-base  ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, className }))}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
