"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function Search() {
  const [keyword, setKeyword] = React.useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/${keyword}/`);
  };

  return (
    <form
      className="w-50 flex justify-center md:justify-between"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={keyword}
        className="bg-white p-2 w-80 text-xl rounded-xl"
        placeholder="Search"
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
}
