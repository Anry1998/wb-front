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
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useAppSelector, useAppDispatch } from "@/hooks/store-hooks";
import {
  fetchEmployeeById,
  updateEmployee,
} from "@/store/employee/api-actions";
import { getCurrentEmployee } from "@/store/employee/selectors";
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
import InfoHeader from "@/components/info-header/info-header";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

const EditEmploeePage = () => {
  const searchParams = new URLSearchParams(location.search);
  const employee = useAppSelector(getCurrentEmployee);
  const id = searchParams.get("id");

  const groups = useAppSelector(getGroupCompanies) || [];

  const allCompanyData = useAppSelector(getCompanyForSearch);
  const allRoleData = useAppSelector(getAllRoles) ?? [];
  const dispatch = useAppDispatch();
  const [currentCompanies, setCurrentCompanies] = useState<number[]>(
    (employee && employee.companies_id) || []
  );
  const [currentRoles, setCurrentRoles] = useState<number[]>(
    (employee && employee.roles_id) || []
  );
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
      name: employee ? employee.name : "",
      surname: employee ? employee.surname : "",
      patronymic: employee ? employee.patronymic : "",
      group_id: employee ? Number(employee.group_id) : 0,
      telegram: employee && employee.telegram,
      companies_id: (employee && employee.companies_id) || [],
      roles_id: (employee && employee.roles_id) || [],
    },
  });

  const groupId = form.watch("group_id");
  useEffect(() => {
    form.getValues().group_id &&
      dispatch(fetchGroupCompanyById(form.getValues().group_id));
  }, [groupId]);
  useEffect(() => {
    id && dispatch(fetchEmployeeById(Number(id)));
  }, []);
  const hasChanges =
    JSON.stringify([...(employee?.companies_id || [])].sort()) !==
      JSON.stringify([...currentCompanies].sort()) ||
    JSON.stringify([...(employee?.roles_id || [])].sort()) !==
      JSON.stringify([...currentRoles].sort()) ||
    form.getValues().name !== employee?.name ||
    form.getValues().surname !== employee.surname ||
    employee?.patronymic === null
      ? form.getValues().patronymic !== ""
      : employee?.patronymic !== form.getValues().patronymic ||
        form.getValues().group_id != employee?.group_id;

  const navigate = useNavigate();
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
        id: Number(id),
        name,
        surname,
        patronymic,
        group_id: Number(form.getValues().group_id),
        companies_id: currentCompanies,
        roles_id: currentRoles,
      })
    );
    navigate("/personal/employees");
    form.reset();
  }
  const availableEveryoneArray = currentRoles
    .map((roleId) => {
      const role = allRoleData.find((role) => role.id === roleId);
      return role ? role.vailableEveryone : null; // Вернуть значение, если роль найдена
    })
    .filter(Boolean); // Убрать null или undefined, если роль не найдена

  useEffect(() => {
    if (employee) {
      form.reset({
        name: employee.name || "",
        surname: employee.surname || "",
        patronymic: employee.patronymic || "",
        group_id: !isEmpty(availableEveryoneArray)
          ? employee.group_id
            ? Number(employee.group_id)
            : undefined
          : undefined,
        telegram: employee.telegram || null,
        companies_id: !isEmpty(availableEveryoneArray)
          ? employee.companies_id
          : [],
        roles_id: employee.roles_id,
      });

      setCurrentCompanies(employee.companies_id || []);
      setCurrentRoles(employee.roles_id || []);
    }
    dispatch(fetchGroupCompanies());
    dispatch(fetchRoles());
  }, [employee]);
  useEffect(() => {
    form.getValues().group_id &&
      dispatch(fetchGroupCompanyById(form.getValues().group_id));
  }, [groupId]);

  return (
    <div className="info__wrapper  px-[10px] w-full max-w-[500px]">
      <InfoHeader
        back
        icon="user-role"
        title="Редактировать сотрудника"
        type="roles"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[600px]  block left-[50%]  px-[0px]  sm:px-[80px] sm:absolute translate-x-0 sm:translate-x-[-50%] "
        >
          <ScrollArea className="overflow-hidden ">
            <ScrollAreaViewport className=" max-h-[60vh] p-[2px]">
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
              {!isEmpty(availableEveryoneArray) && (
                <>
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
                </>
              )}
            </ScrollAreaViewport>
            <Scrollbar className="w-[6px]" />
          </ScrollArea>

          <div className="flex justify-start gap-[20px] mt-6">
            <Button
              variant={"default"}
              className="w-fit py-2 px-4"
              disabled={isDisabledBtn}
              type="submit"
            >
              Сохранить
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

export default EditEmploeePage;
