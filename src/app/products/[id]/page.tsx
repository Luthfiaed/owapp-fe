import { cookies } from "next/headers";
import Image from "next/image";
import { IReview } from "~/app/lib/model";
import { API_URL } from "~/app/lib/query";
import ReviewForm from "./ReviewForm";
import Toast from "~/app/ui/toast";
import Accordion from "~/app/ui/accordion";

const vdata = [
  {
    title: "Stored XSS",
    content: `
      ReactJS automatically sanitizes form input. I purposefully made this page vulnerable to XSS attack
      by setting dangerouslySetInnerHTML. Try it out by submitting a review like <script>alert('hello')</script>
    `,
  },
  {
    title: "Broken Access Control",
    content: `
      You can use a tool like Postman to craft a request to the backend to edit a review that belongs to another user.
      The backend for this app only checks the validity of your access token. It does not check whether the user
      encoded in the access token is the user who wrote the review that is being updated.
    `,
  },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = (await params).id;
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const res = await fetch(`${API_URL}/api/v1/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (res.status >= 400) {
    return (
      <main className="justify-items-center pt-12">
        <div className="w-3/4 p-8 rounded-lg bg-[#fff]">
          <Toast type="error" title="Error fetching product data">
            {data.error}
          </Toast>
        </div>
      </main>
    );
  } else if (res.status == 200) {
    data.reviews.forEach((review: IReview) => {
      const date = new Date(review.created_at);
      review.created_at = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    });
  }

  return (
    <main className="justify-items-center pt-12">
      <Accordion items={vdata} />
      <div className="w-1/2 mt-8 p-8 rounded-lg bg-[var(--navbar-light)]">
        <h2 className="mb-4 font-bold text-xl">{data.name}</h2>
        <Image
          className="mb-4"
          src={data.image}
          alt={data.name}
          width={200}
          height={200}
        />
        <p className="mb-4">{data.description}</p>
        <div className="bg-[var(--navbar)] rounded-lg p-4">
          <h2 className="mb-4 font-bold">User Review</h2>
          {data.reviews && data.reviews.length > 0 ? (
            data.reviews.map((review: IReview) => (
              <div key={review.id}>
                {/* 
                VULNERABILITY POINT: XSS attack
                React sanitizes input by default, we have to override it using dangerouslySetInnerHTML attribute
                It is rare we will need to set this attribute. One possible usecase is rendering markdown input by user
                */}
                <div dangerouslySetInnerHTML={{ __html: review.review }} />
                <p className="text-xs">
                  From <span className="font-bold">{review.username}</span> on{" "}
                  {review.created_at}{" "}
                </p>
                <hr className="mb-4" />
              </div>
            ))
          ) : (
            <p>No reviews from user yet.</p>
          )}
          <ReviewForm productId={productId} />
        </div>
      </div>
    </main>
  );
}
