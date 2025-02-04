// import Multiselect from '@/components/multiselect/multiselect';
import { Dialog } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { addRole, updateRole } from "@/store/role/api-actions";
import {
  getAllPermissions,
  // getAllPermissions,
  getHasRoleError,
  // getRolePosting,
} from "@/store/role/selectors";
import { UserRole } from "@/types/user.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
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
import EditFormModal from "../modal-wrapper/edit-form-modal";
import {
  ScrollArea,
  ScrollAreaViewport,
  Scrollbar,
} from "@radix-ui/react-scroll-area";
import Multiselect from "@/components/multiselect/multiselect";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type RoleFormProps = {
  role: UserRole;
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
    <AddFormModal type="роль" action="Создать">
      {children}
    </AddFormModal>
  ) : (
    <EditFormModal type="роль">{children}</EditFormModal>
  );

function RoleForm({ role, type, open, setOpen }: RoleFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const hasError = useAppSelector(getHasRoleError);
  const allData = useAppSelector(getAllPermissions);
  const { permissions, id, name = "", vailableEveryone } = role;
  const data = permissions ? permissions.map(({ id }) => id) : [];
  const [currentPermissions, setCurrentPermissions] = useState<number[]>(data);
  const isRequired = type === "add";
  const formSchema = z.object({
    name: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
    vailableEveryone: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      vailableEveryone: vailableEveryone,
    },
  });
  const isDisabledBtn =
    (type === "add" && !form.formState.isDirty) ||
    !form.formState.isValid ||
    !currentPermissions.length;
  // !form.formState.isDirty;
  // const [currentPermissions, setCurrentPermissions] = useState<number[]>(data);
  const updatePermissions = (data: number[]) => setCurrentPermissions(data);
  //
  async function onSubmit({
    name,
    vailableEveryone,
  }: z.infer<typeof formSchema>) {
    switch (type) {
      case "add":
        dispatch(
          addRole({
            name,
            permissions: currentPermissions,
            vailableEveryone,
          })
        ).then(() => !hasError && setOpen(false));
        break;
      case "edit":
        dispatch(
          updateRole({
            id,
            name: name,
            permissions: currentPermissions,
            vailableEveryone,
          })
        ).then(() => !hasError && setOpen(false));
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
            <ScrollArea className="overflow-hidden ">
              <ScrollAreaViewport className=" max-h-[60vh] p-[1px]">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <>
                          <span>Название роли </span>
                          {isRequired && (
                            <span className="text-error">*</span>
                          )}{" "}
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
                    data={currentPermissions}
                    updateData={updatePermissions}
                    allData={allData}
                    label="Разрешения"
                    isRequired={isRequired}
                    maxNum={3}
                  />
                </FormItem>
                <FormField
                  control={form.control}
                  name="vailableEveryone"
                  render={({ field }) => (
                    <FormItem className="flex gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          className="w-5 h-5 flex items-center justify-center border rounded-md"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </Checkbox>
                      </FormControl>
                      <FormLabel>Доступно всем</FormLabel>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ScrollAreaViewport>
              <Scrollbar className="w-[6px]" />
            </ScrollArea>

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
      </CurrentWrapper>
    </Dialog>
  );
}

export default RoleForm;
