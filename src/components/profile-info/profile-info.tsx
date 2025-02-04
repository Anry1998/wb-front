import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { getUser } from "@/store/user/selectors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import ThemeSwitch from "../theme-switch/theme-switch";
import { User } from "@/types/user.interface";
import { updateEmployee } from "@/store/employee/api-actions";

function ProfileInfo(): JSX.Element {
  const user = useAppSelector(getUser) ?? ({} as User);

  const { name, surname, patronymic, login, telegram } = user;

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
      z.string().min(1, "Заполните поле")
    ),
    login: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
    tg: z
      .preprocess(
        (val) => (typeof val === "string" ? val.trim() : val),
        z.string()
      )
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      surname: surname,
      patronymic: patronymic,
      login: login,
      tg: telegram,
    },
  });

  const isDisabledBtn = !form.formState.isDirty || !form.formState.isValid;
  const dispatch = useAppDispatch();
  async function onSubmit(_dto: z.infer<typeof formSchema>) {
    form.reset();
    dispatch(
      updateEmployee({
        ..._dto,
        id: user.id,
        roles_id: user.roles_id.map(({ role_id }) => role_id),
      })
    );
  }

  return (
    <div className="flex flex-col mt-[4px] justify-between p-2 sm:portait:md:landscape:px-4  sm:portait:md:landscape:py-5 w-[50%] lg:w-[40%] border rounded-xl border-purple-100">
      <div className="flex flex-col justify-between items-start relative ">
        <h2 className="font-semibold text-title">Настройки</h2>
        <div className="flex gap-2 items-center mt-1 ">
          <span className="font-normal text-basic text-purple-925">
            {" "}
            Сменить тему
          </span>
          <ThemeSwitch />
        </div>{" "}
      </div>
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {" "}
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
                    <Input placeholder="Напишите фамилию" {...field} />
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
                    <Input placeholder="Напишите имя" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
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
                    <Input placeholder="Напишите отчество" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <>
                      <span>Логин </span>
                      <span className="text-error">*</span>
                    </>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Напишите логин" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <>
                      <span>Telegram </span>
                    </>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Напишите ник telegram" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={"default"} disabled={isDisabledBtn} type="submit">
              Сохранить
            </Button>
          </form>
        </Form>
      </>
    </div>
  );
}

export default ProfileInfo;
