import { Td, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../service/reducer/employeeReducer";

export const PayrollDetail = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.dataEmployee.reportUser);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  if (result.length !== 0) {
    return result.map((item, index) => {
      console.log(item.User.monthlySalary, item.totalSalary);
      return (
        <>
          <Tr key={item.id}>
            <Td>{index + 1}</Td>
            <Td>{item.monthYear}</Td>
            <Td>{item.totalWorkingDays}</Td>
            <Td>{item.totalSalary}</Td>
            <Td>- {item.User.monthlySalary - item.totalSalary}</Td>
          </Tr>
        </>
      );
    });
  }
};
