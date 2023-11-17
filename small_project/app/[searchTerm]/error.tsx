"use client";
import Link from "next/link";
import React, { useEffect } from "react";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 px-4 min-h-screen">
      <h2 className="my-4 text-2xl font-bold">Something went wrong!</h2>
      <button
        className="mb-4 p-4 bg-red-500 text-white rounded-xl"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <p className="text-xl">
        Or go back to{" "}
        <Link href="/" className="underline">
          Home 🏠
        </Link>
      </p>
    </main>
  );
}
