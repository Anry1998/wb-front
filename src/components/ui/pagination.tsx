import * as React from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import sprite from '/sprite.svg';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center  gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('flex justify-center items-center w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8 rounded-md p-0 gap-0 hover:bg-purple-300 hover:text-purple-0 focus-visible:ring-purple-500 focus:outline-purple-500 hover:cursor-pointer ', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) =>(
  <PaginationLink
    aria-label='Go to previous page'
    size='default'
    className={cn('bg-purple-500 rounded-md p-0 gap-0  w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8 hover:bg-purple-300 focus-visible:ring-purple-500 focus:outline-purple-500 [&_svg]:size-3 md:[&_svg]:size-4 xl:[&_svg]:size-5 hover:cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50', className)}
    {...props}
  >
    <svg className='rotate-180'>
      <use xlinkHref={`${sprite}#pagination_arrow`}></use>
    </svg>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to next page'
    size='default'
    className={cn('bg-purple-500 rounded-md p-0 gap-0  w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8 hover:bg-purple-300 focus-visible:ring-purple-500 focus:outline-purple-500 [&_svg]:size-3 md:[&_svg]:size-4 xl:[&_svg]:size-5 hover:cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50', className)}
    {...props}
  >  
   <svg >
      <use xlinkHref={`${sprite}#pagination_arrow`}></use>
    </svg>
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8 items-center justify-center text-center rounded-md p-0 gap-0 focus-visible:ring-purple-500 focus:outline-purple-500', className)}
    {...props}
  >
    <DotsHorizontalIcon className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
