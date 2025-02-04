import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Company } from "@/types/company.interface";
import CompanyCardAvatar from "../card-avatar/company-card-avatar";
import CardFooterItem from "../card-footer-item/card-footer-item";
import { useEffect, useRef, useState } from "react";
import DeleteAlert from "../modals/delete-alert/delete-alert";
import EditCompanyForm from "../modals/company-forms/edit-company-form";
import { useNavigate } from "react-router-dom";

type CompanyCardProps = {
  company: Company;
};

function CompanyCard({ company }: CompanyCardProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const { inn, seller_name, seller_id, totalAccounts } = company;
  const [width, setWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(cardRef?.current?.offsetWidth || 0);
  }, [window.innerWidth]);
  // const employeesTotal = employees ? employees.length : 0;
  // const marketplace = useAppSelector((state: State) =>
  //   geMarketplaceById(state, marketplace_id)
  // );
  const navigate = useNavigate();
  return (
    <>
      <EditCompanyForm company={company} open={open} setOpen={setOpen} />
      <Card
        className="group max-w-[300px] min-w-[180px] relative"
        ref={cardRef}
      >
        <div onClick={() => navigate("/personal/editcompany?id=" + seller_id)}>
          <CardHeader>
            {/* <CompanyCardAvatar name={seller_name} type={marketplace?.name} /> */}
            <CompanyCardAvatar name={seller_name} type={"company"} />

            <div className="flex-col ">
              <CardTitle style={{ width: width - 60 }}>{seller_name}</CardTitle>
              <CardDescription style={{ width: width - 60 }}>
                ИНН {inn}
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="h-12 flex flex-col">
            <CardFooterItem
              name="group"
              icon="companies"
              descrtiption={company.group_name || "-"}
            />
            <CardFooterItem
              name="employees"
              icon="employees"
              descrtiption={totalAccounts || "-"}
            />
          </CardFooter>
        </div>

        <div className="sm:hidden gap-1  items-start group-hover:flex absolute right-3 bottom-2">
          <DeleteAlert inCard={true} id={[seller_id]} type="company" />
        </div>
      </Card>
    </>
  );
}

export default CompanyCard;
