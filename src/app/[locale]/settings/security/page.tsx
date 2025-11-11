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
import { GlobalTable } from "@/app/[locale]/components/global-components/global-table/global-table";
import OutlineCard from "@/app/[locale]/components/global-components/cards/outline-card";
import CopySvg from "@/app/[locale]/components/common/svg_icons/copy-svg";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import type { ColumnType } from "@/types/global-table-types";

const changePasswordFormSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z.string().min(1, "New password is required"),
  confirmNewPassword: z.string().min(1, "Confirm new password is required"),
});

const twoFactorFormSchema = z.object({
  password: z.string().min(1, "Password is required"),
  twoFactorCode: z.string().min(1, "Two-factor code is required"),
  code: z.string().min(1, "QR code is required"),
});

type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;
type TwoFactorFormData = z.infer<typeof twoFactorFormSchema>;

export default function SecurityPage() {
  const changePasswordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });
  const [copied, setCopied] = useState(false);
  const [filterOption, setFilterOption] = useState("all");

  const twoFactorForm = useForm<TwoFactorFormData>({
    resolver: zodResolver(twoFactorFormSchema),
    defaultValues: {
      password: "",
      twoFactorCode: "",
      code: "",
    },
    mode: "onChange",
  });

  const handleChangePasswordSubmit = async (data: ChangePasswordFormData) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password changed successfully!");
      changePasswordForm.reset();
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  const handleTwoFactorSubmit = async (data: TwoFactorFormData) => {
    console.log({ data });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Two-factor authentication enabled!");
      twoFactorForm.reset();
    } catch (error: any) {
      toast.error(error.message as string);
    }
  };

  const handleCopyAddress = () => {
    const address = twoFactorForm.getValues("code");
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };
  interface TSessionData {
    browser: string;
    near: string;
    ipAddress: string;
    lastUsed: string;
    action: string;
  }
  const sessionsData: TSessionData[] = [
    {
      browser: "Opera (Mac)",
      near: "SE, Linköping (innerstaden)",
      ipAddress: "77.112.45.15",
      lastUsed: "11 hours ago",
      action: "Current",
    },
  ];

  const sessionsColumns: ColumnType<TSessionData>[] = [
    { key: "browser", label: "Browser" },
    { key: "near", label: "Near" },
    { key: "ipAddress", label: "IP Address" },
    { key: "lastUsed", label: "Last Used" },
    { key: "action", label: "Action" },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <OutlineCard title="Change Password">
        <Form {...changePasswordForm}>
          <form
            onSubmit={changePasswordForm.handleSubmit(
              handleChangePasswordSubmit
            )}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full"
          >
            <FormField
              control={changePasswordForm.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground-muted">
                    Old Password*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="w-full h-12 bg-background-1 focus:ring-0"
                      placeholder="Enter old password"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-destructive" />
                </FormItem>
              )}
            />
            <FormField
              control={changePasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground-muted">
                    New Password*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="w-full h-12 bg-background-1 focus:ring-0"
                      placeholder="Enter new password"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-destructive" />
                </FormItem>
              )}
            />
            <FormField
              control={changePasswordForm.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm font-medium text-foreground-muted">
                    Confirm New Password*
                  </FormLabel>
                  <FormControl className="h-12">
                    <Input
                      {...field}
                      type="password"
                      className="w-full h-12 bg-background-1 focus:ring-0"
                      placeholder="Confirm new password"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-destructive" />
                </FormItem>
              )}
            />
            <div className="h-full flex flex-col justify-end">
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
      <OutlineCard title="Two Factor">
        <Form {...twoFactorForm}>
          <form
            onSubmit={twoFactorForm.handleSubmit(handleTwoFactorSubmit)}
            className="space-y-4 lg:space-y-6"
          >
            <p className="text-sm text-foreground pb-4 lg:pb-6 border-b">
              To keep your account secure, enable two factor authentication by
              following the process below.
            </p>
            <p className="text-sm text-foreground ">
              Scan the QR code or manually enter the key into your authenticator
              app to link your account.
            </p>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center mt-4 border h-full w-full rounded-lg p-6">
                  <QRCode
                    value={
                      twoFactorForm.getValues("code") ||
                      "H2NT6Z6FJRGYEYRFKFBE3TCLYUHY3MGU2HGM3S0BS0QJS6QKA"
                    }
                    className="w-30 lg:w-50 h-30 lg:h-50 mt-2.5"
                  />
                </div>
                <div>
                  <FormField
                    control={twoFactorForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-sm font-medium text-foreground/55">
                          Code
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
                              aria-label="save"
                              type="button"
                              variant="gray"
                              className={`h-8 w-8 p-1 ${
                                copied ? "text-chart-1" : "text-foreground"
                              } rounded-[6px] text-sm ml-2.5`}
                              onClick={handleCopyAddress}
                            >
                              <CopySvg />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <p className="text-sm text-foreground/55 mt-2.5">
                    Scan the QR code or manually enter the key into your
                    authenticator app to link your account.
                  </p>
                  <FormField
                    control={twoFactorForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel className="text-sm font-medium text-foreground-muted">
                          Password*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="w-full h-12 bg-background-1 focus:ring-0"
                            placeholder="Enter password"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-destructive" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={twoFactorForm.control}
                    name="twoFactorCode"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel className="text-sm font-medium text-foreground-muted">
                          Two Factor Code*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="w-full h-12 bg-background-1 focus:ring-0"
                            placeholder="Enter two-factor code"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-destructive" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button
              aria-label="save"
              type="submit"
              variant="gray"
              className="w-full h-12 mt-6"
            >
              Submit
            </Button>
          </form>
        </Form>
      </OutlineCard>
      <OutlineCard title="Sessions">
        <div className="">
          <p className="text-sm text-foreground flex flex-row items-center gap-6 justify-between mt-2 border-b pb-4">
            <span>Track and manage your BETIDA sessions.</span>

            <Select
              value={filterOption}
              onValueChange={(val) => setFilterOption(val)}
              defaultValue="all"
            >
              <SelectTrigger className="w-fit h-8! bg-background-1 border text-foreground focus:border-accent">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </p>
          <div className="overflow-x-auto w-full">
            <GlobalTable
              data={sessionsData}
              columns={sessionsColumns}
              loading={false}
              emptyMessage="No sessions found"
              maxHeight={400}
            />
          </div>

          <div className="flex justify-end mt-4 lg:mt-6 pt-4 lg:pt-6 border-t">
            <span className="text-sm text-foreground-muted">
              1 result | Page 1
            </span>
          </div>
        </div>
      </OutlineCard>
    </div>
  );
}
