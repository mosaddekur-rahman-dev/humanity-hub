"use client";

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  photoUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
});

type RegisterFormValues = z.infer<typeof formSchema>;

const iconClass =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground";
const inputClass = "h-11 bg-slate-50 pl-9";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", photoUrl: "", password: "" },
  });

  const password = useWatch({ control: form.control, name: "password" });
  const requirements = [
    {
      label: "At least one uppercase letter (A-Z)",
      met: /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter (a-z)",
      met: /[a-z]/.test(password),
    },
    { label: "Minimum 6 characters length", met: password.length >= 6 },
  ];

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      photoUrl: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
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
        <div className="flex size-14 items-center justify-center rounded-2xl  shadow-md">
          <div className="flex items-center justify-center rounded-lg bg-white">
            <Image
              src="/images/humanityhublogo.jpg"
              alt="Humanity Hub logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full"
            />
          </div>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#102C35]">
          Create Account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join the community and start driving social change
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </FieldLabel>
              <div className="relative">
                <User className={iconClass} />
                <Input
                  {...field}
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your Name"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </FieldLabel>
              <div className="relative">
                <Mail className={iconClass} />
                <Input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="photoUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="photoUrl">Profile Photo URL</FieldLabel>
              <div className="relative">
                <ImageIcon className={iconClass} />
                <Input
                  {...field}
                  id="photoUrl"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  aria-invalid={fieldState.invalid}
                  className={inputClass}
                />
              </div>
              <FieldDescription>
                Optional: Leave empty for default avatar
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">
                Password <span className="text-red-500">*</span>
              </FieldLabel>
              <div className="relative">
                <Lock className={iconClass} />
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#102C35]">
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <ul className="mt-2 space-y-1.5">
                {requirements.map((req) => (
                  <li
                    key={req.label}
                    className="flex items-center gap-2 text-xs text-muted-foreground">
                    {req.met ? (
                      <Check className="size-3.5 shrink-0 text-teal-600" />
                    ) : (
                      <X className="size-3.5 shrink-0 text-muted-foreground" />
                    )}
                    {req.label}
                  </li>
                ))}
              </ul>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-11 w-full cursor-pointer bg-[#12495c] text-base font-semibold text-white hover:bg-[#1b708d]">
          Register
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#065e7c] hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
