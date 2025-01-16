"use client";

import { useActionState } from "react";
import Accordion from "../ui/accordion";
import { IFormState, register } from "../lib/actions";
import Toast from "../ui/toast";

const vdata = [
  {
    title: "Broken Access Control",
    content:
      "In the backend, there is no validation for the value of `Role` that can be submitted. Limiting the select options in the frontend is not enough as user can easily use tools like Postman to try submitting custom `Role` values such as `admin`.",
  },
  {
    title: "Identification and Authentication Failures",
    content:
      "There is no secure password requirement such as minimum length, alphanumeric characters, and/or mixed case letters.",
  },
  {
    title: "Direct error message from BE",
    content:
      "Explicit error message possibly revealing information that is unnecessary to be disclosed.",
  },
];

export default function RegisterPage() {
  const initialState: IFormState = {
    username: "",
    password: "",
    role: "user",
    message: "",
    success: true,
  };

  const [formState, formAction, isPending] = useActionState(
    register,
    initialState
  );

  return (
    <main className="justify-items-center">
      <div className="pt-12 w-1/3">
        <div className="mb-8">
          <Accordion items={vdata}></Accordion>
        </div>
        <div className="bg-[var(--navbar)] rounded-lg px-6 py-6">
          <h1 className="text-xl">Register New User</h1>
          {isPending && <p>Loading...</p>}
          {formState.success ? (
            <Toast type="success" title="Register New User Success">
              {formState.message}
            </Toast>
          ) : (
            <Toast type="error" title="Register New User Failed">
              {formState.message}
            </Toast>
          )}
          <form action={formAction}>
            <label className="mb-2 mt-5 block text-md" htmlFor="username">
              Username
            </label>
            <input
              defaultValue={formState.username}
              className="w-full rounded-md px-2 py-1 text-[#222222]"
              type="text"
              name="username"
              id="username"
            />
            <label className="mb-2 mt-5 block text-md" htmlFor="password">
              Password
            </label>
            <input
              defaultValue={formState.password}
              className="w-full rounded-md px-2 py-1 text-[#222222]"
              type="text"
              name="password"
              id="password"
            />
            <label className="mb-2 mt-5 block text-md" htmlFor="role">
              Role
            </label>
            <select
              className="w-full rounded-md p-2 text-[#222222]"
              name="role"
              id="role"
              defaultValue={formState.role}
            >
              <option value="user">User</option>
            </select>
            <button
              className="block p-2 w-full rounded-lg mt-5 bg-[var(--foreground)] text-[var(--background)]"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
