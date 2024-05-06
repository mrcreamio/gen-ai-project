import { AdminAlert } from "@/components/Admin/Alert";
import { AdminCard } from "@/components/Admin/Card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, StarIcon, User2Icon } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <>
      {/* <AdminAlert
        heading="Notice"
        desc={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro nihil at sunt fugit, cum aspernatur, repudiandae maxime tempora ipsa nesciunt minus est harum adipisci nobis officiis veritatis ducimus. Eius, voluptatum."
        }
      />
      <Alert className={`shadow-lg  bg-zinc-200`}>
        <StarIcon className="h-5 w-5" />
        <AlertTitle>{`What's new - 6 December 2023`}</AlertTitle>
        <AlertTitle className="text-sm my-3">{`Premium plane now available`}</AlertTitle>

        <AlertDescription c>
          Lorem ipsum dolor sit amet <strong>Start plan</strong> consectetur
          adipisicing elit. Porro nihil at sunt fugit, cum aspernatur,
          repudiandae maxime tempora ipsa nesciunt minus est harum adipisci
          <strong>Start plan</strong> nobis officiis veritatis ducimus. Eius,
          voluptatum.
        </AlertDescription>
      </Alert> */}
      <div className="max-w-3xl flex items-center m-5">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Corpora{" "}
        </h4>
        <Button size="xs" className="px-2 py-1 mx-3" variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> New corpora
        </Button>
        <Button size="xs" className="px-2 py-1 mx-3" variant="outline">
          See all <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <AdminCard />
      <div className="max-w-3xl flex items-center m-5">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Agents{" "}
        </h4>
        <Button size="xs" className="px-2 py-1 mx-3" variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> New agents
        </Button>
        <Button size="xs" className="px-2 py-1 mx-3" variant="outline">
          See all <ArrowRight className="ml-2 h-4 w-4" />
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

export default Dashboard;
