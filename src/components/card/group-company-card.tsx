import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyGroup } from "@/types/company.interface";
import CardAvatar from "../card-avatar/card-avatar";
import CardFooterItem from "../card-footer-item/card-footer-item";
import { useNavigate } from "react-router-dom";

type GroupCompanyCardProps = {
  company: CompanyGroup;
};

function GroupCompanyCard({ company }: GroupCompanyCardProps): JSX.Element {
  const { group_name, counter } = company;
  const totalAmount = counter;
  const navigate = useNavigate();
  return (
    <>
      {/* <EditGroupCompanyForm open={open} setOpen={setOpen} company={company} /> */}
      <Card
        className="group h-[80px]"
        onClick={() =>
          navigate("/personal/editgroupcompany?id=" + company.group_id)
        }
      >
        <CardHeader>
          <CardAvatar name={group_name} type="company" />
          <CardTitle>{group_name}</CardTitle>
        </CardHeader>
        <CardFooter className="h-[24px]">
          <CardFooterItem
            name="companies"
            icon="companies"
            descrtiption={totalAmount}
          />
          {/* <div className="sm:hidden flex gap-1 group-hover:flex"></div> */}
        </CardFooter>
      </Card>
    </>
  );
}

export default GroupCompanyCard;
