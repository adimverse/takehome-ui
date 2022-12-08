import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FlattenedFormErrors } from "../types";

function Errors({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return (
    <div>
      {errors.map((err) => (
        <span key={err} style={{ color: "red" }}>
          {err}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const [errors, setErrors] = useState<FlattenedFormErrors>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setErrors(undefined);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      router.push("/yippie?name=" + data.name);
    }

    const jsonResponse = await response.json();
    if (jsonResponse.errors) {
      setErrors(jsonResponse.errors);
    }
  };

  return (
    <div>
      <Head>
        <title>Adim UI Takehome</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to the Adim UI Takehome!</h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <Errors errors={errors?.fieldErrors?.name} />
          </div>

          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
            <Errors errors={errors?.fieldErrors?.username} />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <Errors errors={errors?.fieldErrors?.email} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <Errors errors={errors?.fieldErrors?.password} />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </main>
    </div>
  );
}
