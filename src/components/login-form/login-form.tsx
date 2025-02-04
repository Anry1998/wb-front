import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import { login } from "@/store/user/api-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import sprite from "/sprite.svg";
import { getAuthLoading } from "@/store/user/selectors";

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthLoading = useAppSelector(getAuthLoading);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const formSchema = z.object({
    login: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
    password: z.preprocess(
      (val) => (typeof val === "string" ? val.trim() : val),
      z.string().min(1, "Заполните поле")
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const handlePasswordShow = () => setPasswordVisible((prev) => !prev);
  const isDisabledBtn =
    !form.formState.isDirty || !form.formState.isValid || isAuthLoading;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    dispatch(login(data));
  }

  return (
    <div className="login-form__container flex flex-col justify-center items-center bg-purple-0 rounded-3xl w-[70%] max-w-[358px] px-6 py-6">
      <svg className="login-form__icon w-20 h-10 ">
        <use xlinkHref={`${sprite}#logo`}></use>
      </svg>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[100%] ">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-basic">Логин</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Напишите логин"
                    {...field}
                    className="placeholder:text-purple-100"
                  />
                </FormControl>
                <svg className="w-3 h-3 absolute bottom-3.5 right-3 hover:cursor-pointer [--svg-color:--svg-color-disabled]">
                  <use xlinkHref={`${sprite}#user`}></use>
                </svg>{" "}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-basic">Пароль</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Напишите пароль"
                      type={passwordVisible ? "text" : "password"}
                      {...field}
                      className="placeholder:text-purple-100"
                    />
                  </FormControl>
                  <svg
                    className="w-3 h-3  absolute bottom-3.5 right-3 hover:cursor-pointer [--svg-color:--svg-color-disabled] hover:[--svg-color:--svg-color]"
                    onClick={handlePasswordShow}
                  >
                    <use
                      xlinkHref={`${sprite}#${
                        passwordVisible ? "eye-crossed" : "eye"
                      }`}
                    ></use>
                  </svg>{" "}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={"default"}
            className="mt-2 w-full"
            disabled={isDisabledBtn}
            type="submit"
          >
            Вход
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
