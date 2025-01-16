"use client";

import { useActionState } from "react";
import { IReviewForm, submitReview } from "~/app/lib/actions";
import Toast from "~/app/ui/toast";

export default function ReviewForm({ productId }: { productId: string }) {
  const initialData: IReviewForm = {
    review: "",
    productId: productId,
    success: true,
    message: "",
  };

  const [formState, formAction, isPending] = useActionState(
    submitReview,
    initialData
  );

  return (
    <div className="mt-8">
      {isPending && <p className="mb-4">Loading submit review...</p>}
      <form className="flex flex-col" action={formAction}>
        <label className="font-bold mb-2" htmlFor="review">
          Add Your Review
        </label>
        <input
          type="text"
          hidden
          name="productId"
          value={initialData.productId}
          onChange={() => {}}
        />
        <textarea className="w-1/2" name="review" id="review" />
        <button className="w-1/4 mt-2 bg-blue-400 rounded-md" type="submit">
          Submit
        </button>
        {!formState.success && (
          <Toast type="error" title="Error submitting review">
            {formState.message}
          </Toast>
        )}
      </form>
    </div>
  );
}
