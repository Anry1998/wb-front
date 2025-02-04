import EmptyItems from "@/components/empty-category/empty-items";
import InfoHeader from "@/components/info-header/info-header";
function ReportsPage(): JSX.Element {
  return (
    <div className="info__wrapper px-[7px] py-1 sm:portrait:pl-[30px] md:landscape:pl-[30px] sm:pr-[28px] sm:portrait:py-[10px]  md:landscape:py-[10px]2xl:pl-[50px] 2xl:pt-[34px] w-full">
      <InfoHeader icon="chart-pie" title="Отчеты" type="reports" />
      <div className="h-[68vh] flex justify-center items-center">
        <EmptyItems />
      </div>
    </div>
  );
}

export default ReportsPage;
