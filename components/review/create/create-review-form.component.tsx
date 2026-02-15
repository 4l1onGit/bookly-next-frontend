"use client";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  review_text: z.string().min(1, "Comment is required"),
});

const CreateReviewForm = ({ bookID }: { bookID: string }) => {
  const { token, user } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      review_text: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof reviewSchema>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}books/${bookID}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: data.rating,
            review_text: data.review_text,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      toast.success("Review submitted successfully!");
      form.reset();
      router.push("/reviews");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit review",
      );
    }
  };

  if ((!user || !token) && typeof window !== "undefined") {
    router.push("/login");
    return null;
  }

  return (
    <form
      className="w-1/3 bg-slate-50 shadow-md p-4 rounded-2xl flex flex-col justify-center"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Create a New Review
      </h2>
      <div className="space-y-2 mt-4">
        <FieldGroup>
          <Controller
            name="review_text"
            control={form.control}
            render={({ field }) => (
              <textarea
                id="review_text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter your review"
                required
                {...field}
              />
            )}
          />
        </FieldGroup>
      </div>
      <div className="space-y-2 mt-4">
        <FieldGroup>
          <Controller
            name="rating"
            control={form.control}
            render={({ field }) => (
              <Input
                type="number"
                id="rating"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter your rating"
                required
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
        </FieldGroup>
      </div>
      <Button type="submit" className="w-full mt-4 ">
        Submit Review
      </Button>
    </form>
  );
};

export default CreateReviewForm;
