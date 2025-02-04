import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import {
  // getCompanyUpdating,
  getHasCompanyError,
} from "@/store/company/selectors";
import { Company } from "@/types/company.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

import EditFormModal from "../modal-wrapper/edit-form-modal";
// import { getEmployees } from "@/store/employee/selectors";
import { updateCompany } from "@/store/company/api-actions";
import { adaptEditCompanyToServer } from "@/utils/adapters/adaptToServer";
import { ScrollAreaViewport, Scrollbar } from "@radix-ui/react-scroll-area";
import SelectWithSearchMarcetplace from "@/components/select-with-search/select-with-search-marketplace";
import { getMarketplaces } from "@/store/marketplace/selectors";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectWithSearch from "@/components/select-with-search/select-with-search";
import { getGroupCompanies } from "@/store/group-company/selectors";

type EditCompanyFormProps = {
  company: Company;
  open: boolean;
  setOpen: (open: boolean) => void;
};

function EditCompanyForm({
  company,
  open,
  setOpen,
}: EditCompanyFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const marketplaces = useAppSelector(getMarketplaces) ?? [];
  // const isUpdating = useAppSelector(getCompanyUpdating);
  const groups = useAppSelector(getGroupCompanies) || [];

  const hasError = useAppSelector(getHasCompanyError);
  // const allData = useAppSelector(getEmployees) ?? [];
  const {
    seller_id,
    inn,
    seller_name,
    // totalAccounts,
    nalog,
    forma_naloga,
    dni_vsego,
    dni_wb,
    marketplace_id,
    // order_days,
    // shipment_days,
    // status,
  } = company;
  // const [currentEmployees, setCurrentEmployees] =
  //   useState<number>(totalAccounts);
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
    inn: z.number(),
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
      marketplace_id,
      seller_name,
      inn,
      nalog,
      forma_naloga,
      dni_vsego,
      dni_wb,
      group_id: Number(company.group_id),
    },
    reValidateMode: "onBlur",
  });
  const isDisabledBtn = false;

  // const updateEmployees = (data: number[]) => setCurrentEmployees(data);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const adaptedData = adaptEditCompanyToServer({ ...data });
    dispatch(
      updateCompany({
        ...adaptedData,
        seller_id: seller_id,
        // accounts: currentEmployees,
      })
    ).then(() => {
      !hasError && setOpen(false);
    });
    form.reset();
    setOpen(false);
  }

  useEffect(() => {
    // updateEmployees(employees);
    return () => {
      form.reset;
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <EditFormModal type="компанию">
        <ScrollArea className="overflow-hidden ">
          <ScrollAreaViewport className=" max-h-[60vh] p-[1px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="edit-company-form"
              >
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
                          type="number"
                          className="appearance-none"
                          placeholder="Напишите ИНН"
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
                        <Input type="number" placeholder="0" {...field} />
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
                      <Input
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
                          type="number"
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={`${field.value}`}
                    >
                      <FormControl>
                        <SelectTrigger className=" mt-[6px]">
                          <SelectValue
                            className="placeholder:text-solitude-200"
                            placeholder="Выберите статус"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className=" h-min max-h-[120px] md:max-h-[180px]">
                        {Object.entries(CompanyStatus)?.map(([key, value]) => (
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
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              </form>
            </Form>
          </ScrollAreaViewport>
          <Scrollbar className="w-[6px]" />
        </ScrollArea>
        <Button
          variant={"default"}
          disabled={isDisabledBtn}
          type="submit"
          form="edit-company-form"
        >
          Сохранить
        </Button>
      </EditFormModal>
    </Dialog>
  );
}

export default EditCompanyForm;
