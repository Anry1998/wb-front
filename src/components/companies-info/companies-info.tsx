import { Company } from "@/types/company.interface";
import CompanyCard from "../card/company-card";
import EmptyItems from "../empty-category/empty-items";

type CompaniesInfoProps = {
  companies: Company[] | null;
};

function CompaniesInfo({ companies }: CompaniesInfoProps): JSX.Element {
  const isEmpty = !companies || companies.length === 0;
  return (
    <>
      {isEmpty ? (
        <EmptyItems />
      ) : (
        <div
          className={`info__list  grid  grid-cols-[repeat(auto-fit,minmax(180px,250px))]  gap-2`}
        >
          {companies.map((company) => (
            <CompanyCard key={company.seller_id} company={company} />
          ))}
        </div>
      )}
    </>
  );
}

export default CompaniesInfo;
