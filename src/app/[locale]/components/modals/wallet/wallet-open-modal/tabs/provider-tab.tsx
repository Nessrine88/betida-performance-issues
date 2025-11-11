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
import { toast } from "sonner";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/app/[locale]/components/ui/radio-group";

const formSchema = z.object({
  provider: z.string().min(1, "Please select a payment provider"),
});

type FormData = z.infer<typeof formSchema>;

export default function ProviderTab({
  onTabChange,
  amount,
}: {
  onTabChange: (tab: string) => void;
  amount: number;
}) {
  console.log({ amount });
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (data: FormData) => {
    console.log({ data });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onTabChange("overview");
      toast.success("Purchase successful!");
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium text-foreground/55 mb-2">
                  Select Payment Provider
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <label className="flex items-center p-3 rounded-lg bg-background-1 hover:bg-sidebar hover:border hover:border-foreground data-[state=checked]:bg-sidebar data-[state=checked]:border data-[state=checked]:border-foreground h-16.5 mb-2">
                      <RadioGroupItem value="Swapped.com" className="mr-2" />
                      <div className="flex flex-row gap-1">
                        <Image
                          src="/icons/pointer-svg.svg"
                          alt="pointer"
                          height={16}
                          width={16}
                        />
                        Swapped.com
                      </div>
                    </label>

                    <label className="flex items-center p-3 rounded-lg bg-background-1 hover:bg-sidebar hover:border hover:border-foreground data-[state=checked]:bg-sidebar data-[state=checked]:border data-[state=checked]:border-foreground h-16.5">
                      <RadioGroupItem value="MoonPay" className="mr-2" />
                      <div className="flex flex-row gap-1">
                        <Image
                          src="/icons/pointer-svg.svg"
                          alt="pointer"
                          height={16}
                          width={16}
                        />
                        MoonPay
                      </div>
                      <span className="ml-auto text-foreground/55 text-sm flex flex-col items-end">
                        You get
                        <span className="text-foreground font-semibold ">
                          0.023 BNB
                        </span>
                      </span>
                    </label>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-6 text-foreground/55 text-xs">
            Disclaimer: Ut incididunt ac lorem sit amet fermentum. Vivamus
            eleifend vitae magna at posuere. Vivamus sit amet blandit sapien,
            nec interdum augue. Aliquam maximus risus non lacinia, a dapibus
            turpis malesuada.
          </div>
          <Button
            aria-label="bye"
            type="submit"
            variant="orangeGradient"
            className="w-full h-12 mt-4"
            disabled={!form.formState.isValid}
          >
            Buy
          </Button>
        </form>
      </Form>
      <div className="mt-14">
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
