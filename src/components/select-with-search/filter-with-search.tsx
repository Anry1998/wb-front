import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";

type FilterWithSearchProps = {
  data: number;
  updateData: (id: number) => void;
  allData?: { id: number; name: string }[];
  type: "company" | "employee";
  labelVisible: boolean;
};

const DefaultOptions = {
  company: {
    label: "Компания",
    description: "группы",
  },
  employee: {
    label: "Сотрудники",
    description: "cотрудники",
  },
};

function FilterWithSearch({
  data,
  updateData,
  allData,
  type,
  labelVisible,
}: FilterWithSearchProps): JSX.Element {
  const [openPopover, setOpenPopover] = useState(false);
  const currentName = allData?.find(({ id }) => id === data)?.name ?? "";

  const { label, description } = DefaultOptions[type];

  useEffect(() => {
    return () => {
      setOpenPopover(false);
    };
  }, []);
  return (
    <div className="flex flex-col w-auto">
      {labelVisible && (
        <Label variant={"filterLabel"} className="mb-[4px]">
          {label}
        </Label>
      )}
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "min-h-[20px] sm:landscape:min-h-[20px] sm:portrait:h-[28px] md:landscape:h-[28px] md:h-[30px] xl:portrait:h-[38px] xl:landscape:h-[38px] 2xl:portrait:h-[50px] 2xl:landscape:h-[50px] h-max max-w-full justify-between shadow:none border-purple-100 focus-visible:ring-purple-500 focus:outline-purple-500 z-0 hover:bg-purple-50 rounded-lg",
              !labelVisible ? "w-max" : ""
            )}
          >
            <div className=" flex gap-2 flex-wrap  text-basic font-normal text-start">
              {currentName ? (
                <span className="p-1 text-[14px] text-purple-925 w-[150px] xl:w-full truncate">
                  {currentName}
                </span>
              ) : (
                <span className="p-1 text-[14px] text-solitude-100 w-[150px]  truncate">
                  Все {description}
                </span>
              )}
            </div>

            {openPopover ? (
              <div className="flex items-center">
                <ChevronUp className="h-4 w-4 shrink-0" />
              </div>
            ) : (
              <ChevronDown className=" h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-1 ml-3 w-auto max-w-[180px] md:max-w-[220px]">
          <ScrollArea
            type="always"
            className={`px-[10px] py-[14px] bg-purple-25 min-h-[40px] h-[150px] p-1 pt-2   ${
              openPopover ? "" : "hidden"
            }`}
          >
            <Command
              className="bg-purple-25"
              filter={(value, search) => {
                if (value.toLowerCase().includes(search.toLowerCase()))
                  return 1;
                return 0;
              }}
            >
              <CommandInput content="styleWrapper" placeholder="Поиск..." />
              <CommandList>
                <CommandEmpty className="text-center text-details">
                  Такиое имя не найдено
                </CommandEmpty>
                <CommandGroup className="mr-1">
                  <CommandItem value={`${0}`}>
                    {/* <Checkbox
                        checked={getIsPresent(item.id)}
                        onClick={() => updateData(item.id)}
                      /> */}
                    <span
                      onClick={() => {
                        updateData(0);
                        setOpenPopover(false);
                      }}
                      className="w-[150px] p-1 text-[14px] cursor-pointer font-normal truncate"
                    >
                      Все
                    </span>
                  </CommandItem>
                  {allData?.map((item) => (
                    <CommandItem value={`${item.name}`} key={`${item.id}`}>
                      {/* <Checkbox
                        checked={getIsPresent(item.id)}
                        onClick={() => updateData(item.id)}
                      /> */}
                      <span
                        onClick={() => {
                          updateData(item.id);
                          setOpenPopover(false);
                        }}
                        className="p-1 w-[150px] text-[14px]  cursor-pointer text-basic font-normal truncate"
                      >
                        {item.name}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FilterWithSearch;
