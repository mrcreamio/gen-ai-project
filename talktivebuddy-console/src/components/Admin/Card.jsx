import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Clipboard,
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

export function AdminCard() {
  return (
    <Card className="w-[350px] shadow-lg m-5">
      <CardHeader className="p-3">
        <CardTitle className="flex justify-between text-lg">
          <div className="flex items-center">
            <Clipboard className="mr-1" size={20} /> Lumns
          </div>
          <span
            className={
              "bg-green-200 px-3 py-1 hover:bg-green-300 rounded-full text-sm text-black"
            }
          >
            Ready
          </span>
        </CardTitle>
        <CardDescription>Deploy your new project </CardDescription>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex flex-col space-y-1.5">
          <div className="flex-1">
            <nav className="grid items-start text-sm font-medium">
              <spn className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Home className="h-4 w-4" />
                Dashboard
              </spn>
              <span className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <ShoppingCart className="h-4 w-4" />
                Orders
              </span>
              <span className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary">
                <Package className="h-4 w-4" />
                Products
              </span>
              <span className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Users className="h-4 w-4" />
                Customers
              </span>
              <span className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <LineChart className="h-4 w-4" />
                Analytics
              </span>
            </nav>
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
}
