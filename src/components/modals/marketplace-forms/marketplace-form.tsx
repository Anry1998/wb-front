import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import {
  addMarketplace,
  updateMarketplace,
} from "@/store/marketplace/api-actions";
import {
  getHasMarketplaceError,
  getMarketplacePosting,
} from "@/store/marketplace/selectors";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
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
import { Dialog } from "@radix-ui/react-dialog";
import { Marketplace } from "@/types/company.interface";
import EditFormModal from "../modal-wrapper/edit-form-modal";

type MarketplaceFormProps = {
  marketplace: Marketplace;
  type: "add" | "edit";
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CurrentWrapper = ({
  type,
  children,
}: {
  type: string;
  children: ReactNode;
}) =>
  type === "add" ? (
    <AddFormModal type="маркетплейс" action="Создать">
      {children}
    </AddFormModal>
  ) : (
    <EditFormModal type="маркетплейс">{children}</EditFormModal>
  );

function MarketplaceForm({
  marketplace,
  type,
  setOpen,
  open,
}: MarketplaceFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isPosting = useAppSelector(getMarketplacePosting);
  const hasError = useAppSelector(getHasMarketplaceError);
  const name = marketplace.marketplace_name ?? "";
  const formSchema = z.object({
    name: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });
  const isDisabledBtn =
    !form.formState.isDirty || !form.formState.isValid || isPosting;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    switch (type) {
      case "add":
        dispatch(addMarketplace(data)).then(() => !hasError && setOpen(false));
        break;
      case "edit":
        dispatch(updateMarketplace({ id: marketplace.id, ...data })).then(
          () => !hasError && setOpen(false)
        );
        break;
    }
  }
  useEffect(() => {
    return () => {
      form.reset;
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <CurrentWrapper type={type}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Название маркетплейса
                    <span className="text-error">*</span>
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
            <Button
              variant={"default"}
              disabled={isDisabledBtn}
              type="submit"
              className="w-full mt-2"
            >
              Создать
            </Button>
          </form>
        </Form>
      </CurrentWrapper>
    </Dialog>
  );
}

export default MarketplaceForm;
