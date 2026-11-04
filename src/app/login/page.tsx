"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof formSchema>;

const iconClass =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground";
const inputClass = "h-11 bg-slate-50 pl-9";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
    });

    if (data) {
      redirect("/events");
      console.log(data);
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border bg-white p-6 shadow-sm sm:p-8 my-5">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/images/humanityhublogo.jpg"
          alt="Humanity Hub logo"
          width={56}
          height={56}
          className="h-14 w-14 rounded-full"
        />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#102C35]">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Log in to join events and make a difference in your community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </FieldLabel>
                <div className="relative">
                  <Mail className={iconClass} />
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={fieldState.invalid}
                    className={inputClass}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-[#065e7c] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className={iconClass} />
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-invalid={fieldState.invalid}
                    className={`${inputClass} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#102C35]">
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="h-11 w-full bg-[#12495c] text-base font-semibold text-white hover:bg-[#1b708d] cursor-pointer">
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </FieldGroup>
      </form>
      <div className="flex justify-between items-center gap-3 mt-8">
        <div className="h-0.5 w-30 bg-gray-300 "></div>
        <p className="text-center">OR CONTINUE WITH</p>
        <div className="h-0.5 w-30 bg-gray-300 "></div>
      </div>
      <button className="btn flex gap-2 justify-center items-center cursor-pointer w-full  mt-8 bg-[#F0FDF4] py-2 rounded-sm border border-gray-400">
        <Image
          src="/images/google logo.webp"
          alt="google logo"
          width={10}
          height={10}
          className="w-5 h-5"
        />
        <p>CONTINUE WITH GOOGLE</p>
      </button>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#065e7c] hover:underline">
          Resigter here
        </Link>
      </p>
    </div>
  );
}
