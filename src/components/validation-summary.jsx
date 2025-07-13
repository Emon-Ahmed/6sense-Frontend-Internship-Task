"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ValidationSummary({ isSubmitted, errors }) {
  if (!isSubmitted || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="text-red-600">Validation Errors</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-red-600">
          Please fix the errors above before submitting the form.
        </p>
      </CardContent>
    </Card>
  );
}
