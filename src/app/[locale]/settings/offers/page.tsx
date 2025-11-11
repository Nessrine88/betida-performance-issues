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
  FormMessage,
} from "@/app/[locale]/components/ui/form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Input } from "@/app/[locale]/components/ui/input";

const offerFormSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
});

type OfferFormData = z.infer<typeof offerFormSchema>;

export default function OfferPage() {
  const t = useTranslations("offersPage");

  const welcomeForm = useForm<OfferFormData>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });

  const bonusForm = useForm<OfferFormData>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });

  const handleWelcomeSubmit = async (_formData: OfferFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      toast.success(t("welcomeSuccess"));
      welcomeForm.reset({ code: "" });
    } catch (error: any) {
      toast.error(error.message || t("submitError"));
    }
  };

  const handleBonusSubmit = async (_formData: OfferFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      toast.success(t("bonusSuccess"));
      bonusForm.reset({ code: "" });
    } catch (error: any) {
      toast.error(error.message || t("submitError"));
    }
  };

  const offersData = [
    {
      section: t("welcomeOfferTitle"),
      description: t("welcomeOfferDescription"),
      buttonText: t("welcomeButtonText"),
    },
    {
      section: t("bonusDropTitle"),
      description: t("bonusDropDescription"),
      buttonText: t("bonusButtonText"),
    },
  ];

  return (
    <div className="w-full space-y-6">
      {offersData.map((item, index) => {
        const form = index === 0 ? welcomeForm : bonusForm;
        const handleSubmit =
          index === 0 ? handleWelcomeSubmit : handleBonusSubmit;

        return (
          <Form {...form} key={item.section}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="bg-background-3 rounded-lg text-foreground divide-y divide-border"
            >
              <div className="w-full p-6 divide-y space-y-4 divide-border">
                <div className="w-full space-y-4 pb-4">
                  <h3 className="font-semibold text-xl">{item.section}</h3>
                  <p className="text-foreground/55 text-base">{item.description}</p>
                </div>
                <div className="w-full max-w-96">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm mb-1 text-foreground/55">
                          {t("codeLabel")}{" "}
                          <span className="text-red-400">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-full"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="p-6 text-end">
                <Button type="submit" variant="orangeGradient">
                  {item.buttonText}
                </Button>
              </div>
            </form>
          </Form>
        );
      })}
    </div>
  );
}
