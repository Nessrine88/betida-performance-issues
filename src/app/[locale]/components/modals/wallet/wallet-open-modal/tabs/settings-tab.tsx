"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/[locale]/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/[locale]/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/app/[locale]/components/ui/radio-group";
import Image from "next/image";
import { toast } from "sonner";

const formSchema = z.object({
  hideZeroBalances: z.boolean().optional(),
  displayCryptoInFiat: z.boolean().optional(),
  currency: z.string().min(1, "Please select a currency"),
});

type FormData = z.infer<typeof formSchema>;

export default function SettingsTab() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hideZeroBalances: false,
      displayCryptoInFiat: false,
      currency: "TRY",
    },
  });

  const handleCurrencySelect = (value: string) => {
    form.setValue("currency", value);
    form.trigger("currency");
  };

  const currencyOptions = [
    { value: "TRY", label: "TRY", icon: "/icons/turkey-flag.svg" },
    { value: "USD", label: "USD", icon: "/icons/usd-svg.svg" },
    { value: "TRY", label: "TRY", icon: "/icons/turkey-flag.svg" },
    { value: "USD", label: "USD", icon: "/icons/usd-svg.svg" },
    { value: "TRY", label: "TRY", icon: "/icons/turkey-flag.svg" },
    { value: "USD", label: "USD", icon: "/icons/usd-svg.svg" },
    { value: "TRY", label: "TRY", icon: "/icons/turkey-flag.svg" },
    { value: "USD", label: "USD", icon: "/icons/usd-svg.svg" },
    { value: "TRY", label: "TRY", icon: "/icons/turkey-flag.svg" },
    { value: "USD", label: "USD", icon: "/icons/usd-svg.svg" },
    { value: "TRY", label: "TRY", icon: "/icons/turkey-flag.svg" },
    { value: "USD", label: "USD", icon: "/icons/usd-svg.svg" },
  ];

  return (
    <div className="pt-4 flex flex-col gap-4 w-full">
      <Form {...form}>
        <form className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="hideZeroBalances"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <RadioGroup
                    value={field.value ? "true" : "false"}
                    onValueChange={(value) => field.onChange(value === "true")}
                    className="flex items-center space-x-3"
                  >
                    <RadioGroupItem value="true" />
                  </RadioGroup>
                </FormControl>
                <FormLabel className="font-normal flex flex-col items-start gap-1.5">
                  <span className="text-foreground text-sm">
                    Hide zero balances
                  </span>
                  <span className="text-foreground/55 text-xs">
                    Your zero balances won’t appear in your wallet
                  </span>
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayCryptoInFiat"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <RadioGroup
                    value={field.value ? "true" : "false"}
                    onValueChange={(value) => field.onChange(value === "true")}
                    className="flex items-center space-x-3"
                  >
                    <RadioGroupItem value="true" />
                  </RadioGroup>
                </FormControl>
                <FormLabel className="font-normal flex flex-col items-start gap-1.5">
                  <span className="text-foreground text-sm">
                    Display crypto in fiat
                  </span>
                  <span className="text-foreground/55 text-xs">
                    All bets & transactions will be settled in the crypto
                    equivalent
                  </span>
                </FormLabel>
              </FormItem>
            )}
          />
          <div className="w-full h-0.5 bg-foreground/55 my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4 w-full">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={handleCurrencySelect}
                    className="flex flex-col space-y-2"
                  >
                    {currencyOptions
                      .slice(0, currencyOptions?.length / 2)
                      .map((option, index) => (
                        <FormItem
                          key={index}
                          className="flex items-center gap-3"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal flex flex-row gap-1">
                            <span className="text-foreground text-xs">
                              {option.label}
                            </span>
                            <Image
                              src={option.icon || "/placeholder-icon.png"} // fallback if icon is missing
                              alt={option.label}
                              width={16}
                              height={16}
                              priority={true}   // small icons above the fold should load immediately
                              quality={80}      // keep it sharp but small file size
                            />
                                                      </FormLabel>
                        </FormItem>
                      ))}
                  </RadioGroup>
                )}
              />
            </div>
            <div className="space-y-4 w-full">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={handleCurrencySelect}
                    className="flex flex-col space-y-2"
                  >
                    {currencyOptions
                      .slice(
                        currencyOptions?.length / 2,
                        currencyOptions?.length
                      )
                      .map((option, index) => (
                        <FormItem
                          key={index + 6}
                          className="flex items-center gap-3"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal flex flex-row gap-1">
                            <span className="text-foreground text-xs">
                              {option.label}
                            </span>
                            <Image
                              height={16}
                              width={16}
                              src={option.icon}
                              alt={option.label}
                            />
                          </FormLabel>
                        </FormItem>
                      ))}
                  </RadioGroup>
                )}
              />
            </div>
          </div>
          <div className="mt-8">
            <Button
              variant="gray"
              className="w-full h-12"
              aria-label="enable 2fa"
              onClick={() => toast.info("Coming soon!")}
            >
              Enable 2FA
            </Button>
            <p className="text-xs text-foreground/55 mt-2.5 text-center">
              Improve your account security with Two-Factor Authentication
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
