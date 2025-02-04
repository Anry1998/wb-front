import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/hooks/store-hooks";
import { getAllRoles } from "@/store/role/selectors";
import { Employee } from "@/types/employee.interface";
import CardAvatar from "../card-avatar/card-avatar";
import CardFooterItem from "../card-footer-item/card-footer-item";
import DeleteAlert from "../modals/delete-alert/delete-alert";
import { useNavigate } from "react-router-dom";

type EmployeesCardProps = {
  employee: Employee;
};

function EmployeeCard({ employee }: EmployeesCardProps): JSX.Element {
  const {
    id,
    name,
    surname,
    patronymic,
    roles_id,
    login,
    telegram,
    companies_id,
  } = employee;
  const totalCount = companies_id?.length || 0;
  const rolesList = useAppSelector(getAllRoles);
  const roleNames = rolesList
    ? rolesList
        .filter(({ id }) => roles_id.includes(id))
        .map(({ name }) => name)
    : [];
  const allRoles = roleNames.length > 1 ? roleNames.join(", ") : roleNames;
  const navigate = useNavigate();
  return (
    <>
      <Card key={id} className="group relative">
        <div onClick={() => navigate("/personal/editemployee?id=" + id)}>
          <CardHeader>
            <CardAvatar name={name} type="company" />
            <div className="flex-col">
              <CardTitle>
                {surname + " "}
                {name + " "}
                {patronymic}
              </CardTitle>
              <CardDescription>{allRoles}</CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start">
            <CardFooterItem
              name="telegram"
              icon="telegram"
              descrtiption={telegram}
            />
            <CardFooterItem name="login" icon="user" descrtiption={login} />
            <CardFooterItem
              name="companies"
              icon="companies"
              descrtiption={totalCount}
            />
          </CardFooter>
        </div>
        <div className="sm:hidden gap-1  items-start group-hover:flex absolute right-3 bottom-2">
          <DeleteAlert id={[id]} type="employee" inCard={true} />
        </div>
      </Card>
    </>
  );
}

export default EmployeeCard;
