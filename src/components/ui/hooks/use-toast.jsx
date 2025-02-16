import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

export function toast({ title, description }) {
  alert(`${title}\n\n${description}`);
}
