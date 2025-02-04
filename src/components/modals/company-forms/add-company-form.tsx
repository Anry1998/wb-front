import { Dialog } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { addCompany, fetchCompanies } from "@/store/company/api-actions";
import {
  getCompanyUpdating,
  getHasCompanyError,
} from "@/store/company/selectors";
import { getGroupCompanies } from "@/store/group-company/selectors";
import {
  adaptAddCompanyToServer,
  CompanyForm,
} from "@/utils/adapters/adaptToServer";
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
import AddFormModal from "../modal-wrapper/add-form-modal";
import SelectWithSearch from "@/components/select-with-search/select-with-search";
import { fetchGroupCompanies } from "@/store/group-company/api-actions";
import {
  ScrollArea,
  ScrollAreaViewport,
  Scrollbar,
} from "@radix-ui/react-scroll-area";
import { getMarketplaces } from "@/store/marketplace/selectors";
import SelectWithSearchMarcetplace from "@/components/select-with-search/select-with-search-marketplace";
import { fetchMarketplaces } from "@/store/marketplace/api-actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddCompanyForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const marketplaces = useAppSelector(getMarketplaces) ?? [];
  const groups = useAppSelector(getGroupCompanies) || [];
  const [savedValues, setSavedValues] = useState<CompanyForm>();

  useEffect(() => {
    dispatch(fetchMarketplaces({ page: 1, limit: 100 }));
    dispatch(fetchGroupCompanies({ page: 1, limit: 100 }));
    setSavedValues({
      marketplace_id: 0,
      group_id: 0,
      seller_name: "",
      inn: 0,
      forma_naloga: "",
      nalog: 0,
      dni_wb: 0,
      dni_vsego: 0,
    });
  }, []);
  const isUpdating = useAppSelector(getCompanyUpdating);
  const hasError = useAppSelector(getHasCompanyError);
  const [open, setOpen] = useState(false);
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
    inn: z.string().transform(Number),
    forma_naloga: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
    nalog: z.coerce
      .number()
      .nonnegative("Только положительные числа")
      .int("Только целые числа"),
    dni_wb: z.coerce
      .number()
      .nonnegative("Только положительные числа")
      .int("Только целые числа"),
    dni_vsego: z.coerce
      .number()
      .nonnegative("Только положительные числа")
      .int("Только целые числа"),
    // status: z.nativeEnum(CompanyStatus),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: savedValues,
    reValidateMode: "onBlur",
  });
  const isDisabledBtn =
    !form.formState.isDirty || !form.formState.isValid || isUpdating;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const adaptedData = adaptAddCompanyToServer(data);
    dispatch(addCompany(adaptedData)).then(() => {
      !hasError && setOpen(false);
    });
    dispatch(
      fetchCompanies({
        page: 1,
        limit: Number(localStorage.getItem("company-limit")),
      })
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        setSavedValues(form.getValues());
        !val && form.reset();
      }}
    >
      <AddFormModal type="компанию" action="Добавить">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="ml-0.5"
            id="add-company-form"
          >
            <ScrollArea className="overflow-hidden ">
              <ScrollAreaViewport className=" max-h-[60vh] p-[1px]">
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
                    <FormItem>
                      <SelectWithSearch
                        data={field.value}
                        updateData={(val) => field.onChange(val)}
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
                      <FormLabel className="font-normal text-basic text-purple-925">
                        ИНН
                        <span className="text-error">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Напишите ИНН"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          <SelectTrigger className="py-3.5 px-4 text-[12px] ">
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
                          type="number"
                          placeholder="Размер налога"
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
                      <FormLabel>К заказу (дни)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="К заказу (дни)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dni_vsego"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>К отгрузке на склад WB (дни)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="К отгрузке на склад WB (дни)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Статус</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className=" mt-[6px]">
                            <SelectValue
                              className="placeholder:text-solitude-200"
                              placeholder="Выберите статус"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className=" h-min max-h-[120px] md:max-h-[180px]">
                          {Object.entries(CompanyStatus)?.map(
                            ([key, value]) => (
                              <SelectItem
                                key={key}
                                className=" truncate  text-solitude-100"
                                value={`${value}`}
                              >
                                {
                                  CompanyStatusToName[
                                    key as keyof typeof CompanyStatusToName
                                  ]
                                }
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </ScrollAreaViewport>
              <Scrollbar className="w-[6px]" />
            </ScrollArea>
          </form>
        </Form>
        <Button
          variant={"default"}
          disabled={isDisabledBtn}
          type="submit"
          className="w-full mt-2"
          form="add-company-form"
        >
          Создать
        </Button>
      </AddFormModal>
    </Dialog>
  );
}

export default AddCompanyForm;
