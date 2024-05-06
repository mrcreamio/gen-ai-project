import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const AdminAlert = ({ heading = "", desc = "", icon, props }) => {
  return (
    <Alert className={`shadow-lg`} {...props}>
      {icon || <AlertTriangle className="h-5 w-5" />}
      <AlertTitle>{heading}</AlertTitle>
      <AlertDescription>{desc} </AlertDescription>
    </Alert>
  );
};
