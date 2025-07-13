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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function SubmittedDataTable({
  submittedData,
  selectOptions,
  onDeleteSubmittedField,
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

  const flattenedData = [];
  submittedData.forEach((submission, submissionIndex) => {
    submission.data.forEach((field, fieldIndex) => {
      flattenedData.push({
        ...field,
        submissionId: submission.id,
        submissionNumber: submissionIndex + 1,
        timestamp: submission.timestamp,
        originalFieldIndex: fieldIndex,
      });
    });
  });

  if (submittedData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Submitted Data History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No data submitted.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form State</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flattenedData.map((field) => (
              <TableRow key={`${field.submissionId}-${field.id}`}>
                <TableCell>
                  <span>
                    {field.inputValue || (
                      <span className="text-gray-400 italic">Empty</span>
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  {field.selectValue ? (
                    getSelectLabel(field.selectValue)
                  ) : (
                    <span className="text-gray-400 italic">Not selected</span>
                  )}
                </TableCell>

                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onDeleteSubmittedField(field.submissionId, field.id)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
