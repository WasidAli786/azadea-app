"use client";

import ButtonUI from "@/components/ui/button-ui";
import InputUI from "@/components/ui/input-ui";
import NextImage from "@/components/ui/next-image";
import { Form } from "@heroui/form";

export default function LoginPage() {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("data", data);
  };
  return (
    <>
      <div className="min-h-screen md:grid grid-cols-2">
        <div className="relative h-full w-full">
          <NextImage
            src="/images/login-bg.jpg"
            alt="login-page"
            className="object-cover"
          />
        </div>
        <div className="container mx-auto min-h-screen flex flex-col justify-center md:px-20">
          <Form onSubmit={handleLogin} className="flex flex-col gap-6">
            <h1 className="text-xl lg:text-3xl font-semibold">
              Let's get you signed in
            </h1>
            <InputUI
              name="email"
              label="Email"
              placeholder="Enter your email"
              size="lg"
              labelPlacement="outside"
              isRequired
            />
            <InputUI
              name="password"
              label="Password"
              placeholder="Enter your password"
              size="lg"
              labelPlacement="outside"
              isRequired
            />
            <ButtonUI size="lg" fullWidth type="submit">
              Sign in
            </ButtonUI>
          </Form>
        </div>
      </div>
    </>
  );
}
