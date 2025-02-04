import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/hooks/store-hooks";
import { deleteCompany } from "@/store/company/api-actions";
import { deleteEmployee } from "@/store/employee/api-actions";
import { deleteMarketplace } from "@/store/marketplace/api-actions";
import { deleteRole } from "@/store/role/api-actions";
import sprite from "/sprite.svg";
import { deleteGroupCompany } from "@/store/group-company/api-actions";

type DeleteAlertProps = {
  id: number[];
  type: "employee" | "company" | "group_company" | "marketplace" | "role";
  inCard: boolean;
};

function DeleteAlert({ id, type, inCard }: DeleteAlertProps): JSX.Element {
  const dispatch = useAppDispatch();

  const DefaultOptions = {
    employee: {
      head: "пользователя",
      description: "этого пользователя",
    },
    company: {
      head: "компанию",
      description: " эту компанию",
    },
    group_company: {
      head: "группу компаний",
      description: " эту группу компаний",
    },
    marketplace: {
      head: "маркетплейс",
      description: " этот маркетплейс",
    },
    role: {
      head: "роль",
      description: " эту роль",
    },
  };
  const DefaultStyles = {
    card: {
      trigger:
        "bg-white rounded-sm focus:outline-error p-0.5 size-4 [&_svg]:size-2.5 2xl:[&_svg]:size-4 hover:bg-purple-50 flex items-center justify-center",
      svg: "",
    },
    filters: {
      trigger: `bg-purple-0 rounded-lg  hover:bg-orange-200 hover:border-none px-1.5 py-2 md:px-2 md:py-3 max-sm:max-h-4  flex justify-center items-center gap-2 h-[20px] sm:landscape:h-[20px] sm:portrait:h-[28px] md:landscape:h-[28px] xl:portrait:h-[38px] xl:landscape:h-[38px] 2xl:portrait:h-[50px] 2xl:landscape:h-[50px] focus-visible:ring-error focus:outline-error disabled:border-purple-200 disabled:bg-purple-0`,
      svg: "size-2 md:size-3 xl:size-4",
    },
  };
  const styles = inCard ? DefaultStyles.card : DefaultStyles.filters;
  const { head, description } = DefaultOptions[type];
  const handleDelete = () => {
    switch (type) {
      case "employee":
        dispatch(deleteEmployee(id));
        break;
      case "company":
        dispatch(deleteCompany(id[0]));
        break;
      case "group_company":
        dispatch(deleteGroupCompany(id[0]));
        break;
      case "marketplace":
        dispatch(deleteMarketplace(id[0]));
        break;
      case "role":
        dispatch(deleteRole(id[0]));
        break;
      default:
        break;
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`shadow-none h-[18px] w-[18px] m-0 ${styles.trigger}`}
        disabled={!id.length}
      >
        <svg
          style={{ width: "12px", height: "12px" }}
          className={`${styles.svg}  ${
            !id.length
              ? "[--svg-color:--svg-color-disabled]"
              : "[--svg-color:--svg-color-error]"
          }`}
        >
          <use xlinkHref={`${sprite}#trash`}></use>
        </svg>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl w-[50%] max-w-[358px] px-2 py-6 md:px-5 md:py-10">
        <AlertDialogHeader className="flex-col items-center">
          <svg className="w-[20%] max-h-[40px] max-w-24 [--svg-color:--svg-color-error]">
            <use xlinkHref={`${sprite}#trash`}></use>
          </svg>
          <AlertDialogTitle className="text-center text-[14px]">
            Удалить {head}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-[12px]">
            <span>Вы уверены, что хотиту удалить {description}?</span>
            <br></br>
            <span>Это действие необратимо.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=" flex-row  justify-center sm:justify-center items-end gap-1">
          <AlertDialogAction className="h-8" onClick={handleDelete}>
            Удалить
          </AlertDialogAction>
          <AlertDialogCancel className="h-8">Отменить</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlert;
