"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormStateDisplay({ formFields, selectOptions }) {
  const getSelectLabel = (value) => {
    return selectOptions.find((opt) => opt.value === value)?.label || value;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form State (H3 Format)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {formFields.map((field, index) => (
          <div key={field.id}>
            <h3 className="text-lg font-semibold mb-2">Field {index + 1}</h3>
            <h3 className="h3 text-gray-600">
              Username: {field.inputValue || "Empty"}
            </h3>
            <h3 className="h3 text-gray-600">
              User Type:{" "}
              {field.selectValue
                ? getSelectLabel(field.selectValue)
                : "Not selected"}
            </h3>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
