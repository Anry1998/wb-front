import { Dialog } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppSelector } from "@/hooks/store-hooks";
import {
  getGroupPosting,
  getHasGroupError,
} from "@/store/group-company/selectors";
import { CompanyGroup } from "@/types/company.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import EditFormModal from "../modal-wrapper/edit-form-modal";
// import { getAllCompanies } from "@/store/company/selectors";
import { useAppDispatch } from "@/hooks/store-hooks";
import { updateGroupCompany } from "@/store/group-company/api-actions";
type EditGroupCompanyFormProps = {
  company: CompanyGroup;
  open: boolean;
  setOpen: (open: boolean) => void;
};

function EditGroupCompanyForm({
  company,
  open,
  setOpen,
}: EditGroupCompanyFormProps): JSX.Element {
  const { group_id, group_name } = company;
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector(getGroupPosting);
  const hasError = useAppSelector(getHasGroupError);

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
  const isDisabledBtn =
    !form.formState.isValid || isUpdating || !form.formState.isDirty;

  // const updateCompanies = (data: number[]) => setCurrentCompanies(data);

  async function onSubmit({ group_name }: z.infer<typeof formSchema>) {
    dispatch(
      updateGroupCompany({ group_id, group_name })
      // updateGroupCompany({ id, name })
    ).then(() => !hasError && setOpen(false));
    form.reset();
  }

  useEffect(() => {
    return () => {
      form.reset;
    };
  }, []);

  useEffect(() => {
    if (open) {
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <EditFormModal type="группу">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
            {/* <FormItem>
              <Multiselect
                data={currentCompanies}
                updateData={updateCompanies}
                allData={allData}
                label="Компании"
                isRequired={false}
                maxNum={6}
              />
            </FormItem> */}
            <Button
              variant={"default"}
              disabled={isDisabledBtn}
              className="w-full mt-2"
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

export default EditGroupCompanyForm;
