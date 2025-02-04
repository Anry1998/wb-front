import Multiselect from "@/components/multiselect/multiselect";
import { Button } from "@/components/ui/button";
import SelectWithSearch from "@/components/select-with-search/select-with-search";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ScrollArea,
  ScrollAreaViewport,
  Scrollbar,
} from "@radix-ui/react-scroll-area";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useAppSelector, useAppDispatch } from "@/hooks/store-hooks";
import { addEmployee, fetchEmployees } from "@/store/employee/api-actions";
import { getEmployeePosting } from "@/store/employee/selectors";
import {
  fetchGroupCompanies,
  fetchGroupCompanyById,
} from "@/store/group-company/api-actions";
import {
  getGroupCompanies,
  getCompanyForSearch,
} from "@/store/group-company/selectors";
import { getAllRoles } from "@/store/role/selectors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { z } from "zod";
import { fetchRoles } from "@/store/role/api-actions";
import { fetchCompanies } from "@/store/company/api-actions";
import { isEmpty } from "lodash";
import sprite from "/sprite.svg";
import InfoHeader from "@/components/info-header/info-header";
import { useNavigate } from "react-router-dom";
import MultiselectForCompanies from "@/components/multiselect/multiselect-for-companies";

const AddEmploeePage = () => {
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  // const [allCompanyData, setAllCompanyData] = useState<Company[]>([]);
  const allCompanyData = useAppSelector(getCompanyForSearch);
  // const allCompanyData = useAppSelector(getAllCompanies) ?? [];
  const groups = useAppSelector(getGroupCompanies) || [];
  const isPosting = useAppSelector(getEmployeePosting);
  // const allCompanyData = useAppSelector(getAllCompanies) ?? [];
  const allRoleData = useAppSelector(getAllRoles) ?? [];
  const [currentCompanies, setCurrentCompanies] = useState<number[]>([]);
  const [currentRoles, setCurrentRoles] = useState<number[]>([]);
  const formSchema = z.object({
    firstname: z
      .preprocess(
        (val) => (typeof val === "string" ? val.trim() : val),
        z.string().min(1, "Заполните поле")
      )
      .optional(),
    lastname: z
      .preprocess(
        (val) => (typeof val === "string" ? val.trim() : val),
        z.string().min(1, "Заполните поле")
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
  useEffect(() => {
    dispatch(fetchGroupCompanies());
    dispatch(fetchRoles());
  }, []);
  const isDisabledBtn =
    !form.formState.isDirty ||
    isPosting ||
    !form.formState.isValid ||
    currentRoles.length === 0;

  const handlePasswordShow = () => setPasswordVisible((prev) => !prev);
  const availableEveryoneArray = currentRoles
    .map((roleId) => {
      const role = allRoleData.find((role) => role.id === roleId);
      return role ? role.vailableEveryone : null; // Вернуть значение, если роль найдена
    })
    .filter(Boolean); // Убрать null или undefined, если роль не найдена

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
      group_id?: number;
    } = {
      ...data,
      group_id: !isEmpty(availableEveryoneArray) ? data.group_id : undefined,
      name: data.firstname || "",
      surname: data.lastname || "",
      patronymic: data.patronymic,
      roles_id: currentRoles,
    };
    console.log(availableEveryoneArray);
    // Условное добавление свойства companies_id
    if (!isEmpty(currentCompanies)) {
      employeeData.companies_id = !isEmpty(availableEveryoneArray)
        ? currentCompanies
        : undefined;
    }
    dispatch(addEmployee(employeeData)).then(() => {
      dispatch(
        fetchEmployees({
          page: 1,
        })
      );
    });
    navigate("/personal/employees");
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
    <div className="info__wrapper  px-[10px] w-full max-w-[500px]">
      <InfoHeader
        back
        icon="user-role"
        title="Добавить сотрудника"
        type="roles"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[600px]  block left-[50%]  px-[0px]  sm:px-[80px] sm:absolute translate-x-0 sm:translate-x-[-50%] "
        >
          <ScrollArea className="overflow-hidden ">
            <ScrollAreaViewport className=" max-h-[80vh] p-[2px]">
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
              {!isEmpty(availableEveryoneArray) && (
                <>
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
                    <MultiselectForCompanies
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
                </>
              )}
            </ScrollAreaViewport>
            <Scrollbar className="w-[6px]" />
          </ScrollArea>

          <div className="flex justify-start gap-[20px] mt-6">
            <Button
              className="w-fit py-2 px-4"
              variant={"default"}
              disabled={isDisabledBtn}
              type="submit"
            >
              Добавить
            </Button>
            <Button
              variant={"destructive"}
              disabled={false}
              className="w-fit py-2 px-4"
              type="button"
              onClick={() => navigate(-1)}
            >
              Отменить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEmploeePage;
