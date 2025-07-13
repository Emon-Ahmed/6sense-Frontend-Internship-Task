"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "./form-field";
import AddFieldButton from "./add-field-button";
import FormStateDisplay from "./form-state-display";
import ValidationSummary from "./validation-summary";
import SubmittedDataTable from "./submitted-data-table";

export default function DynamicForm() {
  const [formFields, setFormFields] = useState([
    { id: "1", inputValue: "", selectValue: "" },
  ]);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  const selectOptions = [
    { value: "User", label: "User" },
    { value: "Manager", label: "Manager" },
    { value: "Admin", label: "Admin" },
    { value: "Super Admin", label: "Super Admin" },
  ];

  const addField = () => {
    const newId = Date.now().toString();
    setFormFields([
      ...formFields,
      { id: newId, inputValue: "", selectValue: "" },
    ]);
  };

  const deleteField = (id) => {
    if (formFields.length > 1) {
      setFormFields(formFields.filter((field) => field.id !== id));
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const handleInputChange = (id, value) => {
    setFormFields(
      formFields.map((field) =>
        field.id === id ? { ...field, inputValue: value } : field
      )
    );

    if (errors[id]?.input) {
      setErrors({
        ...errors,
        [id]: { ...errors[id], input: undefined },
      });
    }
  };

  const handleSelectChange = (id, value) => {
    setFormFields(
      formFields.map((field) =>
        field.id === id ? { ...field, selectValue: value } : field
      )
    );

    if (errors[id]?.select) {
      setErrors({
        ...errors,
        [id]: { ...errors[id], select: undefined },
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    formFields.forEach((field) => {
      const fieldErrors = {};

      if (!field.inputValue.trim()) {
        fieldErrors.input = "This field is required";
        isValid = false;
      }

      if (!field.selectValue) {
        fieldErrors.select = "Please select an option";
        isValid = false;
      }

      if (fieldErrors.input || fieldErrors.select) {
        newErrors[field.id] = fieldErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      const submissionData = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        data: [...formFields],
      };
      setSubmittedData([...submittedData, submissionData]);

      setFormFields([
        { id: Date.now().toString(), inputValue: "", selectValue: "" },
      ]);
      setErrors({});
      setIsSubmitted(false);

      console.log("Form submitted successfully:", submissionData);
    }
  };

  const deleteSubmittedField = (submissionId, fieldIdToDelete) => {
    setSubmittedData((prevSubmittedData) => {
      const updatedSubmittedData = prevSubmittedData
        .map((submission) => {
          if (submission.id === submissionId) {
            const updatedFields = submission.data.filter(
              (field) => field.id !== fieldIdToDelete
            );
            if (updatedFields.length === 0) {
              return null;
            }
            return { ...submission, data: updatedFields };
          }
          return submission;
        })
        .filter(Boolean);

      return updatedSubmittedData;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Form with Validation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map((field, index) => (
              <FormField
                key={field.id}
                field={field}
                index={index}
                selectOptions={selectOptions}
                errors={errors}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                onDelete={deleteField}
              />
            ))}

            <div className="flex gap-4">
              <AddFieldButton onAdd={addField} />
              <Button type="submit">Submit Form</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <FormStateDisplay formFields={formFields} selectOptions={selectOptions} />

      <SubmittedDataTable
        submittedData={submittedData}
        selectOptions={selectOptions}
        onDeleteSubmittedField={deleteSubmittedField}
      />

      <ValidationSummary isSubmitted={isSubmitted} errors={errors} />
    </div>
  );
}
