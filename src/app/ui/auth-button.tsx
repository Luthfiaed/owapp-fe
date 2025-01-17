"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function AuthButton() {
  const router = useRouter();

  // eslint-disable-next-line
  const [cookies, _, removeCookie] = useCookies(["access_token"]);

  const logoutClient = () => {
    removeCookie("access_token");
    router.push("/");
  };

  if (cookies.access_token) {
    return (
      <div>
        <Link href={"/profile"} className="mr-4">
          My Profile
        </Link>
        <button suppressHydrationWarning onClick={logoutClient}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link suppressHydrationWarning href="/login">
      Login
    </Link>
  );
}
