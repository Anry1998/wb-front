import { Employee } from "@/types/employee.interface";
import EmployeeCard from "../card/employee-card";
import EmptyItems from "../empty-category/empty-items";

type EmployeesInfoProps = {
  employees: Employee[] | null;
};

function EmployeesInfo({ employees }: EmployeesInfoProps): JSX.Element {
  const isEmpty = !employees || employees.length === 0;
  return (
    <>
      {isEmpty ? (
        <EmptyItems />
      ) : (
        <div
          className={`info__list  grid  grid-cols-[repeat(auto-fit,minmax(200px,240px))]  gap-2`}
        >
          {" "}
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </>
  );
}

export default EmployeesInfo;
