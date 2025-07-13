"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteFieldButton from "./delete-field-button";

export default function CurrentFormStateTable({
  formFields,
  selectOptions,
  onDelete,
}) {
  const getSelectLabel = (value) => {
    return selectOptions.find((opt) => opt.value === value)?.label || value;
  };

  const getFieldStatus = (field) => {
    return field.inputValue && field.selectValue ? "Complete" : "Incomplete";
  };

  const getStatusColor = (field) => {
    return field.inputValue && field.selectValue
      ? "text-green-600 font-medium"
      : "text-orange-600 font-medium";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Form State (Live Preview)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field Number</TableHead>
              <TableHead>Input Value</TableHead>
              <TableHead>Select Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formFields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell className="font-medium">Field {index + 1}</TableCell>
                <TableCell>
                  {field.inputValue || (
                    <span className="text-gray-400 italic">Empty</span>
                  )}
                </TableCell>
                <TableCell>
                  {field.selectValue ? (
                    getSelectLabel(field.selectValue)
                  ) : (
                    <span className="text-gray-400 italic">Not selected</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className={getStatusColor(field)}>
                    {getFieldStatus(field)}
                  </span>
                </TableCell>
                <TableCell>
                  <DeleteFieldButton onDelete={() => onDelete(field.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
