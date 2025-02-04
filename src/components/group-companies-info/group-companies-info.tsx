import { CompanyGroup } from "@/types/company.interface";
import GroupCompanyCard from "../card/group-company-card";
import EmptyItems from "../empty-category/empty-items";

type GroupCompaniesInfoProps = {
  companies: CompanyGroup[] | null;
};

function GroupCompaniesInfo({
  companies,
}: GroupCompaniesInfoProps): JSX.Element {
  const isEmpty = !companies || companies.length === 0;
  return (
    <>
      {isEmpty ? (
        <EmptyItems />
      ) : (
        <div
          className={`info__list  grid  grid-cols-[repeat(auto-fit,minmax(180px,1fr))]  gap-2`}
        >
          {companies.map((groupCompany) => (
            <GroupCompanyCard
              key={groupCompany.group_id}
              company={groupCompany}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default GroupCompaniesInfo;
