"use client";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import OutlineCard from "../components/global-components/cards/outline-card";
import { Input } from "@/app/[locale]/components/ui/input";
import { Button } from "../components/ui/button";

type EmailFormData = z.infer<typeof emailFormSchema>;
type PhoneFormData = z.infer<typeof phoneFormSchema>;

const emailFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});
const phoneFormSchema = z
  .object({
    phoneCountryCode: z.string().min(1, "Country code is required"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .refine(
        (value) => {
          const digits = value.replace(/\D/g, "");
          return digits.length >= 7 && digits.length <= 15;
        },
        { message: "Phone number must be 7–15 digits long" }
      )
      .refine((value) => /^[\d\s\-\\(\\)]+$/.test(value), {
        message: "Only digits, spaces, dashes, and parentheses allowed",
      }),
  })
  .refine(
    (data) => {
      const fullPhone = `${data.phoneCountryCode}${data.phoneNumber}`.replace(
        /\D/g,
        ""
      );
      return fullPhone.length <= 16;
    },
    {
      message:
        "Full phone number (including country code) cannot exceed 16 digits",
      path: ["phoneNumber"],
    }
  );

export default function SettingsPage() {
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "mon1453@yandex.com",
    },
    mode: "onChange",
  });

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: { isValid: isEmailValid },
  } = emailForm;
  const email = useWatch({ control: emailControl, name: "email" });

  const handleEmailConfirm = (data: EmailFormData) => {
    toast.success(`Email confirmed: ${data.email}`);
  };

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phoneCountryCode: "+1",
      phoneNumber: "",
    },
    mode: "onChange",
  });

  const {
    control: phoneControl,
    handleSubmit: handlePhoneSubmit,
    formState: { isValid: isPhoneValid },
  } = phoneForm;
  const phoneCountryCode = useWatch({
    control: phoneControl,
    name: "phoneCountryCode",
  });
  const phoneNumber = useWatch({ control: phoneControl, name: "phoneNumber" });
  console.log({ phoneCountryCode, phoneNumber });

  const onPhoneSubmit = (data: PhoneFormData) => {
    toast.success(
      `Phone submitted: ${data.phoneCountryCode} ${data.phoneNumber}`
    );
  };

  return (
    <div className="">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OutlineCard title="Email">
          <Form {...emailForm}>
            <form
              onSubmit={handleEmailSubmit(handleEmailConfirm)}
              className="space-y-6 flex flex-col justify-between h-full"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-foreground-muted">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="w-full h-12 text-foreground bg-background-1 border-border placeholder:text-foreground-muted focus:border-accent pr-10"
                        />
                        {email && !emailForm.formState.errors.email && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-1" />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <Button
                  className="w-full"
                  variant="orangeGradient"
                  type="submit"
                  disabled={!isEmailValid}
                  aria-label="confirm email"
                >
                  Confirm Email
                </Button>
              </div>
            </form>
          </Form>
        </OutlineCard>

        <OutlineCard title="Phone Number">
          <Form {...phoneForm}>
            <form
              onSubmit={handlePhoneSubmit(onPhoneSubmit)}
              className="space-y-6"
            >
              <div className="text-sm text-foreground">
                We only service areas that are listed in the available country
                code list.
              </div>
              <FormField
                control={phoneForm.control}
                name="phoneCountryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-foreground-muted">
                      Country Code*
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue="+1"
                      >
                        <SelectTrigger className="w-full h-12 bg-background-1 border-border text-foreground focus:border-accent">
                          <SelectValue placeholder="+1" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+1">
                            +1 Virgin Islands (U.S.), Canada, United States
                          </SelectItem>
                          <SelectItem value="+44">
                            +44 United Kingdom
                          </SelectItem>
                          <SelectItem value="+49">+49 Germany</SelectItem>
                          <SelectItem value="+33">+33 France</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={phoneForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-foreground-muted">
                      Phone Number*
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full h-12 text-foreground bg-background-1 border-border placeholder:text-foreground-muted focus:border-accent"
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow only digits, spaces, dashes, parentheses
                          const cleaned = value.replace(/[^\d\s\-\\(\\)]/g, "");
                          field.onChange(cleaned);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <Button
                  className="w-full"
                  variant="gray"
                  type="submit"
                  disabled={!isPhoneValid}
                  aria-label="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </OutlineCard>
      </div>
    </div>
  );
}
