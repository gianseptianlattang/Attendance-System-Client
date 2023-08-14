import { Td, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../service/reducer/employeeReducer";

export const AttendanceDetail = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.dataEmployee.reportUser);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  if (result) {
    return result[0].Attendances.map((item, index) => {
      return (
        <>
          <Tr key={item.id}>
            <Td>{index + 1}</Td>
            <Td>{item.clockIn}</Td>
            <Td>{item.clockOut}</Td>
          </Tr>
        </>
      );
    });
  }
};
