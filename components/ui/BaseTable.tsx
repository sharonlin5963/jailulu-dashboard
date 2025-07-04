import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { ReactNode } from "react";

export interface Column<R> {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: any, row: R) => ReactNode;
}

interface TableData<R extends { id: string | number }> {
  columns: Column<R>[];
  rows: R[];
  maxHeight?: number;
  stickyHeader?: boolean;
  hover?: boolean;
}

const BaseTable = <R extends { id: string | number }>({
  columns,
  rows,
  maxHeight = 500,
  stickyHeader = false,
  hover = true,
}: TableData<R>) => {
  return (
    <Paper>
      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover={hover} key={row.id}>
                  {columns.map((column) => {
                    const value = (row as any)[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value, row) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BaseTable;
