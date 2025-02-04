import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../../ui/button";
import sprite from "/sprite.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hooks";
import {
  checkNetCost,
  saveExampleNetCost,
  saveNetCost,
} from "@/store/catalog/api-actions";
import UploadedData from "./uploaded-data";
import { State } from "@/types/state.type";
import { getCheckedData, getCurrentCompanyId } from "@/store/catalog/selectors";
import { clearCheckedData } from "@/store/catalog/catalog-data";

function UploadModal(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);
  const checkedData =
    useAppSelector((state: State) => getCheckedData(state, "net_cost")) ?? [];
  const dispatch = useAppDispatch();
  const fileSizeLimit = 5 * 1024 * 1024;
  const fileTypeLimit = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const companyId = useAppSelector(getCurrentCompanyId);

  const isDisabledBtn = !file;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxSize: fileSizeLimit,
    onDrop,
  });

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!file) {
      return;
    }
    dispatch(checkNetCost({ file: file, id: 4523 })).then(
      (res) => res.meta.requestStatus === "fulfilled"
    );
  }

  const saveExample = () =>
    dispatch(saveExampleNetCost({ id: 4523, pattern: 1 }));

  const saveData = () =>
    dispatch(saveNetCost({ data: checkedData, id: 4523 })).then(
      (res) => res.meta.requestStatus === "fulfilled" && setOpen(false)
    );

  useEffect(() => {
    setFile(undefined);
    return () => {
      dispatch(clearCheckedData());
    };
  }, [!open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        disabled={!!companyId}
        className="px-1.5 py-1.5 h-[28px] hover:bg-purple-100 gap-2 rounded-lg bg-purple-0 border-purple-500 text-purple-500 flex shadow-none justify-center items-center  focus-visible:outline-purple-500 focus:outline-purple-500  disabled:border-purple-200 disabled:bg-purple-0 max-w-min disabled:opacity-50 text-basic"
      >
        <svg
          className={`size-2 md:size-3 xl:size-4 ${
            !companyId
              ? "[--svg-color:--svg-color-disabled]"
              : "[--svg-color:--svg-color-hover]"
          }`}
        >
          <use xlinkHref={`${sprite}#upload`}></use>
        </svg>
        <span className="hidden sm:inline text-[12px]">Загрузить</span>
      </DialogTrigger>
      <DialogContent className="w-[70%] max-w-[358px] p-3 rounded-2xl text-purple-925">
        <DialogHeader className="items-start">
          <DialogTitle className="mt-1.5 text-title">
            Загрузка из файла
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {!checkedData.length ? (
          <>
            <div className="flex flex-col items-center pt-2 pb-2">
              <span className="text-[14px] self-start">
                Шаг 1. Скачайте и заполните шаблон
              </span>
              <Button
                variant={"outline"}
                className=" shadow-none  flex items-center gap-2 p-2 mt-2 text-basic  hover:bg-purple-100 w-max px-[10px] xl:p-[10px] [&_svg]:size-2.5 2xl:[&_svg]:size-4"
                onClick={saveExample}
              >
                <span className="inline ">Скачать</span>
                <svg className="">
                  <use xlinkHref={`${sprite}#upload`}></use>
                </svg>
              </Button>
            </div>
            <span className="text-[14px]">
              Шаг 2. Загрузите заполненный шаблон
            </span>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-2" {...getRootProps()}>
                <Label
                  variant={"uploadLabel"}
                  className={` ${isDragActive && "bg-purple-10"}`}
                >
                  {file ? (
                    <>
                      <span>Выбран файл {file.name}</span>
                      <span>Для загрузки нажмите кнопку "Загрузить"</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3 md:w-4 md:h-4 xl:w-5 xl:h-5 mb-[14px]">
                        <use xlinkHref={`${sprite}#file-add`}></use>
                      </svg>
                      <span className="text-[14px] ">
                        Перенесите файл в зону загрузки или
                      </span>
                      <span className="text-purple-500 text-[14px]">
                        {" "}
                        нажмите для выбора
                      </span>
                    </>
                  )}
                </Label>
                <Input
                  type="file"
                  className="hidden"
                  accept={fileTypeLimit.join()}
                  {...getInputProps()}
                />
              </div>
              <Button
                variant={"default"}
                disabled={isDisabledBtn}
                type="submit"
                className="w-full"
              >
                Загрузить
              </Button>
            </form>
          </>
        ) : (
          <UploadedData data={checkedData} saveData={saveData} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default UploadModal;
