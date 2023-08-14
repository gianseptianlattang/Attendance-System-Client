import { Button, Td, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee } from "../../service/reducer/employeeReducer";
import { UpdateSalaryModal } from "./ChangeSalary";

export const EmployeeDetail = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.dataEmployee.dataUser);
  const [editModalStates, setEditModalStates] = useState({});

  const openEditModal = (itemId) => {
    setEditModalStates((prevStates) => ({
      ...prevStates,
      [itemId]: true,
    }));
  };

  const closeEditModal = (itemId) => {
    setEditModalStates((prevStates) => ({
      ...prevStates,
      [itemId]: false,
    }));
  };

  useEffect(() => {
    dispatch(getAllEmployee());
  }, [dispatch]);

  return result.map((item, index) => {
    return (
      <>
        <Tr key={item.id}>
          <Td>{index + 1}</Td>
          <Td>{item.username}</Td>
          <Td>{item.email}</Td>
          <Td>{item.fullname}</Td>
          <Td>{item.Job_Type.jobType}</Td>
          <Td>{item.monthlySalary}</Td>
          <Td>
            <Button colorScheme="blue" onClick={() => openEditModal(item.id)}>
              Edit
            </Button>
            <UpdateSalaryModal
              isOpen={editModalStates[item.id] || false}
              onClose={() => closeEditModal(item.id)}
              item={item}
            />
          </Td>
          <Td>{item.isActive ? "Active" : "Not Active"}</Td>
        </Tr>
      </>
    );
  });
};
