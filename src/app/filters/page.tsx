"use client"
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define your schema based on the form fields
const searchSchema = z.object({
  destination: z.string(),
  travelDates: z.string(),
  budget: z.object({
    min: z.number(),
    max: z.number(),
  }),
  // Add other fields as necessary...
});

type SearchFormValues = z.infer<typeof searchSchema>;

export default function FiltersPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit: SubmitHandler<SearchFormValues> = (data) => {
    // Handle form submission
    console.log(data);
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('destination')} placeholder="Destination" />
        {errors.destination && <p>{errors.destination.message}</p>}
        
        <input {...register('travelDates')} placeholder="Travel Dates" />
        {errors.travelDates && <p>{errors.travelDates.message}</p>}

        {/* Add other form controls like budget, activities, etc., similar to above */}
        
        <input type="submit" />
      </form>
    </main>
  );
}
