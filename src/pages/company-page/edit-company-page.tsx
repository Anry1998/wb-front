import InfoHeader from "@/components/info-header/info-header";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ScrollArea,
  ScrollAreaViewport,
  Scrollbar,
} from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import SelectWithSearch from "@/components/select-with-search/select-with-search";
import SelectWithSearchMarcetplace from "@/components/select-with-search/select-with-search-marketplace";
import {
  addCompany,
  fetchCompanyById,
  updateCompany,
} from "@/store/company/api-actions";
import { adaptEditCompanyToServer } from "@/utils/adapters/adaptToServer";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { getMarketplaces } from "@/store/marketplace/selectors";
import { getGroupCompanies } from "@/store/group-company/selectors";
import { fetchGroupCompanies } from "@/store/group-company/api-actions";
import { fetchMarketplaces } from "@/store/marketplace/api-actions";
import { Company } from "@/types/company.interface";

const EditCompanyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [currentCompany, setCurrentCompany] = useState<Company>();
  const marketplaces = useAppSelector(getMarketplaces) ?? [];
  const groups = useAppSelector(getGroupCompanies) || [];

  const formSchema = z.object({
    marketplace_id: z.preprocess(
      (val) => (val ? +val : undefined),
      z.number().min(1, "Заполните поле")
    ),
    group_id: z.preprocess(
      (val) => (val ? +val : undefined),
      z.number().min(1, "Заполните поле")
    ),
    seller_name: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
    inn: z.preprocess(
      (val) =>
        typeof val === "string" || typeof val === "number" ? Number(val) : val,
      z.number().nonnegative("ИНН должен быть положительным числом")
    ),
    // .regex(/^\d{10,12}$/)
    // .transform(Number),
    nalog: z.number(),
    // (val) => (typeof val === "string" ? val.trim() : val),
    // z.string().min(0, "Заполните поле").transform(Number)
    forma_naloga: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),

    dni_vsego: z.coerce
      .number()
      .nonnegative("Только положительные числа")
      .int("Только целые числа"),
    dni_wb: z.coerce
      .number()
      .nonnegative("Только положительные числа")
      .int("Только целые числа"),
    // status: z.nativeEnum(CompanyStatus),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marketplace_id: currentCompany?.marketplace_id || 0,
      seller_name: currentCompany?.seller_name || "",
      inn: currentCompany?.inn || 0,
      nalog: currentCompany?.nalog || 0,
      forma_naloga: currentCompany?.forma_naloga || "",
      dni_vsego: currentCompany?.dni_vsego || 0,
      dni_wb: currentCompany?.dni_wb || 0,
      group_id: currentCompany?.group_id || 0,
    },
    reValidateMode: "onBlur",
  });

  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      return;
    }
    if (id) {
      dispatch(fetchCompanyById(+id)).then((res) => {
        setCurrentCompany(res.payload as Company);
      });
    }

    hasMounted.current = true;
  }, [dispatch, id]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const adaptedData = adaptEditCompanyToServer({ ...data });
    if (!id) {
      dispatch(addCompany(adaptedData)).then(() => {
        () => form.reset();
        navigate("/personal/companies");
      });
    } else {
      dispatch(
        updateCompany({
          ...adaptedData,
          seller_id: Number(id),
        })
      ).then(() => {
        () => form.reset();
        navigate("/personal/companies");
      });
    }
    form.reset();
  }
  useEffect(() => {
    dispatch(fetchGroupCompanies({ page: 1, limit: 100 }));
    dispatch(fetchMarketplaces({ page: 1, limit: 100 }));
  }, []);
  useEffect(() => {
    if (currentCompany) {
      form.setValue("marketplace_id", currentCompany.marketplace_id);
      form.setValue("group_id", currentCompany.group_id);
      form.setValue("seller_name", currentCompany.seller_name);
      form.setValue("inn", currentCompany.inn);
      form.setValue("nalog", currentCompany.nalog);
      form.setValue("forma_naloga", currentCompany.forma_naloga);
      form.setValue("dni_vsego", currentCompany.dni_vsego);
      form.setValue("dni_wb", currentCompany.dni_wb);
    }
  }, [currentCompany]);

  return (
    <div className="info__wrapper  px-[7px] py-1 sm:portrait:pl-[30px] md:landscape:pl-[30px] sm:pr-[28px] sm:portrait:py-[10px]  md:landscape:py-[10px] 2xl:pl-[50px] 2xl:pt-[34px] w-full">
      <InfoHeader
        icon="companies"
        title={id ? "Редактировать компанию" : "Добавить компанию"}
        type="companies"
        back
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[600px] block left-[50%]  px-[0px]  sm:px-[80px] sm:absolute translate-x-0 sm:translate-x-[-50%] "
        >
          <ScrollArea className="overflow-hidden  ">
            <ScrollAreaViewport className=" max-h-[calc(100vh-150px)] p-[1px]">
              <FormField
                control={form.control}
                name="marketplace_id"
                render={({ field }) => (
                  <FormItem>
                    <SelectWithSearchMarcetplace
                      data={field.value}
                      updateData={field.onChange}
                      allData={marketplaces}
                      type="marketplace"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="group_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <SelectWithSearch
                      data={field.value}
                      updateData={(val) => {
                        field.onChange(val);
                      }}
                      allData={groups}
                      type="group_company"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seller_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Название компании
                      <span className="text-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Напишите название" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      ИНН
                      <span className="text-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder="Напишите ИНН"
                        pattern="\d*"
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                          const target = e.target as HTMLInputElement; // Приведение типа
                          // Проверяем, что введено только число
                          if (!/^\d*$/.test(target.value)) {
                            target.value = target.value.replace(/[^\d]/g, ""); // Заменяем все нецифровые символы на пустое
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormItem>
                <Multiselect
                  data={currentEmployees}
                  updateData={updateEmployees}
                  allData={allData}
                  label="Сотрудники"
                  isRequired={false}
                  maxNum={3}
                />
              </FormItem> */}
              <FormField
                control={form.control}
                name="forma_naloga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Форма налога
                      <span className="text-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="py-4 px-4 font-[500] bg-white text-[14px] ">
                          <SelectValue placeholder="Выберите форму налога" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="cursor-pointer" value="ОСНО">
                            ОСНО
                          </SelectItem>
                          <SelectItem value="УСН">УСН</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nalog"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ставка налога</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="0"
                        pattern="\d*"
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                          const target = e.target as HTMLInputElement; // Приведение типа
                          // Проверяем, что введено только число
                          if (!/^\d*$/.test(target.value)) {
                            target.value = target.value.replace(/[^\d]/g, ""); // Заменяем все нецифровые символы на пустое
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="tax_total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Налог</FormLabel>
                    <FormControl>
                      <Input1
                        placeholder="Размер налога"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="dni_vsego"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>К заказу (дни)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="К заказу (дни)"
                        type="text"
                        pattern="\d*"
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                          const target = e.target as HTMLInputElement; // Приведение типа
                          // Проверяем, что введено только число
                          if (!/^\d*$/.test(target.value)) {
                            target.value = target.value.replace(/[^\d]/g, ""); // Заменяем все нецифровые символы на пустое
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dni_wb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>К отгрузке на склад WB (дни)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        pattern="\d*"
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                          const target = e.target as HTMLInputElement; // Приведение типа
                          // Проверяем, что введено только число
                          if (!/^\d*$/.test(target.value)) {
                            target.value = target.value.replace(/[^\d]/g, ""); // Заменяем все нецифровые символы на пустое
                          }
                        }}
                        placeholder="К отгрузке на склад WB (дни)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ScrollAreaViewport>
            <Scrollbar className="w-[6px]" />
          </ScrollArea>
          <div className="flex justify-start gap-[20px] mt-6">
            <Button
              variant={"default"}
              disabled={!form.formState.isDirty && !form.formState.isValid}
              className="w-fit py-2 px-4"
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

export default EditCompanyPage;
