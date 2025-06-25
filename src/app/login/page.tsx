"use client";

import ButtonUI from "@/src/components/ui/button-ui";
import InputUI from "@/src/components/ui/input-ui";
import NextImage from "@/src/components/ui/next-image";
import { useRouter } from "next/navigation";
import { Form } from "@heroui/form";
import { useUser } from "@/src/context/user-context";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/src/lib/axios";
import { showError, showSuccess } from "@/src/lib/toast";

export default function LoginPage() {
  const router = useRouter();
  const { refetchUser } = useUser();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axiosInstance.post("/login", payload);
      return res.data;
    },
    onSuccess: async (data) => {
      await refetchUser();
      showSuccess(data.message || "Login successful");

      if (data?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
      showError(message);
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    mutate(data);
  };
  return (
    <>
      <div className="min-h-screen grid-cols-2 md:grid">
        <div className="relative w-full h-full">
          <NextImage
            src="/images/login-bg.jpg"
            alt="login-page"
            className="object-cover"
          />
        </div>
        <div className="container flex flex-col justify-center min-h-screen mx-auto md:px-20">
          <Form onSubmit={handleLogin} className="flex flex-col gap-6">
            <h1 className="text-xl font-semibold lg:text-3xl">
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
            <ButtonUI size="lg" fullWidth type="submit" isLoading={isPending}>
              Sign in
            </ButtonUI>
          </Form>
        </div>
      </div>
    </>
  );
}
