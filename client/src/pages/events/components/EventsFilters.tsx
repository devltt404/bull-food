import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BoltIcon, ZapIcon } from "lucide-react";
import EventsAdvancedFilter from "./EventsAdvancedFilter";
import EventsQuickFilter from "./EventsQuickFilter";

export default function EventsFilters() {
  return (
    <Tabs defaultValue="quick">
      <TabsList className="mb-4">
        <TabsTrigger value="quick">
          <ZapIcon />
          Quick Filter
        </TabsTrigger>
        <TabsTrigger value="advanced">
          <BoltIcon />
          Advanced Filter
        </TabsTrigger>
      </TabsList>
      <TabsContent value="quick">
        <EventsQuickFilter />
      </TabsContent>
      <TabsContent value="advanced">
        <EventsAdvancedFilter />
      </TabsContent>
    </Tabs>
  );
}
