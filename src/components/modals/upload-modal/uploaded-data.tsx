import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NetCostServer } from "@/types/catalog.interface";
import { adaptNetCostListToClient } from "@/utils/adapters/adaptersToClient";

type UploadedDataProps = {
  saveData: () => void;
  data: NetCostServer[];
};

function UploadedData({ data, saveData }: UploadedDataProps): JSX.Element {
  const tableData = adaptNetCostListToClient(data);

  return (
    <div className="w-full mt-[10px] overflow-hidden">
      <div className="max-h-[55vh] xl:max-h-[45vh] my-2">
        <ScrollArea className="max-h-[50vh] sm:max-h-[45vh] select-none ">
          <Table>
            <TableHeader key="header">
              <TableRow className="border-b-purple-100">
                <TableHead className="sm:px-[10px] sm:py-[6px] text-purple-925 text-basic">
                  Артикул
                </TableHead>
                <TableHead className="min-w-[100px] sm:px-[10px] sm:py-[6px] text-purple-925 text-basic">
                  Баркод
                </TableHead>
                <TableHead className="sm:px-[10px] sm:py-[6px] text-purple-925 text-basic">
                  Дата себестоимосости
                </TableHead>

                <TableHead className="sm:px-[10px] sm:py-[6px] text-purple-925 text-basic">
                  Новая себестоимость
                </TableHead>
                <TableHead className="sm:px-[10px] sm:py-[6px] text-purple-925 text-basic">
                  Новая дата
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map(
                ({
                  new_date,
                  sebes_date,
                  new_sebestoimost,
                  artikul,
                  barkod,
                }) => (
                  <TableRow className="border-b-purple-100" key={artikul}>
                    {/* <TableCell className="sm:px-[10px] py-0 text-solitude-200 text-basic">
                      {company}
                    </TableCell> */}
                    <TableCell className="min-w-[100px] sm:px-[10px] py-0 text-solitude-200 text-basic">
                      {artikul}
                    </TableCell>
                    <TableCell className="sm:px-[10px] py-0 text-solitude-200 text-basic">
                      {barkod}
                    </TableCell>
                    <TableCell className="sm:px-[10px] py-0 text-solitude-200 text-basic">
                      {sebes_date}
                    </TableCell>
                    <TableCell className="sm:px-[10px] py-0 text-solitude-200 text-basic">
                      {new_sebestoimost}
                    </TableCell>
                    <TableCell className="sm:px-[10px] py-0 text-solitude-200 text-basic">
                      {new_date}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <Button variant={"default"} type="submit" onClick={saveData}>
        Загрузить
      </Button>
    </div>
  );
}

export default UploadedData;
