"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSidebarStore } from "@/store/sidebar-store";
import GlobalModal from "../../../global-components/global-modal/global-modal";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";

const formSchema = z.object({
  campaignName: z.string().min(1, { message: "Campaign Name is required" }),
  campaignId: z.string().min(1, { message: "Campaign ID is required" }),
});

export default function AddCampaignModal() {
  const { addCampaignModalOpen, toggleAddCampaignModalOpen } =
    useSidebarStore();
  const pathName = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { campaignName: "", campaignId: "9S66az1r" },
  });

  const [referralLink, setReferralLink] = useState("betida.com/?c=9S66az1r");

  const handleCreateCampaign = async (values: z.infer<typeof formSchema>) => {
    setReferralLink(`betida.com/?c=${values.campaignId}`);
    toggleAddCampaignModalOpen();
  };

  return (
    <GlobalModal
      title="Create Campaign"
      open={addCampaignModalOpen}
      onOpenChange={() => {
        toggleAddCampaignModalOpen();
        router.push(pathName, { scroll: false });
      }}
      className="lg:min-w-96"
    >
      <div className="space-y-4 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateCampaign)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="campaignName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Campaign Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Campaign Name"
                      className="w-full mt-1 !h-12"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="campaignId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Campaign ID *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Campaign ID"
                      className="w-full mt-1 !h-12"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Referral Link
              </FormLabel>
              <FormControl>
                <Input
                  value={referralLink}
                  onChange={(e) => setReferralLink(e.target.value)}
                  placeholder="Enter Referral Link"
                  className="w-full mt-1 !h-12"
                  disabled
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
            <div className="w-full">
              <Button
                fillWidth
                variant="purpleGradient"
                type="submit"
                className="w-full py-3"
                disabled={!form.formState.isValid}
                aria-label="create campaign"
              >
                Create Campaign
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </GlobalModal>
  );
}
