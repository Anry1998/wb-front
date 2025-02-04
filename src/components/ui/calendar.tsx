import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
    showOutsideDays={showOutsideDays}
    className={cn('p-2 pointer-events-auto', className)}
    classNames={{
      months: 'flex flex-col relative',
      month_caption: 'flex justify-center h-7 mx-10 relative items-center',
      weekdays: 'flex flex-row',
      weekday: 'text-muted-foreground w-8 font-normal text-[8px] sm:portrait:text-[10px] md:landscape:text-[10px] xl:text-xs 2xl:text-sm',
      month: 'gap-y-4 overflow-x-hidden w-full',
      caption: 'flex justify-center pt-1 relative items-center gap-2 px-2',
      caption_label: 'text-[10px] sm:portrait:text-[12px] md:landscape:text-[12px] xl:text-sm capitalize text-center',
      button_next: cn(
        buttonVariants({
          variant: 'outline',
          className: 'absolute right-0 w-2 h-2 md:w-3 md:h-3 xl:w-4 xl:h-4 bg-purple-0 border-none p-0 opacity-50 hover:opacity-100',
        })
      ),
      button_previous: cn(
        buttonVariants({
          variant: 'outline',
          className: 'absolute left-0 w-2 h-2 md:w-3 md:h-3 xl:w-4 xl:h-4 bg-purple-0 border-none p-0 opacity-50 hover:opacity-100',
        })
      ),
      nav: 'flex items-start',
      month_grid: 'mt-4',
      week: 'flex w-full mt-2',
      day: 'p-0 text-center text-[8px] sm:portrait:text-[10px] md:landscape:text-[10px] xl:text-xs 2xl:text-sm flex-1 flex items-center justify-center rounded-md [&:has([aria-selected].day-range-end)]:rounded-r-md group',
      day_button: cn(
        buttonVariants({ variant: 'ghost' }),
        'size-3.5 p-0 font-normal transition-none hover:text-inherit aria-selected:opacity-100 focus:!outline-none focus-visible:ring-none hover:border-none text-[8px] sm:portrait:text-[10px] md:landscape:text-[10px] xl:text-xs 2xl:text-sm bg-purple-0'
      ),
      range_start: 'day-range-start rounded-s-md',
      range_end: 'day-range-end rounded-e-md',
      selected:
        '[&__button]:bg-purple-0 text-error hover:text-error focus:text-error border border-error focus:ring-error hover:text-error focus:text-error',
      today: '[&__button]:bg-purple-0 text-purple-500 border border-purple-500',
      outside:
        'day-outside text-purple-200 aria-selected:text-purple-500 opacity-80 aria-selected:opacity-90',
      disabled: 'text-purple-200 opacity-50',
      range_middle:
        'rounded-none aria-selected:text-purple-500 hover:aria-selected:text-error',
      hidden: 'invisible',
      ...classNames,
    }}
    components={{
      Chevron: ({ orientation }) => {
        const Icon = orientation === 'left' ? ChevronLeftIcon : ChevronRightIcon;
        return <Icon className='h-4 w-4' />;
      },
    }}
    {...props}
  />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
