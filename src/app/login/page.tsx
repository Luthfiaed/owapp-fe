"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { authenticate } from "../lib/actions";
import Accordion from "../ui/accordion";
import Toast from "../ui/toast";

const vdata = [
  {
    title: "Explicit Error Message",
    content: `Error message from backend is displayed without checked first. 
    The information displayed can reveal the technology used in the backend or 
    other information not intended for the public. Try logging in with the wrong credential
    and see the error`,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const initial = {
    username: "",
    password: "",
    success: true,
    initial: true,
    message: "",
  };

  const [formState, formAction, isPending] = useActionState(
    authenticate,
    initial
  );

  useEffect(() => {
    if (!formState.initial && formState.success) {
      router.push("/products");
    }
  }, [formState, router]);

  return (
    <main className="justify-items-center">
      <div className="w-1/3 pt-12">
        <div className="mb-8">
          <Accordion items={vdata}></Accordion>
        </div>
        <form action={formAction}>
          <div className="flex-1 rounded-lg bg-[var(--navbar)] px-6 pb-4 pt-8">
            <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
            {isPending && <p>Loading...</p>}
            <p className="text-xs">{`You can try logging in with user "minyong" and password "test1234" to play around`}</p>
            {!formState.success && (
              <Toast type="error" title="Login Failed">
                {formState.message}
              </Toast>
            )}
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-large font-medium"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full text-[#222222] rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2"
                    id="username"
                    type="username"
                    name="username"
                    placeholder="Enter your username"
                    required
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-large font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full text-[#222222] rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <button
              className="block p-2 w-full rounded-lg mt-5 bg-[var(--foreground)] text-[var(--background)]"
              aria-disabled={isPending}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
