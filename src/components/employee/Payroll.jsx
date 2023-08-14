import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { PayrollDetail } from "./PayrollDetail";

export const Payroll = () => {
  return (
    <>
      <TableContainer borderWidth={2}>
        <Table
          size={{ base: "sm", md: "md" }}
          variant="striped"
          colorScheme="blue"
        >
          <Thead>
            <Tr>
              <Th width="fit-content" color={"blue.500"}>
                No
              </Th>
              <Th width="50%" color={"blue.500"}>
                Month Year
              </Th>
              <Th width="50%" color={"blue.500"}>
                Total Working Days
              </Th>
              <Th width="50%" color={"blue.500"}>
                Total Salary
              </Th>
              <Th width="50%" color={"blue.500"}>
                Deducted Salary
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <PayrollDetail />
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
