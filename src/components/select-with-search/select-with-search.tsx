import { FormControl, FormLabel } from "@/components/ui/form";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
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
import { CompanyGroup } from "@/types/company.interface";

type SelectWithSearchProps = {
  data: number;
  updateData: (id: number) => void;
  allData: CompanyGroup[];
  type: "group_company" | "marketplace";
  isRequired?: boolean;
};

const DefaultOptions = {
  group_company: {
    label: "Группа компаний",
    description: "группу ",
  },
  marketplace: {
    label: "Маркетплейс",
    description: "маркетплейс",
  },
};

function SelectWithSearch({
  data,
  updateData,
  allData,
  type,
  isRequired,
}: SelectWithSearchProps): JSX.Element {
  const [openPopover, setOpenPopover] = useState(false);
  const currentName =
    allData.find(({ group_id }) => group_id === data)?.group_name ?? "";

  const { label, description } = DefaultOptions[type];

  const getIsPresent = (val: number) => data === val;

  const handleSetCurrent = (id: number) => {
    const isPresent = getIsPresent(id);
    setOpenPopover(false);
    if (isPresent) {
      updateData(0);
    } else {
      updateData(id);
    }
  };

  useEffect(() => {
    return () => {
      setOpenPopover(false);
    };
  }, []);
  return (
    <>
      <FormLabel>
        <>
          <span>{label} </span>
          {isRequired && <span className="text-error">*</span>}
        </>
      </FormLabel>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "mt-[6px] w-full py-[6px] px-[14px] h-max max-w-full justify-between shadow:none border-purple-100 focus-visible:ring-purple-500 focus:outline-purple-500 z-0 hover:bg-purple-0"
              )}
            >
              <div className=" flex gap-2 flex-wrap text-[14px] font-normal text-start ">
                {currentName ? (
                  <span className="text-purple-925 truncate">
                    {currentName}
                  </span>
                ) : (
                  <span className="text-solitude-100 text-sm truncate">
                    Выберите {description}
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
          </FormControl>
        </PopoverTrigger>
        <ScrollArea
          type="always"
          className={`px-[10px] py-[14px] bg-purple-25 min-h-[40px] sm:h-[120px]  p-1 pt-2  ${
            openPopover ? "" : "hidden"
          }`}
        >
          <Command
            className="bg-purple-25"
            filter={(value, search) => {
              if (value.includes(search)) return 1;
              return 0;
            }}
          >
            <CommandInput content="styleWrapper" placeholder="Поиск..." />
            <CommandList>
              <CommandEmpty className="text-center text-details">
                Элемент с таким именем не найден
              </CommandEmpty>
              <CommandGroup className="mr-1">
                {allData?.map((item) => (
                  <CommandItem
                    value={`${item.group_name}`}
                    key={`${item.group_id}`}
                  >
                    <div
                      onClick={() => handleSetCurrent(item.group_id)}
                      className={`w-full h-full px-2 py-1.5 cursor-pointer ${
                        currentName === item.group_name && "text-purple-500"
                      }`}
                    >
                      <span className="text-basic font-normal truncate">
                        {item.group_name}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </ScrollArea>
      </Popover>
    </>
  );
}

export default SelectWithSearch;
