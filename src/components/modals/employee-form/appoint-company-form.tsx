import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { appointCompanies } from "@/store/employee/api-actions";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import sprite from "/sprite.svg";
import {
  getEmployeePosting,
  getEmployees,
  getHasEmployeeError,
} from "@/store/employee/selectors";
import { setCheckedEmployees } from "@/store/employee/employee-data";
// import Multiselect from '@/components/multiselect/multiselect';
// import { getAllCompanies } from "@/store/company/selectors";

type AppointCompanyFormProps = {
  ids: number[];
};

function AppointCompanyForm({ ids }: AppointCompanyFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector(getEmployeePosting);
  const hasError = useAppSelector(getHasEmployeeError);
  // const allData = useAppSelector(getAllCompanies) ?? [];
  const [open, setOpen] = useState(false);
  const [currentCompanies] = useState<number[]>([]);
  const form = useForm();
  const isDisabledBtn = !currentCompanies.length || isUpdating;
  const employees = useAppSelector(getEmployees);
  const currentEmployees = employees?.filter((item) => ids.includes(item.id));
  const users =
    currentEmployees?.map(({ id, roles_id, companies_id }) => {
      return { id: id, roles_id, companies_id };
    }) ?? [];
  // const updateCompanies = (data: number[]) => {
  //   setCurrentCompanies(data);
  // };

  async function onSubmit() {
    dispatch(appointCompanies({ users, companies_id: currentCompanies })).then(
      () => {
        !hasError && setOpen(false);
        dispatch(setCheckedEmployees(null));
      }
    );
    form.reset();
    setOpen(false);
  }

  useEffect(() => {
    return () => {
      form.reset;
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        disabled={!ids.length}
        className="shadow-none m-0 bg-purple-0 rounded-lg px-1.5 py-2 md:px-2 md:py-3 max-sm:max-h-4  flex justify-center items-center gap-2 h-[20px] sm:landscape:h-[20px] sm:portrait:h-[28px] md:landscape:h-[28px] xl:portrait:h-[38px] xl:landscape:h-[38px] 2xl:portrait:h-[50px] 2xl:landscape:h-[50px] hover:bg-purple-100 hover:border-purple-500 border-purple-500  focus-visible:ring-purple-500 focus:outline-purple-500 disabled:border-purple-200 disabled:bg-purple-0 text-purple-925"
      >
        <svg
          className={`size-2 md:size-3 xl:size-4 ${
            !ids.length
              ? "[--svg-color:--svg-color-disabled]"
              : "[--svg-color:--svg-color-hover]"
          }`}
        >
          <use xlinkHref={`${sprite}#companies`}></use>
        </svg>
      </DialogTrigger>
      <DialogContent className="w-[50%] max-w-[358px] rounded-2xl text-purple-925">
        <DialogHeader className="items-start">
          <DialogTitle className="mt-1.5 text-title">
            Назначить в компании
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            {/* <FormItem className="mb-2">
              <Multiselect
                data={currentCompanies}
                updateData={updateCompanies}
                allData={allData}
                label="Компании"
                isRequired={false}
                maxNum={6}
              />
            </FormItem> */}
            <Button variant={"default"} disabled={isDisabledBtn} type="submit">
              Сохранить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AppointCompanyForm;
