// app/responsible-gambling/gambling-limits/content.tsx
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BarsSVG from "@/app/[locale]/components/common/svg_icons/bars-svg";
import { Input } from "@/app/[locale]/components/global-components/form-inputs";
import { Button } from "@/app/[locale]/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { getLocalizedString, type LanguageCode } from "@/lib/helpers/localized-content";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/lib/helpers/portable-text-components";
import { Suspense } from "react";
import { Skeleton } from "@/app/[locale]/components/ui/skeleton";
import { useTranslations } from "next-intl";

type Props = {
  data: any;
  locale: string;
};

const formSchema = z.object({
  limitType: z.enum(["Loss", "Wager"]),
  limitAmount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "positiveNumberError",
    }),
  limitPeriod: z.enum(["Day", "Week", "Month"]),
});

export default function GamblingLimitPageContent({ data, locale }: Props) {
  const t = useTranslations("gamblingLimits");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      limitType: "Loss",
      limitAmount: "0.0000000",
      limitPeriod: "Day",
    },
  });

  const title = getLocalizedString(data?.title, locale as LanguageCode);
  const descriptionBlocks =
    data?.description?.find((d: any) => d.language === locale)?.blocks || [];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/gambling-limits-placeholder-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success(t("successToast"));
        form.reset();
      } else {
        const error = await response.json();
        toast.error(error.error || t("errorToast"));
      }
    } catch (error: any) {
      toast.error(error?.message || t("genericError"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full bg-background-1 p-6 rounded-lg overflow-hidden flex flex-col gap-6 md:gap-8">
      <div className="rounded-lg w-full h-35 md:h-62.5 bg-background-3 flex items-center justify-center aspect-92/25">
        <BarsSVG className="h-20 md:h-30 w-20 md:w-30" />
      </div>

      <div className="bg-background rounded-lg p-6 flex flex-col gap-4">
        <Suspense
          fallback={
            <div className="space-y-3">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          }
        >
          <div className="flex flex-col gap-1">
            <div className="text-base text-foreground font-semibold">
              {title}
            </div>
            <div className="text-sm text-foreground/55 font-normal">
              <PortableText
                value={descriptionBlocks}
                components={portableTextComponents}
              />
            </div>
            <div className="text-sm text-foreground/55 font-normal pt-4">
              {t("stakeSmart")}
              <span className="text-foreground ml-1">{t("stakeSmartLink")}</span>
            </div>
          </div>
        </Suspense>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <FormField
                control={form.control}
                name="limitType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xs text-foreground-muted">
                      {t("limitTypeLabel")}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full h-12 bg-background-1 text-foreground">
                          <SelectValue placeholder={t("selectLimitType")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Loss">
                            {t("lossOption")}
                          </SelectItem>
                          <SelectItem value="Wager">
                            {t("wagerOption")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="limitAmount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xs text-foreground-muted">
                      {t("limitAmountLabel")}
                    </FormLabel>
                    <FormControl className="w-full">
                      <div className="flex flex-row items-center w-full">
                        <Input
                          {...field}
                          type="text"
                          placeholder="0.0000000"
                          className="w-full h-12 bg-background-1 text-foreground"
                          disabled={isSubmitting}
                        />
                        <Image
                          className="-ml-8 mb-1 border-none"
                          src="/icons/bit-coin-svg.svg"
                          alt="bitcoin"
                          height={20}
                          width={20}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="limitPeriod"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xs text-foreground-muted">
                      {t("limitPeriodLabel")}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full h-12 bg-background-1 text-foreground">
                          <SelectValue placeholder={t("selectLimitPeriod")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Day">{t("dayOption")}</SelectItem>
                          <SelectItem value="Week">
                            {t("weekOption")}
                          </SelectItem>
                          <SelectItem value="Month">
                            {t("monthOption")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <hr className="bg-foreground/15" />
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-start md:justify-between">
              <div className="text-sm text-foreground/55 font-normal text-center">
                {t("updateNotice")}
              </div>
              <Button
                type="submit"
                variant="outline"
                className="w-fit"
                disabled={isSubmitting}
                aria-label="add limit"
              >
                {isSubmitting ? t("adding") : t("addLimit")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
