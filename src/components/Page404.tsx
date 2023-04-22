import { Link } from "raviger";
import React from "react";

export default function Page404() {
  return (
    <div className="flex items-center h-full text-gray-700">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 text-gray-400">
            But don't worry, you can find plenty of other things on our
            homepage.
          </p>
          <Link
            href="/"
            className="px-8 py-3 font-semibold rounded bg-blue-400 text-white"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
