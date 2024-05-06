import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, User2Icon } from "lucide-react";
import React from "react";

const Agents = () => {
  return (
    <>
      <div className="max-w-3xl flex items-center m-5">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Agents
        </h4>
        <Button size="xs" className="px-2 py-1 mx-3" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> New agent
        </Button>
      </div>
      <Card className="w-[350px] shadow-lg m-5">
        <CardHeader className="p-3">
          <CardTitle className="flex justify-between text-lg mb-4">
            <div className="flex items-center">
              <User2Icon className="mr-1" size={20} /> Lumns
            </div>
          </CardTitle>
          <CardDescription>Deploy your new project </CardDescription>
          <CardDescription>Deploy your new project one click </CardDescription>
        </CardHeader>
        {/* <CardContent className="p-3"></CardContent> */}
        {/* <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter> */}
      </Card>
    </>
  );
};

export default Agents;
