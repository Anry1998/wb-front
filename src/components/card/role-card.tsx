import { UserRole } from "@/types/user.interface";
import CompanyCardAvatar from "../card-avatar/company-card-avatar";
import CardFooterItem from "../card-footer-item/card-footer-item";
import DeleteAlert from "../modals/delete-alert/delete-alert";
import RoleForm from "../modals/role-forms/role-form";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type RoleCardProps = {
  role: UserRole;
};
function RoleCard({ role }: RoleCardProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const { id, name, permissions } = role;
  const totalAmount = permissions ? permissions.length : 0;
  const navigate = useNavigate();
  return (
    <>
      <RoleForm type="edit" role={role} open={open} setOpen={setOpen} />
      <Card
        className={`group relative ${
          role.name === "Администратор" &&
          "bg-gray-100 hover:bg-gray-100 hover:cursor-not-allowed "
        }`}
      >
        <div
          onClick={() =>
            role.name !== "Администратор" &&
            navigate("/personal/editrole?id=" + id)
          }
        >
          <CardHeader>
            <CompanyCardAvatar name={name} type={name} />
            <CardTitle>{name}</CardTitle>
          </CardHeader>
          <CardFooter>
            <CardFooterItem
              name="permissions"
              icon="user-role"
              descrtiption={totalAmount}
            />
          </CardFooter>
        </div>
        <div
          className={` absolute right-3 z-40  bottom-2   group-hover:absolute ${
            role.name === "Администратор" && "hidden"
          }`}
        >
          <DeleteAlert inCard={true} id={[id]} type="role" />
        </div>
      </Card>
    </>
  );
}
export default RoleCard;
