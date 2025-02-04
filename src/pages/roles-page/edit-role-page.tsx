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
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import {
  addRole,
  fetchRoleById,
  fetchRoles,
  updateRole,
} from "@/store/role/api-actions";
import { getAllPermissions } from "@/store/role/selectors";
import { Checkbox } from "@/components/ui/checkbox";
import { UserRole } from "@/types/user.interface";
import MultiselectForRoles from "@/components/multiselect/multiselect-for-roles";
const EditRolePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const allData = useAppSelector(getAllPermissions);
  const [currentRole, setCurrentRole] = useState<UserRole>();
  const [currentPermissions, setCurrentPermissions] = useState<number[]>(
    currentRole?.permissions.map(({ id }) => id) ?? []
  );
  const formSchema = z.object({
    name: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string()
    ),
    vailableEveryone: z.boolean(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentRole?.name ?? "",
      vailableEveryone: currentRole?.vailableEveryone ?? false,
    },
  });
  async function onSubmit({}: z.infer<typeof formSchema>) {
    if (!id) {
      dispatch(
        addRole({
          name: form.getValues("name"),
          permissions: currentPermissions,
          vailableEveryone: form.getValues("vailableEveryone"),
        })
      ).then(() => {
        form.reset();
        navigate("/personal/roles");
      });
    } else {
      dispatch(
        updateRole({
          id: +id,
          name: form.getValues("name"),
          permissions: currentPermissions,
          vailableEveryone: form.getValues("vailableEveryone"),
        })
      ).then(() => {
        form.reset();
        navigate("/personal/roles");
      });
    }
  }
  const updatePermissions = (data: number[]) => setCurrentPermissions(data);
  const hasMounted = useRef(false);
  useEffect(() => {
    if (hasMounted.current) {
      return;
    }
    if (id) {
      dispatch(fetchRoleById(+id)).then((res) => {
        setCurrentRole(res.payload as UserRole);
      });
    }
    dispatch(fetchRoles({ page: 1, limit: 100 }));

    hasMounted.current = true;
  }, [dispatch, id]);
  useEffect(() => {
    form.setValue("name", currentRole?.name ?? "");
    form.setValue("vailableEveryone", currentRole?.vailableEveryone ?? false);

    setCurrentPermissions(currentRole?.permissions.map(({ id }) => id) ?? []);
  }, [currentRole]);

  const isPermissionsChanged = () => {
    const originalPermissions =
      currentRole?.permissions.map(({ id }) => id) ?? [];
    return (
      JSON.stringify(originalPermissions.sort()) !==
      JSON.stringify(currentPermissions.sort())
    );
  };

  const isFormChanged = () => {
    return (
      form.getValues("name") !== currentRole?.name ||
      form.getValues("vailableEveryone") !== currentRole?.vailableEveryone ||
      isPermissionsChanged()
    );
  };

  form.watch("vailableEveryone");

  return (
    <div className="info__wrapper  px-[10px]">
      <InfoHeader
        icon="user-role"
        title={id ? "Редактировать роль" : "Создать роль"}
        type="roles"
        back
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[600px]  block left-[50%]  px-[0px]  sm:px-[80px] sm:absolute translate-x-0 sm:translate-x-[-50%] "
        >
          <ScrollArea className="overflow-y-hidden ">
            <ScrollAreaViewport className=" max-h-[60vh] px-[10px]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <>
                        <span>Название роли </span>
                        {/* {isRequired && (
                          <span className="text-error">*</span>
                        )}{" "} */}
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
                name="vailableEveryone"
                render={({ field }) => (
                  <FormItem className="flex gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        className="w-5 h-5 flex  items-center justify-center border rounded-md"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </Checkbox>
                    </FormControl>
                    <FormLabel>Доступно всем</FormLabel>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <MultiselectForRoles
                  data={currentPermissions}
                  updateData={updatePermissions}
                  allData={allData}
                  label="Разрешения"
                  isRequired={false}
                  maxNum={0}
                />
              </FormItem>
            </ScrollAreaViewport>
            <Scrollbar className="w-[6px]" />
          </ScrollArea>
          <div className="flex justify-start gap-[20px] mt-6">
            <Button
              variant={"default"}
              disabled={
                Number(id) === 1 ||
                !isFormChanged() ||
                currentPermissions.length === 0 ||
                form.getValues("name") === ""
              }
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

export default EditRolePage;
