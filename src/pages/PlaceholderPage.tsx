import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Hammer } from "lucide-react";
import { useLocation } from "react-router-dom";

export const PlaceholderPage = () => {
  const location = useLocation();
  const title = location.pathname.split('/').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')).join(' - ') || 'Page';

  return (
    <div className="h-full flex flex-col items-center justify-center py-20">
       <Card className="glass-card max-w-md w-full text-center py-10 border-dashed border-2">
          <CardHeader>
             <div className="mx-auto bg-muted p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
               <Hammer className="w-8 h-8 text-primary" />
             </div>
             <CardTitle className="text-2xl">{title}</CardTitle>
             <CardDescription>This module is currently under construction.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">
               The interface for {title.toLowerCase()} is being built.
               Please check back later.
             </p>
          </CardContent>
       </Card>
    </div>
  );
};
