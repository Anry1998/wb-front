// import Multiselect from '@/components/multiselect/multiselect';
import { Dialog } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { updateEmployee } from "@/store/employee/api-actions";
import {
  getFilteredEmployees,
  getHasEmployeeError,
} from "@/store/employee/selectors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import EditFormModal from "../modal-wrapper/edit-form-modal";
import { Employee } from "@/types/employee.interface";
import Multiselect from "@/components/multiselect/multiselect";
import { getAllRoles } from "@/store/role/selectors";
import {
  ScrollArea,
  ScrollAreaViewport,
  Scrollbar,
} from "@radix-ui/react-scroll-area";
import SelectWithSearch from "@/components/select-with-search/select-with-search";
import { fetchGroupCompanyById } from "@/store/group-company/api-actions";
import {
  getCompanyForSearch,
  getGroupCompanies,
} from "@/store/group-company/selectors";
import { State } from "@/types/state.type";

type EditEmployeeFormProps = {
  employee: Employee;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditEmployeeForm({
  employee,
  open,
  setOpen,
}: EditEmployeeFormProps): JSX.Element {
  const { id, roles_id, companies_id } = employee;
  const employees = useAppSelector((state: State) =>
    getFilteredEmployees(state)
  );

  const hasError = useAppSelector(getHasEmployeeError);
  const groups = useAppSelector(getGroupCompanies) || [];

  const allCompanyData = useAppSelector(getCompanyForSearch);
  const allRoleData = useAppSelector(getAllRoles) ?? [];
  const dispatch = useAppDispatch();
  const [currentCompanies, setCurrentCompanies] =
    useState<number[]>(companies_id);
  const [currentRoles, setCurrentRoles] = useState<number[]>(roles_id);
  const formSchema = z.object({
    name: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
    surname: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
    patronymic: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().optional()
    ),
    telegram: z.string().nullable().optional(),
    companies_id: z.array(z.number()),
    group_id: z.preprocess((val) => (val ? +val : undefined), z.number()),
    roles_id: z.array(z.number()).min(1, "Выберите хотя бы одну роль"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: employee.name,
      surname: employee.surname,
      patronymic: employee.patronymic,
      group_id: Number(employee.group_id),
      telegram: employee.telegram ?? null,
      companies_id: companies_id,
      roles_id: roles_id,
    },
  });
  const groupId = form.watch("group_id");
  useEffect(() => {
    form.getValues().group_id &&
      dispatch(fetchGroupCompanyById(form.getValues().group_id));
  }, [groupId, open]);

  const hasChanges =
    JSON.stringify(
      employees?.find((item) => item.id === id)?.companies_id.sort()
    ) !== JSON.stringify(currentCompanies.sort()) ||
    JSON.stringify(
      employees?.find((item) => item.id === id)?.roles_id.sort()
    ) !== JSON.stringify(currentRoles.sort()) ||
    form.getValues().name !== employee.name ||
    form.getValues().surname !== employee.surname ||
    form.getValues().patronymic !== employee.patronymic ||
    Number(form.getValues().group_id) !==
      Number(employees?.find((item) => item.id === id)?.group_id);

  // Теперь проверяем это условие при отключении кнопки
  const isDisabledBtn = !currentRoles.length || !hasChanges;
  const updateCompanies = (data: number[]) => setCurrentCompanies(data);
  const updateRoles = (data: number[]) => setCurrentRoles(data);

  async function onSubmit({
    name,
    surname,
    patronymic,
  }: z.infer<typeof formSchema>) {
    dispatch(
      updateEmployee({
        id,
        name,
        surname,
        patronymic,
        group_id: Number(form.getValues().group_id),
        companies_id: currentCompanies,
        roles_id: currentRoles,
      })
    ).then(() => {
      !hasError && setOpen(false);
    });
    form.reset();
  }
  useEffect(() => {
    form.reset({
      name: employee.name,
      surname: employee.surname,
      patronymic: employee.patronymic,
      group_id: Number(employee.group_id),
      telegram: employee.telegram ?? null,
      companies_id: companies_id,
      roles_id: roles_id,
    });
  }, [open]);
  form.watch("roles_id");

  useEffect(() => {
    updateCompanies(companies_id);
    updateRoles(roles_id);
    return () => {
      form.reset();
    };
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <EditFormModal type="сотрудника">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <ScrollArea className="overflow-hidden ">
              <ScrollAreaViewport className=" max-h-[60vh] p-[1px]">
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <>
                          <span>Фамилия </span>
                          <span className="text-error">*</span>
                        </>
                      </FormLabel>
                      <FormControl>
                        <Input
                          onInput={(e) =>
                            form.setValue(field.name, e.currentTarget.value, {
                              shouldValidate: true,
                            })
                          }
                          placeholder="Напишите название"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <>
                          <span>Имя </span>
                          <span className="text-error">*</span>
                        </>
                      </FormLabel>
                      <FormControl>
                        <Input
                          onInput={(e) =>
                            form.setValue(field.name, e.currentTarget.value, {
                              shouldValidate: true,
                            })
                          }
                          placeholder="Напишите название"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="patronymic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <>
                          <span>Отчество </span>
                          <span className="text-error">*</span>
                        </>
                      </FormLabel>
                      <FormControl>
                        <Input
                          onInput={(e) =>
                            form.setValue(field.name, e.currentTarget.value, {
                              shouldValidate: true,
                            })
                          }
                          placeholder="Напишите название"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <Multiselect
                    data={currentRoles}
                    updateData={updateRoles}
                    allData={allRoleData}
                    label="Роли"
                    isRequired={true}
                    maxNum={3}
                  />
                </FormItem>

                <FormField
                  control={form.control}
                  name="group_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <SelectWithSearch
                        data={field.value}
                        updateData={(val) => {
                          field.onChange(val);
                          updateCompanies([]);
                        }}
                        allData={groups}
                        type="group_company"
                      />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <Multiselect
                    data={currentCompanies}
                    updateData={updateCompanies}
                    allData={
                      allCompanyData?.map(({ seller_id, seller_name }) => ({
                        id: seller_id,
                        name: seller_name,
                      })) || []
                    }
                    label="Компании"
                    isRequired={false}
                    maxNum={6}
                  />
                </FormItem>
              </ScrollAreaViewport>
              <Scrollbar className="w-[6px]" />
            </ScrollArea>
            <Button
              variant={"default"}
              className="w-full mt-4"
              disabled={isDisabledBtn}
              type="submit"
            >
              Сохранить
            </Button>
          </form>
        </Form>
      </EditFormModal>
    </Dialog>
  );
}

export default EditEmployeeForm;
