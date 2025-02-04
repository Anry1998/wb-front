import CompaniesInfo from "@/components/companies-info/companies-info";
import InfoHeader from "@/components/info-header/info-header";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import {
  fetchGroupCompanies,
  fetchGroupCompanyById,
  updateGroupCompany,
} from "@/store/group-company/api-actions";
import {
  getCompanyForSearch,
  getCurrentGroupName,
} from "@/store/group-company/selectors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditGroupCompanyPage = () => {
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  useEffect(() => {
    dispatch(fetchGroupCompanies()).then(() => {
      dispatch(fetchGroupCompanyById(Number(id)));
    });
  }, []);
  const dispatch = useAppDispatch();
  const allCompanyData = useAppSelector(getCompanyForSearch);
  const group_name = useAppSelector(getCurrentGroupName);
  const formSchema = z.object({
    group_name: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // name: name,
      group_name: group_name,
    },
  });
  useEffect(() => {
    group_name && form.setValue("group_name", group_name);
  }, [group_name]);

  // const updateCompanies = (data: number[]) => setCurrentCompanies(data);

  async function onSubmit({ group_name }: z.infer<typeof formSchema>) {
    dispatch(
      updateGroupCompany({ group_id: Number(id), group_name })
      // updateGroupCompany({ id, name })
    );
    form.reset();
  }

  useEffect(() => {
    return () => {
      form.reset;
    };
  }, []);
  console.log(group_name === form.getValues("group_name"));
  form.watch("group_name");
  return (
    <div className="info__wrapper   px-[10px] w-full max-w-[500px]">
      <InfoHeader
        back
        icon="user-role"
        title="Редактировать группу"
        type="roles"
      />
      <div className="my-4 max-w-[300px] ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex justify-center align-bottom gap-4"
          >
            <FormField
              control={form.control}
              name="group_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название группы компаний</FormLabel>
                  <FormControl>
                    <Input placeholder="Напишите название" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant={"default"}
              disabled={
                group_name === form.getValues("group_name") ||
                form.getValues("group_name") === ""
              }
              style={{ alignSelf: "center" }}
              className="w-fit h-[35px] mt-4"
              type="submit"
            >
              Сохранить
            </Button>
          </form>
        </Form>
      </div>
      <p>Компании:</p>
      <CompaniesInfo companies={allCompanyData} />
    </div>
  );
};

export default EditGroupCompanyPage;
