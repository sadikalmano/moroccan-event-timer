
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Database } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Migration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const runMigrations = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/migrations/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult({ success: true, message: data.message || 'Database tables created successfully!' });
        toast({
          title: "Success",
          description: "Database tables created successfully!",
          variant: "default",
        });
      } else {
        setResult({ success: false, message: data.message || 'Failed to create database tables.' });
        toast({
          title: "Error",
          description: data.message || 'Failed to create database tables.',
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Migration error:', error);
      setResult({ success: false, message: 'An unexpected error occurred.' });
      toast({
        title: "Error",
        description: "An unexpected error occurred while running migrations.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" /> 
            Database Migration
          </CardTitle>
          <CardDescription>
            Initialize database tables for Lovabl Events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This will create the necessary tables in your database for users and events. 
            Only run this if you need to set up a new database.
          </p>
          
          {result && (
            <Alert className={result.success ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}>
              {result.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button 
            onClick={runMigrations} 
            disabled={isLoading} 
            className="w-full"
          >
            {isLoading ? "Running Migrations..." : "Run Migrations"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="w-full"
          >
            Return to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Migration;
