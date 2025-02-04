import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

type AddFormModalProps = {
  type: string;
  action: string;
  children: React.ReactNode;
};

const AddFormModal = ({ type, action, children }: AddFormModalProps) => {
  return (
    <>
      <DialogTrigger
        className="bg-white p-0"
        // type === "сотрудника" ? "" : "absolute -top-[28px] left-[70vw]"
      >
        <Button variant="outline" className="px-1 py-2">
          <PlusIcon className="size-[20px] " />
          <span className="leading-[12px]">Добавить {type}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" w-[90%] md:w-[50%] max-w-[358px] p-3 text-purple-925">
        <DialogHeader className="items-start mb-2">
          <DialogTitle className="mt-1.5 text-lg">
            {action} {type}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {children}
      </DialogContent>
    </>
  );
};

export default AddFormModal;
