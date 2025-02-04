import * as React from "react";
import sprite from "/sprite.svg";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full px-3 py-1  h-[20px] sm:landscape:h-[20px] sm:portrait:h-[28px] md:landscape:h-[28px] xl:portrait:h-[38px] xl:landscape:h-[38px] 2xl:portrait:h-[50px] 2xl:landscape:h-[50px] rounded-md md:rounded-lg text-sm p-4   text-purple-925 border border-input bg-transparent  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 my-1 bg-purple-0  placeholder:text-solitude-100 border-purple-100 shadow-none focus-visible:ring-purple-500 ",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex items-center relative">
        <svg className="w-2 h-2 md:w-3 md:h-3 xl:w-5 xl:h-5 absolute left-3">
          <use xlinkHref={`${sprite}#search`}></use>
        </svg>
        <input
          type="text"
          placeholder="Поиск ..."
          className={cn(
            "flex border border-input bg-white px-3 py-1  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 border-purple-100 pr-3 w-auto max-w-[120px] sm:max-w-[200px] xl:max-w-[552px] pl-[30px] xl:pr-5 xl:pl-[50px] h-[20px]  sm:landscape:h-[20px] sm:portrait:h-[28px] md:landscape:h-[28px] md:h-[30px] xl:portrait:h-[38px] xl:landscape:h-[38px] 2xl:portrait:h-[50px] 2xl:landscape:h-[50px] text-[10px]  sm:portrait:text-xs md:landscape:text-xs xl:text-sm 2xl:text-base  text-purple-925 placeholder:text-solitude-200 focus-visible:ring-purple-500 min-w-[120px] truncate rounded-lg",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

const CatalogInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex border border-input bg-white px-3 py-1  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 border-purple-100 w-auto max-w-[62px] md:max-w-[110px] xl:max-w-[160px] p-2 xl:p-[15px] h-[20px] sm:landscape:h-[20px] sm:portrait:h-[28px] md:landscape:h-[28px] md:h-[30px] xl:portrait:h-[38px] xl:landscape:h-[38px] 2xl:portrait:h-[50px] 2xl:landscape:h-[50px] rounded-lg text-[10px]  sm:portrait:text-xs md:landscape:text-xs xl:text-sm 2xl:text-base font-normal text-purple-925 placeholder:text-solitude-100 focus-visible:ring-purple-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
CatalogInput.displayName = "CatalogInput";

export { Input, SearchInput, CatalogInput };
