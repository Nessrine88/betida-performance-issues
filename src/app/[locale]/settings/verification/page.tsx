"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/[locale]/components/ui/form";
import { Input } from "@/app/[locale]/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import { Button } from "@/app/[locale]/components/ui/button";
import { DatePicker } from "@/app/[locale]/components/ui/date-picker";
import GlobalFileUpload from "@/app/[locale]/components/global-components/global-file-upload";
import OutlineCard from "@/app/[locale]/components/global-components/cards/outline-card";

// Badge component for "Submitted"
function SubmittedBadge() {
  return (
    <span className="bg-green-1 text-background px-2 py-1 text-xs font-medium rounded-full">
      Submitted
    </span>
  );
}

// State for completed levels (simulate with local state; in real, use context or API)
export default function VerificationPage() {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(
    new Set()
  );

  const markLevelCompleted = (level: number) => {
    setCompletedLevels((prev) => new Set([...prev, level]));
    toast.success(`Level ${level} submitted successfully!`);
    // In real app, redirect or refresh
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <OutlineCard
        title={
          <div className="flex items-center gap-2">
            Level 1{completedLevels.has(1) && <SubmittedBadge />}
          </div>
        }
        collapsable
        defaultOpen={!completedLevels.has(1)}
      >
        <div className="flex flex-col gap-6">
          {/* {!completedLevels.has(1) && (
            <p className="text-foreground text-sm flex flex-row items-center gap-2 border rounded-lg p-3">
              <div className="bg-chart-3/30 text-chart-3 rounded-full h-5 w-5 flex items-center justify-center">
                i
              </div>{" "}
              Please complete level 1 verification first.
            </p>
          )} */}
          <Level1Form onSubmitSuccess={() => markLevelCompleted(1)} />
        </div>
      </OutlineCard>

      <OutlineCard
        title={
          <div className="flex items-center gap-2">
            Level 2{completedLevels.has(2) && <SubmittedBadge />}
          </div>
        }
        collapsable
        defaultOpen={completedLevels.has(1) && !completedLevels.has(2)}
      >
        <div className="flex flex-col gap-6">
          {!completedLevels.has(1) && (
            <p className="text-foreground text-sm flex flex-row items-center gap-2 border rounded-lg p-3">
              <div className="bg-chart-3/30 text-chart-3 rounded-full h-5 w-5 flex items-center justify-center">
                i
              </div>{" "}
              Please complete level 1 verification first.
            </p>
          )}
          <Level2Form onSubmitSuccess={() => markLevelCompleted(2)} />
        </div>
      </OutlineCard>

      <OutlineCard
        title={
          <div className="flex items-center gap-2">
            Level 3{completedLevels.has(3) && <SubmittedBadge />}
          </div>
        }
        collapsable
        defaultOpen={completedLevels.has(2) && !completedLevels.has(3)}
      >
        <div className="flex flex-col gap-6">
          {!completedLevels.has(2) && (
            <p className="text-foreground text-sm flex flex-row items-center gap-2 border rounded-lg p-3">
              <div className="bg-chart-3/30 text-chart-3 rounded-full h-5 w-5 flex items-center justify-center">
                i
              </div>{" "}
              Please complete level 2 verification first.
            </p>
          )}
          <Level3Form onSubmitSuccess={() => markLevelCompleted(3)} />
        </div>
      </OutlineCard>

      <OutlineCard
        title={
          <div className="flex items-center gap-2">
            Level 4{completedLevels.has(4) && <SubmittedBadge />}
          </div>
        }
        collapsable
        defaultOpen={completedLevels.has(3) && !completedLevels.has(4)}
      >
        <div className="flex flex-col gap-6">
          {!completedLevels.has(3) && (
            <p className="text-foreground text-sm flex flex-row items-center gap-2 border rounded-lg p-3">
              <div className="bg-chart-3/30 text-chart-3 rounded-full h-5 w-5 flex items-center justify-center">
                i
              </div>{" "}
              Please complete level 3 verification first.
            </p>
          )}
          <Level4Form onSubmitSuccess={() => markLevelCompleted(4)} />
        </div>
      </OutlineCard>
    </div>
  );
}

// Level 1 Form
const level1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
  dob: z.string().min(1, "Date of birth is required"),
  residentialAddress: z.string().min(1, "Residential address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  occupationIndustry: z.string().min(1, "Occupation industry is required"),
  occupation: z.string().min(1, "Occupation is required"),
  occupationExperience: z.string().min(1, "Occupation experience is required"),
});

type Level1Data = z.infer<typeof level1Schema>;

interface LevelFormProps {
  onSubmitSuccess: () => void;
}

function Level1Form({ onSubmitSuccess }: LevelFormProps) {
  const form = useForm<Level1Data>({
    resolver: zodResolver(level1Schema) as unknown as Resolver<Level1Data>,
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      placeOfBirth: "",
      dob: "",
      residentialAddress: "",
      city: "",
      postalCode: "",
      occupationIndustry: "",
      occupation: "",
      occupationExperience: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: Level1Data) => {
    // Simulate API call
    try {
      // await fetch("/api/verify-level1", { method: "POST", body: JSON.stringify(data) });
      console.log("Level 1 data:", data);
      onSubmitSuccess();
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-foreground/55 flex flex-col gap-1.5">
          <div className="span text-semibold text-foreground">
            Confirm Your Details
          </div>
          Confirm Your Details. Please fill in your details & confirm your
          identity to unlock additional services. All information is private &
          secure.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">
                  First Name (including middle name, if applicable)*
                </FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 bg-background-1" />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Last Name*</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 bg-background-1" />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm">Country*</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="country"
                      className="w-full h-12 bg-background-1 border rounded-lg"
                    >
                      <SelectValue className="!pl-12" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Turkey" className="!pl-12">
                        Turkey
                      </SelectItem>
                      {/* Add more countries as needed */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="placeOfBirth"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm">Place of Birth*</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="placeOfBirth"
                      className="w-full h-12 bg-background-1 border rounded-lg"
                    >
                      <SelectValue className="!pl-12" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Turkey" className="!pl-12">
                        Turkey
                      </SelectItem>
                      {/* Add more */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Date of Birth*</FormLabel>
                <FormControl>
                  <DatePicker
                    name={field.name}
                    control={form.control}
                    className="w-full h-12 border rounded-lg"
                    placeholder="Select date"
                  />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="residentialAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Residential Address*</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 bg-background-1" />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">City*</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 bg-background-1" />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Postal Code*</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 bg-background-1" />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupationIndustry"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm">Occupation Industry*</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="occupationIndustry"
                      className="w-full h-12 bg-background-1 border rounded-lg"
                    >
                      <SelectValue className="!pl-12" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="Arts, Culture, Entertainment & Media"
                        className="!pl-12"
                      >
                        Arts, Culture, Entertainment & Media
                      </SelectItem>
                      {/* Add more */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Occupation*</FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 bg-background-1" />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupationExperience"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm">
                  Occupation Experience*
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="occupationExperience"
                      className="w-full h-12 bg-background-1 border rounded-lg"
                    >
                      <SelectValue className="!pl-12" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Junior" className="!pl-12">
                        Junior
                      </SelectItem>
                      {/* Add more */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <div className="h-full flex items-end">
            <Button
              aria-label="submit"
              type="submit"
              variant="gray"
              className="w-full h-12"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

// Level 2 Form
const level2Schema = z.object({
  documentType: z.string().min(1, "Document type is required"),
  frontSide: z.instanceof(File, { message: "Front side upload is required" }),
  backSide: z.instanceof(File, { message: "Back side upload is required" }),
});

type Level2Data = z.infer<typeof level2Schema>;

function Level2Form({ onSubmitSuccess }: LevelFormProps) {
  const form = useForm<Level2Data>({
    resolver: zodResolver(level2Schema) as unknown as Resolver<Level2Data>,
    defaultValues: {
      documentType: "",
      frontSide: undefined,
      backSide: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: Level2Data) => {
    // Simulate API call (e.g., multipart form)
    try {
      console.log("Level 2 data:", data);
      onSubmitSuccess();
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-foreground/55 flex flex-col gap-1.5">
          <div className="span text-semibold text-foreground">
            Confirm Your Details
          </div>
          Upload Identification. This step will unlock more capabilities such as
          higher betting limits and enhanced account security.
        </p>
        <FormField
          control={form.control}
          name="documentType"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-sm">Document Type*</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="documentType"
                    className="w-full h-12 !bg-background-2 border rounded-lg"
                  >
                    <SelectValue className="!pl-12" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Driver License" className="!pl-12">
                      Driver License
                    </SelectItem>
                    <SelectItem value="ID Card" className="!pl-12">
                      ID Card
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-xs text-destructive" />
            </FormItem>
          )}
        />
        <FormDescription className="text-xs text-foreground/55">
          Following file types are accepted: .png, .jpg, .pdf
        </FormDescription>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="frontSide"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Front Side</FormLabel>
                <FormControl>
                  <GlobalFileUpload
                    id="frontSide"
                    onChange={(file) => field.onChange(file)}
                    value={field.value || null}
                  />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="backSide"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Back Side*</FormLabel>
                <FormControl>
                  <GlobalFileUpload
                    id="backSide"
                    onChange={(file) => field.onChange(file)}
                    value={field.value || null}
                  />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <Button
          aria-label="submit"
          type="submit"
          variant="gray"
          className="w-full h-10"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

// Level 3 Form
const level3Schema = z.object({
  proofOfAddress: z.instanceof(File, {
    message: "Proof of address is required",
  }),
});

type Level3Data = z.infer<typeof level3Schema>;

function Level3Form({ onSubmitSuccess }: LevelFormProps) {
  const form = useForm<Level3Data>({
    resolver: zodResolver(level3Schema) as unknown as Resolver<Level3Data>,
    defaultValues: {
      proofOfAddress: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: Level3Data) => {
    try {
      console.log("Level 3 data:", data);
      onSubmitSuccess();
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-foreground/55 flex flex-col gap-1.5">
          <div className="span text-semibold text-foreground">
            Confirm Your Details
          </div>
          Verification. Please upload your proof of address. All documents must
          be laying on a flat surface with all 4 corners inside the frame. All
          information should be clear and identifiable.
        </p>
        <FormField
          control={form.control}
          name="proofOfAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Proof of Address*</FormLabel>
              <FormControl>
                <GlobalFileUpload
                  id="proofOfAddress"
                  onChange={(file) => field.onChange(file)}
                  value={field.value || null}
                />
              </FormControl>
              <FormDescription className="text-xs text-foreground/55">
                Following file types are accepted: .png, .jpg, .pdf
              </FormDescription>
              <FormMessage className="text-xs text-destructive" />
            </FormItem>
          )}
        />
        <Button
          aria-label="submit"
          type="submit"
          variant="gray"
          className="w-full h-10"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

// Level 4 Form
const level4Schema = z.object({
  sourceOfFunds: z.instanceof(File, { message: "Source of funds is required" }),
});

type Level4Data = z.infer<typeof level4Schema>;

function Level4Form({ onSubmitSuccess }: LevelFormProps) {
  const form = useForm<Level4Data>({
    resolver: zodResolver(level4Schema) as unknown as Resolver<Level4Data>,
    defaultValues: {
      sourceOfFunds: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: Level4Data) => {
    try {
      console.log("Level 4 data:", data);
      onSubmitSuccess();
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-foreground/55 flex flex-col gap-1.5">
          <div className="span text-semibold text-foreground">
            Confirm Your Details
          </div>
          Verification. Please upload supporting documentation for your Source
          of Funds. Document laying on a flat surface must show all 4 corners
          and all information should be clear and identifiable.
        </p>
        <FormField
          control={form.control}
          name="sourceOfFunds"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Source of Funds*</FormLabel>
              <FormControl>
                <GlobalFileUpload
                  id="sourceOfFunds"
                  onChange={(file) => field.onChange(file)}
                  value={field.value || null}
                />
              </FormControl>
              <FormDescription className="text-xs text-foreground/55">
                Following file types are accepted: .png, .jpg, .pdf
              </FormDescription>
              <FormMessage className="text-xs text-destructive" />
            </FormItem>
          )}
        />
        <Button
          aria-label="submit"
          type="submit"
          variant="gray"
          className="w-full h-10"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
