import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminCard } from "@/components/Admin/Card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  User2Icon,
  ChevronsUpDown,
  LineChart,
  Users,
  Package,
  ShoppingCart,
  Home,
} from "lucide-react";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

const Corpora = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <div className='flex justify-between items-center m-5'>
        <div className='max-w-3xl flex items-center'>
          <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
            Corpora{" "}
          </h4>
          <Drawer direction="right">
            {" "}
            <DrawerTrigger asChild>
              <Button size='xs' className='px-2 py-1 mx-3' variant='outline'>
                <Plus className='mr-2 h-4 w-4' /> New corpora
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className='mx-auto w-full max-w-sm'>
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>

                    <Input type="text"  placeholder = "Enter Name"  className="mt-4 my-4 py-4"  />
                    <Input type="text"  placeholder = "Enter Description"  className="mt-4 my-3"  />
                    <Input type="file"  className="mt-4 mb-4 my-3 " />
                   
                  </DrawerDescription>
                </DrawerHeader>
                <div className='p-4 pb-0'></div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant='outline'>Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className='flex items-center'>
          {" "}
          <Button size='xs' className='px-2 py-1 mx-3' variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' /> Prev
          </Button>{" "}
          1/1
          <Button size='xs' className='px-2 py-1 mx-3' variant='outline'>
            <ArrowRight className='mr-2 h-4 w-4' />
            Next
          </Button>
        </div>
      </div>
      <Card className='w-fit min-w-72 shadow-lg m-5'>
        <CardHeader className='p-3'>
          <CardTitle className='flex justify-between text-lg mb-4'>
            <div className='flex items-center'>
              <User2Icon className='mr-1' size={20} /> Lumns
            </div>
          </CardTitle>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className='w-full cursor-pointer'>
              <CollapsibleTrigger asChild>
                <h4 className='text-lg font-semibold'>Details</h4>
              </CollapsibleTrigger>
            </div>
            <div className='flex flex-col space-y-1.5'>
              <div className='flex-1'>
                <nav className='grid items-start text-sm font-medium'>
                  <spn className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                    <Home className='h-4 w-4' />
                    Dashboard
                  </spn>
                  <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                    <ShoppingCart className='h-4 w-4' />
                    Orders
                  </span>
                  <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary'>
                    <Package className='h-4 w-4' />
                    Products
                  </span>
                  <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                    <Users className='h-4 w-4' />
                    Customers
                  </span>
                  <span className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                    <LineChart className='h-4 w-4' />
                    Analytics
                  </span>
                </nav>
              </div>
            </div>
            <CollapsibleContent className='mt-4 w-full'>
              <h4 className='text-sm font-bold mb-2'>Sources</h4>
              <Card className='w-full shadow-lg '>
                <CardHeader className='p-3'>
                  <CardTitle className='flex justify-between text-lg mb-4'>
                    <div className='flex items-center'>
                      <User2Icon className='mr-1' size={20} /> Lumns
                    </div>
                  </CardTitle>
                  <CardDescription>Deploy your new project </CardDescription>
                  <CardDescription>
                    Deploy your new project one click{" "}
                  </CardDescription>
                </CardHeader>
                {/* <CardContent className="p-3"></CardContent> */}
                {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
              </Card>
            </CollapsibleContent>
          </Collapsible>
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

export default Corpora;
