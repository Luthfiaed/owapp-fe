export default function Home() {
  return (
    <div className="justify-items-center content-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-y-16 w-1/2 h-1/2">
        <div className="text-justify">
          <h1 className="text-xl font-bold mb-2">What is OWAPP?</h1>
          <p>
            OWAPP is a project I built to learn more about OWASP Top 10 Web
            Vulnerabilities 2021. That&apos;s where the name &quot;OWAPP&quot;
            comes from; A combination of OWASP and APP. I purposefully built
            this app to demonstrate some common vulnerabilities.
          </p>
        </div>

        <div>
          <h1 className="text-xl font-bold mb-2">How to Navigate OWAPP?</h1>
          <p>
            Some vulnerabilities can be observed by interacting with the app
            using browser as usual. Click &quot;Explore the App&quot; to do so.
            There will be some accordion explaining possible vulnerabilities on
            each page. However, some vulnerabilities are better explained by
            reading the source code directly. Click &quot;Explore the Source
            Code&quot; to do so.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="items-center rounded-full transition-colors flex bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-md h-12 px-4"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the App
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the Source Code on Github
          </a>
        </div>
      </main>
    </div>
  );
}
