import { Button, Input } from "@base-ui/react";
import { Send } from "lucide-react";

export function Newsletter() {
  return (
    <section className="px-4 py-10 pb-20 bg-[#F0FDF4]">
      <div className="mx-auto max-w-4xl rounded-3xl border bg-linear-to-br from-white via-white to-green-100/70 px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16 border-[#102C35]">
        <p className="text-xs font-bold uppercase tracking-widest text-[#065e7c]">
          Stay Connected
        </p>

        <h2 className="mx-auto mt-3 max-w-xl text-2xl font-extrabold tracking-tight text-[#102C35] sm:text-5xl">
          Subscribe to Newsletter
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-xs text-slate-600 sm:text-base">
          Get notified when new winter drives, blanket distributions, or
          emergency cleanups are organized in your neighborhood.
        </p>
        <form
          noValidate
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            autoComplete="email"
            className="h-11 flex-1 bg-slate-50"
          />
          <Button
            type="submit"
            className="h-11 gap-2 bg-[#12495c] px-6 font-semibold text-white hover:bg-[#1b708d] flex items-center rounded-sm">
            <Send className="size-4" /> Subscribe
          </Button>
        </form>

        <p className="mt-5 text-xs text-slate-500">Unsubscribe at any time.</p>
      </div>
    </section>
  );
}
