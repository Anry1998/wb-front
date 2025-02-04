// import Multiselect from "@/components/multiselect/multiselect";
import { Dialog } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { addEmployee, fetchEmployees } from "@/store/employee/api-actions";
import {
  getEmployeePosting,
  getHasEmployeeError,
} from "@/store/employee/selectors";
// import { getAllRoles } from "@/store/role/selectors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import AddFormModal from "../modal-wrapper/add-form-modal";
import sprite from "/sprite.svg";
import Multiselect from "@/components/multiselect/multiselect";
import { getAllRoles } from "@/store/role/selectors";
import SelectWithSearch from "@/components/select-with-search/select-with-search";
import {
  getCompanyForSearch,
  getGroupCompanies,
} from "@/store/group-company/selectors";
import {
  ScrollArea,
  ScrollAreaViewport,
  Scrollbar,
} from "@radix-ui/react-scroll-area";
import {
  fetchGroupCompanies,
  fetchGroupCompanyById,
} from "@/store/group-company/api-actions";
import { fetchCompanies } from "@/store/company/api-actions";
import { isEmpty } from "lodash";

function AddEmployeeForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [allCompanyData, setAllCompanyData] = useState<Company[]>([]);
  const allCompanyData = useAppSelector(getCompanyForSearch);
  // const allCompanyData = useAppSelector(getAllCompanies) ?? [];
  const groups = useAppSelector(getGroupCompanies) || [];
  const isPosting = useAppSelector(getEmployeePosting);
  const hasError = useAppSelector(getHasEmployeeError);
  // const allCompanyData = useAppSelector(getAllCompanies) ?? [];
  const allRoleData = useAppSelector(getAllRoles) ?? [];
  const [open, setOpen] = useState(false);
  const [currentCompanies, setCurrentCompanies] = useState<number[]>([]);
  const [currentRoles, setCurrentRoles] = useState<number[]>([]);
  const formSchema = z.object({
    firstname: z
      .preprocess(
        (val) => (typeof val === "string" ? val.trim() : val),
        z.string()
      )
      .optional(),
    lastname: z
      .preprocess(
        (val) => (typeof val === "string" ? val.trim() : val),
        z.string()
      )
      .optional(),
    patronymic: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string()
    ),

    group_id: z.preprocess(
      (val) => (val ? +val : undefined),
      z.number().min(1, "Заполните поле").optional()
    ),
    login: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
    telegram: z
      .preprocess(
        (val) => (typeof val === "string" ? val.trim() : val),
        z.string()
      )
      .optional(),
    password: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      patronymic: "",
      login: "",
      telegram: "",
      password: "",
    },
  });
  const groupId = form.watch("group_id");

  useEffect(() => {
    form.getValues().group_id &&
      dispatch(fetchGroupCompanyById(form.getValues().group_id as number));
  }, [groupId]);

  const isDisabledBtn =
    !form.formState.isDirty || !currentRoles.length || isPosting;

  const handlePasswordShow = () => setPasswordVisible((prev) => !prev);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const employeeData: {
      name: string;
      surname: string;
      patronymic: string;
      roles_id: number[];
      companies_id?: number[];
      login: string;
      telegram?: string;
      password: string;
    } = {
      ...data,
      name: data.firstname || "",
      surname: data.lastname || "",
      patronymic: data.patronymic,
      roles_id: currentRoles || [],
    };

    // Условное добавление свойства companies_id
    if (!isEmpty(currentCompanies)) {
      employeeData.companies_id = currentCompanies;
    }
    dispatch(addEmployee(employeeData)).then(() => {
      !hasError && setOpen(false);
      dispatch(
        fetchEmployees({
          page: 1,
        })
      );
    });
    form.reset();
  }

  const updateCompanies = (data: number[]) => {
    setCurrentCompanies(data);
  };

  const updateRoles = (data: number[]) => {
    setCurrentRoles(data);
  };

  useEffect(() => {
    dispatch(fetchGroupCompanies());
    dispatch(fetchCompanies());
    updateCompanies([]);
    updateRoles([]);
    return () => {
      form.reset;
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AddFormModal type="сотрудника" action="Добавить">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <ScrollArea className="overflow-hidden ">
              <ScrollAreaViewport className=" max-h-[60vh] p-[1px]">
                <FormField
                  control={form.control}
                  name="lastname"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        <>
                          <span>Фамилия </span>
                          <span className="text-error">*</span>
                        </>
                      </FormLabel>
                      <FormControl>
                        <Controller
                          name="lastname"
                          control={form.control}
                          render={({ field }) => (
                            <Input placeholder="Напишите фамилию" {...field} />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstname"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        <>
                          <span>Имя </span>
                          <span className="text-error">*</span>
                        </>
                      </FormLabel>
                      <FormControl>
                        <Controller
                          name="firstname"
                          control={form.control}
                          render={({ field }) => (
                            <Input placeholder="Напишите имя" {...field} />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patronymic"
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        <>
                          <span>Отчество </span>
                        </>
                      </FormLabel>
                      <FormControl>
                        <Controller
                          name="patronymic"
                          control={form.control}
                          render={({ field }) => (
                            <Input placeholder="Напишите отчество" {...field} />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="login"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <>
                          <span>Логин </span>
                          <span className="text-error">*</span>
                        </>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Напишите логин" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <>
                          <span>Пароль </span>
                          <span className="text-error">*</span>
                        </>
                      </FormLabel>{" "}
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Напишите пароль"
                            type={passwordVisible ? "text" : "password"}
                            {...field}
                          />
                        </FormControl>
                        <svg
                          className="w-3 h-3 absolute bottom-3.5 right-3 hover:cursor-pointer [--svg-color:--svg-color-disabled] hover:[--svg-color:--svg-color]"
                          onClick={handlePasswordShow}
                        >
                          <use
                            xlinkHref={`${sprite}#${
                              passwordVisible ? "eye-crossed" : "eye"
                            }`}
                          ></use>
                        </svg>{" "}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telegram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <>
                          <span>Telegram </span>
                        </>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Напишите ник telegram" {...field} />
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
                        isRequired={!currentRoles.includes(1)}
                        data={field.value || 0}
                        updateData={(val) => field.onChange(val)}
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
                    isRequired={!currentRoles.includes(1)}
                    allData={
                      allCompanyData?.map(({ seller_id, seller_name }) => ({
                        id: seller_id,
                        name: seller_name,
                      })) || []
                    }
                    label="Компании"
                    maxNum={6}
                  />
                </FormItem>
              </ScrollAreaViewport>
              <Scrollbar className="w-[6px]" />
            </ScrollArea>
            <Button
              className="w-full mt-2"
              variant={"default"}
              disabled={isDisabledBtn}
              type="submit"
            >
              Добавить
            </Button>
          </form>
        </Form>
      </AddFormModal>
    </Dialog>
  );
}

export default AddEmployeeForm;
