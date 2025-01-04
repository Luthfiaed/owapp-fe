import Link from "next/link";
import AuthButton from "./auth-button";

export default async function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full shadow-md bg-[var(--navbar)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold">
              <Link className="text-[var(--foreground)]" href="/">
                OWAPP
              </Link>
            </span>
          </div>
          <div>
            <div className="ml-10 flex items-center space-x-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
