import { FormLabel } from "@/components/ui/form";
import { useState } from "react";
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

type MultiselectProps = {
  data: number[];
  updateData: (data: number[]) => void;
  allData: { id: number; name: string }[];
  label: string;
  isRequired: boolean;
  maxNum: number;
  height?: string;
};

function MultiselectForRoles({
  data,
  updateData,
  allData,
  label,
  isRequired,
}: MultiselectProps): JSX.Element {
  const [allSelected, setAllSelected] = useState(false);

  const getIsPresent = (val: number) =>
    allSelected || data.find((item) => item === val) ? true : false;

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
  return (
    <>
      <FormLabel>
        <>
          <span>{label} </span>
          {isRequired && <span className="text-error">*</span>}{" "}
        </>
      </FormLabel>
      <ScrollArea className="h-[300px] ">
        <Command
          className="bg-white  max-w-[500px]   "
          filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1;
            return 0;
          }}
        >
          <CommandInput
            className="p-0 mx-0"
            content="styleWrapper"
            noMargin
            placeholder="Поиск..."
            style={{ maxWidth: "500px" }}
          />
          <CommandList>
            <CommandEmpty className="text-center text-details">
              {label} с таким именем не найдены
            </CommandEmpty>
            <CommandGroup className="mr-1 h-full">
              <CommandItem key={`all`}>
                <div className="  max-w-[400px]  text-[14px]  px-2 py-2 h-full flex gap-2">
                  <Checkbox checked={allSelected} onClick={handleAllSelect} />
                  Выбрать все{" "}
                </div>
              </CommandItem>
              {allData?.map((item) => (
                <CommandItem value={`${item.name}`} key={`${item.id}`}>
                  <div className=" py-2 px-2   max-w-[400px]  h-full flex gap-2">
                    <Checkbox
                      checked={getIsPresent(item.id)}
                      onClick={() => {
                        handleSetCurrent(item.id);
                      }}
                    />
                    <span className=" text-[14px] font-normal truncate">
                      {item.name}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </ScrollArea>
    </>
  );
}

export default MultiselectForRoles;
