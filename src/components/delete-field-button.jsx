"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteFieldButton({ onDelete }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onDelete}
      className="text-red-500 hover:text-red-700 bg-transparent"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
