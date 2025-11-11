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
import { Switch } from "@/app/[locale]/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/app/[locale]/components/ui/radio-group";
import { toast } from "sonner";
import OutlineCard from "@/app/[locale]/components/global-components/cards/outline-card";
import GlobeIconSVG from "@/app/[locale]/components/common/svg_icons/globe-icon-svg";

const privacyFormSchema = z.object({
  ghostMode: z.boolean().catch(false),
  hideAllStats: z.boolean().catch(false),
  hideRaceStats: z.boolean().catch(false),
});

const fiatFormattingFormSchema = z.object({
  fiatFormat: z.string().min(1, "Fiat format is required"),
});

const communityFormSchema = z.object({
  excludeFromRain: z.boolean().catch(false),
});

const marketingFormSchema = z.object({
  emailOffers: z.boolean().catch(false),
  smsOffers: z.boolean().catch(false),
});

type PrivacyFormData = z.infer<typeof privacyFormSchema>;
type FiatFormattingFormData = z.infer<typeof fiatFormattingFormSchema>;
type CommunityFormData = z.infer<typeof communityFormSchema>;
type MarketingFormData = z.infer<typeof marketingFormSchema>;

export default function PreferencesPage() {
  const privacyForm = useForm<PrivacyFormData>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      ghostMode: false,
      hideAllStats: false,
      hideRaceStats: false,
    },
    mode: "onChange",
  });

  const fiatFormattingForm = useForm<FiatFormattingFormData>({
    resolver: zodResolver(fiatFormattingFormSchema),
    defaultValues: {
      fiatFormat: "123,456.78",
    },
    mode: "onChange",
  });

  const communityForm = useForm<CommunityFormData>({
    resolver: zodResolver(communityFormSchema),
    defaultValues: {
      excludeFromRain: false,
    },
    mode: "onChange",
  });

  const marketingForm = useForm<MarketingFormData>({
    resolver: zodResolver(marketingFormSchema),
    defaultValues: {
      emailOffers: false,
      smsOffers: false,
    },
    mode: "onChange",
  });

  const handlePrivacySubmit = async (data: PrivacyFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Privacy settings updated successfully!");
      privacyForm.reset(data);
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  const handleFiatFormattingSubmit = async (data: FiatFormattingFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Fiat formatting updated successfully!");
      fiatFormattingForm.reset(data);
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  const handleCommunitySubmit = async (data: CommunityFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Community settings updated successfully!");
      communityForm.reset(data);
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  const handleMarketingSubmit = async (data: MarketingFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Marketing preferences updated successfully!");
      marketingForm.reset(data);
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="flex flex-col gap-6 w-full">
        <OutlineCard className="!h-auto" title="Privacy">
          <Form {...(privacyForm as any)}>
            <form
              onSubmit={privacyForm.handleSubmit(handlePrivacySubmit as any)}
              className="space-y-4"
            >
              <p className="text-sm text-foreground pb-4 border-b">
                User privacy is one of the core values of BETIDA. These settings
                allow you to be completely anonymous from the rest of the
                players.
              </p>
              <FormField
                control={privacyForm.control as any as any}
                name="ghostMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-start gap-9 ">
                    <FormControl>
                      <Switch
                        size="lg"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium text-foreground flex flex-col items-start">
                        Enable Ghost Mode
                        <span className="text-xs text-foreground/55">
                          User privacy is one of the core values of BETIDA. These
                          settings allow you to be completely anonymous from the
                          rest of the players.
                        </span>
                      </FormLabel>
                      <FormMessage className="text-xs text-destructive" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={privacyForm.control as any}
                name="hideAllStats"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-start gap-9">
                    <FormControl>
                      <Switch
                        size="lg"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium text-foreground flex flex-col items-start">
                        Hide All Your Statistics
                        <span className="text-xs text-foreground/55">
                          {`Other users won't be able to view your wins, losses
                          and wagered statistics`}
                        </span>
                      </FormLabel>

                      <FormMessage className="text-xs text-destructive" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={privacyForm.control as any}
                name="hideRaceStats"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-start gap-9">
                    <FormControl>
                      <Switch
                        size="lg"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium text-foreground flex flex-col items-start">
                        Hide All Your Race Statistics
                        <span className="text-xs text-foreground/55">
                          {`Other users won't be able to view your race statistics`}
                        </span>
                      </FormLabel>

                      <FormMessage className="text-xs text-destructive" />
                    </div>
                  </FormItem>
                )}
              />
              <p className="text-sm text-foreground-muted">
                Please allow up to 30 seconds for update to take effect.
              </p>
              <Button
                aria-label="save"
                type="submit"
                variant="gray"
                className="w-full h-12"
              >
                Save
              </Button>
            </form>
          </Form>
        </OutlineCard>

        <OutlineCard className="!h-auto" title="Fiat Number Formatting">
          <Form {...fiatFormattingForm}>
            <form
              onSubmit={fiatFormattingForm.handleSubmit(
                handleFiatFormattingSubmit
              )}
              className="space-y-6"
            >
              <FormField
                control={fiatFormattingForm.control as any}
                name="fiatFormat"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col gap-6"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="123,456.78" />
                          </FormControl>
                          <FormLabel className="text-sm text-foreground">
                            123,456.78
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="123.456,78" />
                          </FormControl>
                          <FormLabel className="text-sm text-foreground">
                            123.456,78
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="123 456.78" />
                          </FormControl>
                          <FormLabel className="text-sm text-foreground">
                            123 456.78
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
              <Button
                aria-label="save"
                type="submit"
                variant="gray"
                className="w-full h-12"
              >
                Save
              </Button>
            </form>
          </Form>
        </OutlineCard>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <OutlineCard className="!h-auto" title="Community">
          <Form {...communityForm}>
            <form
              onSubmit={communityForm.handleSubmit(
                handleCommunitySubmit as any
              )}
              className="space-y-6 h-full"
            >
              <FormField
                control={communityForm.control as any}
                name="excludeFromRain"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-start gap-9">
                    <FormControl>
                      <Switch
                        size="lg"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium text-foreground flex flex-col items-start">
                        Exclude From Rain
                        <span className="text-xs text-foreground/55">
                          Prevents you from receiving a rain in chat
                        </span>
                      </FormLabel>
                      <FormMessage className="text-xs text-destructive" />
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2 5">
                <p className="text-sm text-foreground-muted">
                  Please allow up to 30 seconds for update to take effect.
                </p>
                <Button
                  aria-label="save"
                  type="submit"
                  variant="gray"
                  className="w-full h-12"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </OutlineCard>

        <OutlineCard className="!h-auto" title="Marketing">
          <Form {...marketingForm}>
            <form
              onSubmit={marketingForm.handleSubmit(
                handleMarketingSubmit as any
              )}
              className="space-y-6"
            >
              <FormField
                control={marketingForm.control as any}
                name="emailOffers"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-start gap-9">
                    <FormControl>
                      <Switch
                        size="lg"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium text-foreground flex flex-col items-start">
                        Receive Email Offers From Us
                        <span className="text-xs text-foreground/55">
                          Choose if you wish to hear from us via email
                        </span>
                      </FormLabel>

                      <FormMessage className="text-xs text-destructive" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={marketingForm.control as any}
                name="smsOffers"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-start gap-9">
                    <FormControl>
                      <Switch
                        size="lg"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium text-foreground flex flex-col items-start">
                        Receive SMS Offers From Us
                        <span className="text-xs text-foreground/55">
                          Choose if you wish to hear from us via SMS
                        </span>
                      </FormLabel>
                      <FormMessage className="text-xs text-destructive" />
                    </div>
                  </FormItem>
                )}
              />
              <Button
                aria-label="save"
                type="submit"
                variant="gray"
                className="w-full h-12"
              >
                Save
              </Button>
            </form>
          </Form>
        </OutlineCard>

        <OutlineCard className="!h-auto" title="Ignored Users">
          <div className="space-y-6">
            <p className="text-sm text-foreground-muted pb-6 border-b">
              View and manage BETIDA users that you have ignored.
            </p>
            <div className="flex items-center justify-center">
              <GlobeIconSVG height={48} width={48} />
            </div>
            <p className="text-sm text-foreground-muted text-center">
              No ignored users to show
            </p>
          </div>
        </OutlineCard>
      </div>
    </div>
  );
}
