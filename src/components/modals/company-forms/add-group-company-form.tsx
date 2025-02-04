import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import {
  getGroupPosting,
  getHasGroupError,
} from "@/store/group-company/selectors";
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
import { Dialog } from "@/components/ui/dialog";
import { addGroupCompany } from "@/store/group-company/api-actions";

function AddGroupCompanyForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isPosting = useAppSelector(getGroupPosting);
  const hasError = useAppSelector(getHasGroupError);
  const [open, setOpen] = useState(false);
  const formSchema = z.object({
    group_name: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group_name: "",
    },
  });
  const isDisabledBtn =
    !form.formState.isDirty || !form.formState.isValid || isPosting;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    dispatch(addGroupCompany(data)).then(() => !hasError && setOpen(false));
  }
  useEffect(() => {
    return () => {
      form.reset;
    };
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AddFormModal type="группу" action="Создать">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="group_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название группы компаний</FormLabel>
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
            <Button
              variant={"default"}
              disabled={isDisabledBtn}
              className="w-full mt-2"
              type="submit"
            >
              Создать
            </Button>
          </form>
        </Form>
      </AddFormModal>
    </Dialog>
  );
}

export default AddGroupCompanyForm;
