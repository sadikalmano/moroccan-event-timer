
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MapInput from './MapInput';
import MultiImageUpload from './MultiImageUpload';
import FormStepper from './FormStepper';
import { EventFormData, EventFormStep } from '../types';
import { useToast } from '@/hooks/use-toast';
import { createEvent } from '../services/eventService';
import { useAuth } from '../contexts/AuthContext';

const CreateEventForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [location, setLocation] = useState('');
  const [mapCoordinates, setMapCoordinates] = useState({ lat: 31.7917, lng: -7.0926 }); // Default to Morocco center
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps: EventFormStep[] = [
    {
      title: 'Basic Info',
      description: 'Enter the basic information about your event',
    },
    {
      title: 'Details',
      description: 'Provide more details about your event',
    },
    {
      title: 'Location',
      description: 'Set the location for your event',
    },
    {
      title: 'Images',
      description: 'Upload images for your event',
    },
  ];

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<EventFormData>({
    defaultValues: {
      title: '',
      subtitle: '',
      description: '',
      startDate: '',
      endDate: '',
      city: '',
      location: '',
      category: 'conference',
      organizer: '',
      images: [],
    }
  });

  const formValues = watch();

  const handleLocationSelect = (locationData: { address: string, coordinates: { lat: number, lng: number } }) => {
    setLocation(locationData.address);
    setMapCoordinates(locationData.coordinates);
    setValue('location', locationData.address);
    setValue('coordinates', locationData.coordinates);
  };

  const handleImagesChange = (images: File[]) => {
    setValue('images', images);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      setIsSubmitting(true);
      
      // In a real app, you would upload the images to storage first
      // and get back URLs to store in the database
      const imageUrl = data.images.length > 0 
        ? URL.createObjectURL(data.images[0]) 
        : 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b';
      
      // Additional images would be processed similarly
      const images = data.images.map(img => URL.createObjectURL(img));
      
      const eventData = {
        ...data,
        image: imageUrl,
        images,
        status: 'pending' as const,
        userId: user?.id || 'guest',
      };
      
      await createEvent(eventData, user?.id || 'guest');
      
      toast({
        title: "Success",
        description: "Event created successfully and is pending approval",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Create New Event</h2>
      
      <FormStepper 
        steps={steps} 
        currentStep={currentStep} 
        onStepClick={goToStep} 
      />
      
      <Card>
        <CardContent className="pt-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter event title" 
                    {...register('title', { required: 'Event title is required' })}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input 
                    id="subtitle" 
                    placeholder="Enter event subtitle" 
                    {...register('subtitle')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    onValueChange={(value) => setValue('category', value)}
                    defaultValue={formValues.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="concert">Concert</SelectItem>
                      <SelectItem value="exhibition">Exhibition</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organizer">Organizer</Label>
                  <Input 
                    id="organizer" 
                    placeholder="Enter organizer name" 
                    {...register('organizer', { required: 'Organizer is required' })}
                  />
                  {errors.organizer && (
                    <p className="text-sm text-red-500">{errors.organizer.message}</p>
                  )}
                </div>
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate" 
                      type="datetime-local" 
                      {...register('startDate', { required: 'Start date is required' })}
                    />
                    {errors.startDate && (
                      <p className="text-sm text-red-500">{errors.startDate.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input 
                      id="endDate" 
                      type="datetime-local" 
                      {...register('endDate', { required: 'End date is required' })}
                    />
                    {errors.endDate && (
                      <p className="text-sm text-red-500">{errors.endDate.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea 
                    id="description"
                    className="w-full min-h-[150px] px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter event description"
                    {...register('description', { required: 'Description is required' })}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    placeholder="Enter city" 
                    {...register('city', { required: 'City is required' })}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mapLocation">Map Location</Label>
                  <MapInput 
                    onLocationSelect={handleLocationSelect} 
                    initialValue={location}
                    initialCoordinates={mapCoordinates}
                  />
                  {!location && (
                    <p className="text-sm text-muted-foreground">
                      Search for a location or click on the map to set the event location
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Event Images</Label>
                  <MultiImageUpload 
                    onImagesChange={handleImagesChange}
                    maxImages={5}
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-between pt-4">
              {currentStep > 0 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )}
              
              {currentStep < steps.length - 1 && (
                <Button 
                  type="button" 
                  className="ml-auto"
                  onClick={nextStep}
                >
                  Next
                </Button>
              )}
              
              {currentStep === steps.length - 1 && (
                <Button 
                  type="submit"
                  className="ml-auto bg-[#36DFBF] hover:bg-[#2bc9ab] text-black"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Event"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEventForm;
