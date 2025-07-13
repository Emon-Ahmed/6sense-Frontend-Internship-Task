"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import DeleteFieldButton from "./delete-field-button";

export default function FormField({
  field,
  index,
  selectOptions,
  errors,
  onInputChange,
  onSelectChange,
  onDelete,
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor={`input-${field.id}`}>Username</Label>
          <Input
            id={`input-${field.id}`}
            value={field.inputValue}
            onChange={(e) => onInputChange(field.id, e.target.value)}
            placeholder="Enter text..."
            className={errors[field.id]?.input ? "border-red-500" : ""}
          />
          {errors[field.id]?.input && (
            <p className="text-sm text-red-500">{errors[field.id].input}</p>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <Label htmlFor={`select-${field.id}`}>User Type</Label>
          <div className="flex gap-2">
            <Select
              value={field.selectValue}
              onValueChange={(value) => onSelectChange(field.id, value)}
            >
              <SelectTrigger
                className={errors[field.id]?.select ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                {selectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DeleteFieldButton onDelete={() => onDelete(field.id)} />
          </div>
          {errors[field.id]?.select && (
            <p className="text-sm text-red-500">{errors[field.id].select}</p>
          )}
        </div>
      </div>
    </div>
  );
}
