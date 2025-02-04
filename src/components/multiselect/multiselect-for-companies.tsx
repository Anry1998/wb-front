import { FormControl, FormLabel } from "@/components/ui/form";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import MultiselectTags from "./multiselect-tags";

type MultiselectProps = {
  data: number[];
  updateData: (data: number[]) => void;
  allData: { id: number; name: string }[];
  label: string;
  isRequired: boolean;
  maxNum: number;
  height?: string;
};

function MultiselectForCompanies({
  data,
  updateData,
  allData,
  label,
  isRequired,
  maxNum,
  height,
}: MultiselectProps): JSX.Element {
  const [openPopover, setOpenPopover] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  const getIsPresent = (val: number) =>
    allSelected || data.find((item) => item === val) ? true : false;

  const handleClearAll = () => {
    setAllSelected(() => false);
    updateData([]);
  };
  const handleAllSelect = () => {
    setAllSelected((prev) => !prev);
    !allSelected ? updateData(allData.map(({ id }) => id)) : updateData([]);
  };

  const handleSetCurrent = (id: number) => {
    setAllSelected(false);
    const isPresent = getIsPresent(id);
    if (isPresent) {
      const currentArr = data.filter((item) => !(item === id));
      updateData(currentArr);
    } else {
      updateData([...data, id]);
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
          {isRequired && <span className="text-error">*</span>}{" "}
        </>
      </FormLabel>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              size={"defaultTags"}
              role="combobox"
              className={cn(
                "mt-[6px] pl-[14px] py-1.5 h-[34px]  max-w-full justify-between shadow:none border-purple-100 focus-visible:ring-purple-500 focus:outline-purple-500 z-0 hover:bg-purple-0 flex-grow-0"
              )}
            >
              <div className="flex gap-2 flex-wrap text-[14px] font-normal truncate">
                {data?.length ? (
                  <MultiselectTags
                    type="companies"
                    data={allData.filter((item) => data.includes(item.id))}
                    maxNum={maxNum}
                  />
                ) : (
                  <span className="text-basic px-[8px] font-normal text-[14px] text-solitude-100">
                    {label} не выбраны
                  </span>
                )}
              </div>

              {openPopover ? (
                <div className="flex items-center">
                  <div
                    onClick={(evt) => {
                      evt.preventDefault();
                      handleClearAll();
                    }}
                    className={`z-50 w-4 border-none shadow-none bg-transparent  hover:bg-transparent focus:outline-none hover:border-none     ${
                      openPopover ? "" : "hidden"
                    } `}
                  >
                    <Cross2Icon className="w-4 h-4  text-purple-925" />
                  </div>
                  <ChevronUp className=" h-4 w-4 shrink-0" />
                </div>
              ) : (
                <ChevronDown className=" h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <ScrollArea
          type="always"
          className={`px-[10px] py-[14px] bg-purple-25 h-[${
            height ? height : "140px"
          }]  overflow-hidden p-1 pt-2 ${openPopover ? "" : "hidden"}`}
        >
          <Command
            className="bg-purple-25  "
            filter={(value, search) => {
              if (value.includes(search)) return 1;
              return 0;
            }}
          >
            <CommandInput content="styleWrapper" placeholder="Поиск..." />
            <CommandList>
              <CommandEmpty className="text-center text-details">
                {label} с таким именем не найдены
              </CommandEmpty>
              <CommandGroup className="mr-1 h-full">
                <CommandItem key={`all`}>
                  <div className="w-[70vw] max-w-[300px] px-1.5 py-2 h-full flex gap-2">
                    <Checkbox checked={allSelected} onClick={handleAllSelect} />
                    Выбрать все{" "}
                  </div>
                </CommandItem>
                {allData?.map((item) => (
                  <CommandItem value={`${item.name}`} key={`${item.id}`}>
                    <div className="w-[70vw] max-w-fit px-1.5 py-2 h-full flex gap-2">
                      <Checkbox
                        checked={getIsPresent(item.id)}
                        onClick={() => {
                          handleSetCurrent(item.id);
                        }}
                      />
                      <span className=" text-basic font-normal truncate">
                        {item.name}
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

export default MultiselectForCompanies;
