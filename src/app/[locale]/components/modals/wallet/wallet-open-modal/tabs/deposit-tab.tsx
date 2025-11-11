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
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { GlobalTabs } from "@/app/[locale]/components/global-components/GlobalTabs";
import WalletCurrencySelect from "../currency-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import { useEffect, useState } from "react";
import CopySvg from "@/app/[locale]/components/common/svg_icons/copy-svg";
import Image from "next/image";
import LocalCurrencySelect from "../local-currency-select";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/app/[locale]/components/ui/radio-group";

const formSchema = z.object({
  address: z.string().min(1, "Address is required").optional(),
  currency: z.string().min(1, "Currency is required"),
  amount: z
    .number()
    .min(500, "Minimum amount is 500")
    .max(50000, "Maximum amount is 50,000")
    .optional(),
  transferType: z.enum(["fast", "instant"]).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function DepositTab() {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [depositState, setDepositState] = useState<string | null>(
    searchParams.get("localDepositProceed") || "false"
  );
  const [selectedTab, setSelectedTab] = useState<string | null>(
    searchParams.get("subtab") || "crypto"
  );
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "H2NT6Z6FJRGYEYRFKFBE3TCLYUHY3MGU2HGM3S0BS0QJS6QKA",
      currency: "USDT",
      amount: undefined,
      transferType: "fast",
    },
    mode: "onChange",
  });

  const handleCryptoSubmit = async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (
        data.address === "H2NT6Z6FJRGYEYRFKFBE3TCLYUHY3MGU2HGM3S0BS0QJS6QKA"
      ) {
        toast.success("Deposit successful!");
      } else {
        toast.error("Please select the required fields!");
        return;
      }
      form.reset();
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };
  const handleSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDepositState("true");

      const currentParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      currentParams.set(`subtab`, `local`);
      currentParams.set(`localDepositProceed`, `true`);
      router.push(`?${currentParams.toString()}`, { scroll: false });
      toast.success("Deposit successful!");
      // form.reset();
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  const handleLocalSubmit = async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!data.amount || !data.transferType) {
        toast.error("Please enter amount and select transfer type!");
        return;
      }
      setDepositState("false");
      const currentParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      currentParams.set(`subtab`, `local`);
      currentParams.set(`localDepositProceed`, `false`);
      router.push(`?${currentParams.toString()}`, { scroll: false });
      toast.success("Deposit successful!");
      form.reset();
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  const handleCopyAddress = () => {
    const address = form.getValues("address");
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCurrencySelect = (currency: string) => {
    form.setValue("currency", currency);
    form.trigger("currency");
  };

  useEffect(() => {
    setSelectedTab(searchParams.get("subtab") || "crypto");
    setDepositState(searchParams.get("localDepositProceed") || "false");
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <GlobalTabs
        data={[
          { value: "crypto", label: "Crypto" },
          { value: "local", label: "Local Currency" },
        ]}
        tabName="subtab"
        tabButtonFull
      />
      {selectedTab === "crypto" ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCryptoSubmit)}
            className="space-y-4 w-full"
          >
            <FormField
              control={form.control}
              name="currency"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm font-medium text-foreground/55">
                    Currency
                  </FormLabel>
                  <WalletCurrencySelect
                    onCurrencySelect={handleCurrencySelect}
                  />
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm font-medium text-foreground/55">
                    Network
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full rounded-lg bg-background-1">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="BTC">BTC</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm font-medium text-foreground/55">
                    Address
                  </FormLabel>
                  <FormControl className="bg-sidebar h-full">
                    <div className="relative flex items-center border rounded-lg pr-2">
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-12 border-none focus:ring-0 text-sm"
                        placeholder="Enter wallet address"
                      />
                      <Button
                        type="button"
                        variant="gray"
                        className={`h-8 w-8 p-1 ${
                          copied ? "text-chart-1" : "text-foreground"
                        } rounded-[6px] text-sm ml-2.5`}
                        onClick={handleCopyAddress}
                        aria-label="copy"
                      >
                        <CopySvg />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <div className="border border-foreground/15 rounded-lg p-6 mx-auto w-fit">
              <QRCode
                value={
                  form.getValues("address") ||
                  "H2NT6Z6FJRGYEYRFKFBE3TCLYUHY3MGU2HGM3S0BS0QJS6QKA"
                }
                className="w-[100px] h-[100px] mt-2.5"
              />
            </div>
            <div className="w-full flex flex-row items-center justify-center mt-4">
              <div className="w-60 flex flex-row items-center justify-center gap-2">
                <div className="w-full h-0.5 bg-foreground/15 rounded-lg" />
                <p className="text-foreground text-sm font-semibold">Or</p>
                <div className="w-full h-0.5 bg-foreground/15 rounded-lg" />
              </div>
            </div>

            <Button
              variant="gray"
              className="w-full h-12 mt-4 flex flex-row items-center justify-between gap-6"
              onClick={() => {
                // Simulate direct wallet deposit
                toast.success("Deposited directly from wallet!");
              }}
              aria-label="deposit to wallet"
            >
              <p>Deposit directly from your wallet</p>
              <div className="flex flex-row items-center gap-2 justify-end">
                <Image
                  src="/icons/binance-svg.svg"
                  alt="pointer"
                  height={24}
                  width={24}
                />
                <Image
                  src="/icons/bit-coin-svg.svg"
                  alt="pointer"
                  height={24}
                  width={24}
                />
                <Image
                  src="/icons/usdt-svg.svg"
                  alt="pointer"
                  height={24}
                  width={24}
                />
                <Image
                  src="/icons/ethereum-svg.svg"
                  alt="pointer"
                  height={24}
                  width={24}
                />
                <span className="text-foreground/55 text-xs">+300</span>
              </div>
            </Button>
            <div className="mt-4 text-center text-foreground/55 flex flex-row items-center justify-between">
              <p>Credited</p>
              <p className="text-foreground">2 Confirmations</p>
            </div>
          </form>
        </Form>
      ) : depositState === "false" ? (
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
                    Wallet
                  </FormLabel>
                  <LocalCurrencySelect
                    onCurrencySelect={handleCurrencySelect}
                  />
                  <FormMessage className="text-xs text-red-500" />
                  <p className="text-xs text-foreground/55 mt-1">
                    Minimum: TRY 500 - Maximum: TRY 50,000
                  </p>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="orangeGradient"
              className="w-full h-12"
              // disabled={!form.formState.isValid}
              aria-label="deposit"
            >
              Deposit
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLocalSubmit)}
            className="flex flex-col"
          >
            <FormField
              control={form.control}
              name="transferType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="fastTransfer" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Fast bank transfer
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex space-x-4 my-4 ">
              <button
                type="button"
                className="flex-1 p-2 bg-background-1 rounded-lg text-foreground/55"
                onClick={() => {
                  form.setValue("amount", 500);
                  form.trigger("amount");
                }}
                aria-label="500"
              >
                500
              </button>
              <button
                type="button"
                className="flex-1 p-2 bg-background-1 rounded-lg text-foreground/55"
                onClick={() => {
                  form.setValue("amount", 5000);
                  form.trigger("amount");
                }}
                aria-label="5000"
              >
                5,000
              </button>
              <button
                type="button"
                className="flex-1 p-2 bg-background-1 rounded-lg text-foreground/55"
                onClick={() => {
                  form.setValue("amount", 30000);
                  form.trigger("amount");
                }}
                aria-label="30000"
              >
                30,000
              </button>
            </div>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm font-medium text-foreground/55">
                    Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="w-full h-12 bg-background-1 focus:ring-0 text-sm text-foreground/55"
                      placeholder="Enter amount"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? undefined : Number(val));
                      }}
                      min={500}
                      max={50000}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-foreground/55 mb-6">
                    Minimum: <span className="text-foreground">TRY 500</span> -
                    Maximum: <span className="text-foreground">TRY 50,000</span>
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="orangeGradient"
              className="w-full h-12"
              disabled={!form.formState.isValid}
              aria-label="set amount"
            >
              Set Amount
            </Button>
            <FormField
              control={form.control}
              name="transferType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="instant" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Instant bank transfer
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>

                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
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
    </div>
  );
}
