"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AddFieldButton({ onAdd }) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onAdd}
      className="flex items-center gap-2 bg-transparent"
    >
      <Plus className="h-4 w-4" />
      Add Field
    </Button>
  );
}
