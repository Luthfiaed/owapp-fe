"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import Toast from "../ui/toast";
import { uploadAvatar } from "../lib/actions";
import Accordion from "../ui/accordion";
import { API_URL, fetchProfile } from "../lib/query";
import { IProfile } from "../lib/model";
import { useCookies } from "react-cookie";

const vdata = [
  {
    title: "File Upload Vulnerability",
    content: `The backend for this file upload function only validates for maximum file size. 
    It doesn't validate for file type nor file name. It's possible for user to overwrite existing files, 
    potentially overwriting avatar photos for other users. This violates data availability principle of the CIA triad.`,
  },
];

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<IProfile>();
  const [error, setError] = useState<string>("");

  // eslint-disable-next-line
  const [authToken, setCookie, removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const getProfile = async () => {
      const res = await fetchProfile(authToken.access_token);
      if (res.error !== "") {
        setError(res.error);
        setProfileData(undefined);
      } else {
        setError("");
        setProfileData(res.data);
      }
    };
    getProfile();
  }, [authToken.access_token]);

  const initialState = {
    message: "",
    success: true,
    initial: true,
  };
  const [formState, formAction, isPending] = useActionState(
    uploadAvatar,
    initialState
  );

  return (
    <main className="justify-items-center">
      <div className="pt-12 w-1/3">
        <div className="mb-8">
          <Accordion items={vdata}></Accordion>
        </div>
        {error !== "" && (
          <Toast type="error" title="Fetch Profile Failed">
            {error}
          </Toast>
        )}
        <div className="bg-[var(--navbar)] flex-1 rounded-lg px-6 py-8 w-full">
          <h1 className="text-xl mb-2">Hello, {profileData?.username}!</h1>
          <p className="mb-4">Your role is {profileData?.role}</p>
          <h1 className="text-xl mb-4">Upload Avatar</h1>
          {isPending && <p>Loading...</p>}
          {formState.success && !formState.initial && (
            <Toast type="success" title="Upload Avatar Success">
              {formState.message}
            </Toast>
          )}
          {!formState.success && (
            <Toast type="error" title="Upload Avatar Failed">
              {formState.message}
            </Toast>
          )}
          <Image
            src={`${API_URL}/api/v1/avatar/${profileData?.avatar.String}`}
            width={150}
            height={150}
            alt="avatar"
            className="rounded-full mx-auto mt-5"
          />
          <form action={formAction}>
            <label
              className="mb-3 mt-5 block text-md font-medium"
              htmlFor="avatar"
            >
              Upload Avatar
            </label>
            <input type="file" name="avatar" id="avatar" />
            <button
              className="block p-2 w-full rounded-lg mt-5 bg-[var(--foreground)] text-[var(--background)]"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
