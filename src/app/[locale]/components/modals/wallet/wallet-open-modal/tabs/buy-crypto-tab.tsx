"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/[locale]/components/ui/button";
import { Input } from "@/app/[locale]/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";
import WalletCurrencySelect from "../currency-select";

const formSchema = z.object({
  amount: z
    .number()
    .min(
      0.01,
      "Sorry, this is lower than the minimum purchase amount of 700.00 TRY "
    ),
  currency: z.string().min(1, "Currency is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function BuyCryptoTab({
  onAmountChange,
}: {
  onAmountChange?: (amount: number) => void;
}) {
  const router = useRouter();
  const [equivalent, setEquivalent] = useState("$0.00");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      currency: "TRY",
    },
    mode: "onChange",
  });

  const handleSubmit = async () => {
    try {
      const current = new URLSearchParams(window.location.search);
      current.set("walletTabs", "provider");
      router.push(`?${current.toString()}`, { scroll: false });
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };
  const handleCurrencySelect = (currency: string) => {
    form.setValue("currency", currency);
    form.trigger("currency");
  };

  const handleMaxAmount = () => {
    form.setValue("amount", 1000);
    form.trigger("amount");
    setEquivalent("$1000.00");
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <GlobalTabs
        data={[
          { value: "overview", label: "Overview" },
          { value: "buyCrypto", label: "Buy Crypto" },
          { value: "settings", label: "Settings" },
        ]}
        tabName="walletTabs"
        tabButtonFull
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="currency"
            render={() => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium text-foreground/55">
                  Buy
                </FormLabel>
                <WalletCurrencySelect onCurrencySelect={handleCurrencySelect} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium text-foreground/55">
                  Amount*
                </FormLabel>
                <FormControl className="bg-sidebar h-full">
                  <div className="relative flex items-center border rounded-lg pr-2">
                    <Input
                      {...field}
                      type="number"
                      className="w-full h-12 border-none focus:ring-0 text-sm"
                      placeholder="Enter amount"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        const numVal = val === "" ? 0 : Number(val);
                        field.onChange(numVal);
                        setEquivalent(`$${numVal.toFixed(2)}`);
                        onAmountChange?.(numVal);
                      }}
                    />
                    <span className="text-foreground/55 text-sm mx-2">
                      {equivalent}
                    </span>
                    <Button
                      aria-label="max"
                      type="button"
                      variant="gray"
                      className="h-8 px-4 text-foreground rounded-[6px] text-sm"
                      onClick={handleMaxAmount}
                    >
                      Max
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-foreground/55" />
              </FormItem>
            )}
          />

          <Button
            aria-label="bye"
            type="submit"
            variant="orangeGradient"
            className="w-full h-12 mt-4"
            disabled={!form.formState.isValid || form.watch("amount") <= 0}
          >
            Buy
          </Button>
        </form>
      </Form>
      <div className="mt-14">
        <Button
          variant="gray"
          aria-label="enable 2fa"
          className="w-full h-12"
          onClick={() => toast.info("Coming soon!")}
        >
          Enable 2FA
        </Button>
        <p className="text-xs text-foreground/55 mt-2.5 text-center">
          Improve your account security with Two-Factor Authentication
        </p>
      </div>
    </div>
  );
}
