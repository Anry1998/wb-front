import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import sprite from "/sprite.svg";

type EditFormModalProps = {
  type: string;
  children: React.ReactNode;
};

const EditFormModal = ({ type, children }: EditFormModalProps) => {
  return (
    <>
      <DialogTrigger className="hidden bg-purple-50 rounded-sm p-0.5 size-4 [&_svg]:size-2.5 2xl:[&_svg]:size-4 hover:bg-purple-50 focus-visible:ring-purple-500 focus:outline-purple-500 items-center justify-center ">
        <svg>
          <use xlinkHref={`${sprite}#pen`}></use>
        </svg>
      </DialogTrigger>
      <DialogContent className="w-[90%] md:w-[50%] max-w-[358px] p-3 text-purple-925 ">
        <div className="flex flex-col gap-3">
          <DialogHeader className="items-start">
            <DialogTitle className="mt-1.5 text-title">
              Редактировать {type}
            </DialogTitle>

            <DialogDescription />
          </DialogHeader>

          {children}
        </div>
      </DialogContent>
    </>
  );
};

export default EditFormModal;
