"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, type UseFormReturn, type Resolver } from "react-hook-form";
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

// Types
interface LevelFormProps {
  onSubmitSuccess: () => void;
}

// Schemas
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

const level2Schema = z.object({
  documentType: z.string().min(1, "Document type is required"),
  frontSide: z.instanceof(File, { message: "Front side upload is required" }),
  backSide: z.instanceof(File, { message: "Back side upload is required" }),
});

const level3Schema = z.object({
  proofOfAddress: z.instanceof(File, { message: "Proof of address is required" }),
});

const level4Schema = z.object({
  sourceOfFunds: z.instanceof(File, { message: "Source of funds is required" }),
});

type Level1Data = z.infer<typeof level1Schema>;
type Level2Data = z.infer<typeof level2Schema>;
type Level3Data = z.infer<typeof level3Schema>;
type Level4Data = z.infer<typeof level4Schema>;

// Shared Components
const SubmittedBadge = () => (
  <span className="bg-green-1 text-background px-2 py-1 text-xs font-medium rounded-full">
    Submitted
  </span>
);

const InfoAlert = ({ message }: { message: string }) => (
  <p className="text-foreground text-sm flex flex-row items-center gap-2 border rounded-lg p-3">
    <div className="bg-chart-3/30 text-chart-3 rounded-full h-5 w-5 flex items-center justify-center">
      i
    </div>
    {message}
  </p>
);

const FormHeader = ({ title, description }: { title: string; description: string }) => (
  <p className="text-sm text-foreground/55 flex flex-col gap-1.5">
    <div className="span text-semibold text-foreground">{title}</div>
    {description}
  </p>
);

// Reusable form field components
const TextInput = ({ form, name, label }: { form: UseFormReturn<any>; name: string; label: string }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm">{label}</FormLabel>
        <FormControl>
          <Input {...field} className="h-12 bg-background-1" />
        </FormControl>
        <FormMessage className="text-xs text-destructive" />
      </FormItem>
    )}
  />
);

const SelectInput = ({ 
  form, 
  name, 
  label, 
  options 
}: { 
  form: UseFormReturn<any>; 
  name: string; 
  label: string; 
  options: { value: string; label: string }[] 
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel className="text-sm">{label}</FormLabel>
        <FormControl>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full h-12 bg-background-1 border rounded-lg">
              <SelectValue className="!pl-12" />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="!pl-12">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage className="text-xs text-destructive" />
      </FormItem>
    )}
  />
);

const FileInput = ({ 
  form, 
  name, 
  label, 
  showDescription = true 
}: { 
  form: UseFormReturn<any>; 
  name: string; 
  label: string; 
  showDescription?: boolean 
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-sm">{label}</FormLabel>
        <FormControl>
          <GlobalFileUpload
            id={name}
            onChange={(file) => field.onChange(file)}
            value={field.value || null}
          />
        </FormControl>
        {showDescription && (
          <FormDescription className="text-xs text-foreground/55">
            Following file types are accepted: .png, .jpg, .pdf
          </FormDescription>
        )}
        <FormMessage className="text-xs text-destructive" />
      </FormItem>
    )}
  />
);

// Level Forms
function Level1Form({ onSubmitSuccess }: LevelFormProps) {
  const form = useForm<Level1Data>({
    resolver: zodResolver(level1Schema) as unknown as Resolver<Level1Data>,
    defaultValues: {
      firstName: "", lastName: "", country: "", placeOfBirth: "", dob: "",
      residentialAddress: "", city: "", postalCode: "", occupationIndustry: "",
      occupation: "", occupationExperience: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: Level1Data) => {
    try {
      console.log("Level 1 data:", data);
      onSubmitSuccess();
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormHeader 
          title="Confirm Your Details"
          description="Please fill in your details & confirm your identity to unlock additional services. All information is private & secure."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <TextInput form={form} name="firstName" label="First Name (including middle name, if applicable)*" />
          <TextInput form={form} name="lastName" label="Last Name*" />
          <SelectInput form={form} name="country" label="Country*" options={[{ value: "Turkey", label: "Turkey" }]} />
          <SelectInput form={form} name="placeOfBirth" label="Place of Birth*" options={[{ value: "Turkey", label: "Turkey" }]} />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Date of Birth*</FormLabel>
                <FormControl>
                  <DatePicker name={field.name} control={form.control} className="w-full h-12 border rounded-lg" placeholder="Select date" />
                </FormControl>
                <FormMessage className="text-xs text-destructive" />
              </FormItem>
            )}
          />
          <TextInput form={form} name="residentialAddress" label="Residential Address*" />
          <TextInput form={form} name="city" label="City*" />
          <TextInput form={form} name="postalCode" label="Postal Code*" />
          <SelectInput 
            form={form} 
            name="occupationIndustry" 
            label="Occupation Industry*" 
            options={[{ value: "Arts, Culture, Entertainment & Media", label: "Arts, Culture, Entertainment & Media" }]} 
          />
          <TextInput form={form} name="occupation" label="Occupation*" />
          <SelectInput form={form} name="occupationExperience" label="Occupation Experience*" options={[{ value: "Junior", label: "Junior" }]} />
          <div className="h-full flex items-end">
            <Button type="submit" variant="gray" className="w-full h-12">Submit</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

function Level2Form({ onSubmitSuccess }: LevelFormProps) {
  const form = useForm<Level2Data>({
    resolver: zodResolver(level2Schema) as unknown as Resolver<Level2Data>,
    defaultValues: { documentType: "", frontSide: undefined, backSide: undefined },
    mode: "onChange",
  });

  const onSubmit = async (data: Level2Data) => {
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
        <FormHeader 
          title="Confirm Your Details"
          description="Upload Identification. This step will unlock more capabilities such as higher betting limits and enhanced account security."
        />
        <SelectInput 
          form={form} 
          name="documentType" 
          label="Document Type*" 
          options={[
            { value: "Driver License", label: "Driver License" },
            { value: "ID Card", label: "ID Card" }
          ]} 
        />
        <FormDescription className="text-xs text-foreground/55">
          Following file types are accepted: .png, .jpg, .pdf
        </FormDescription>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileInput form={form} name="frontSide" label="Front Side*" showDescription={false} />
          <FileInput form={form} name="backSide" label="Back Side*" showDescription={false} />
        </div>
        <Button type="submit" variant="gray" className="w-full h-10">Submit</Button>
      </form>
    </Form>
  );
}

function Level3Form({ onSubmitSuccess }: LevelFormProps) {
  const form = useForm<Level3Data>({
    resolver: zodResolver(level3Schema) as unknown as Resolver<Level3Data>,
    defaultValues: { proofOfAddress: undefined },
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
        <FormHeader 
          title="Confirm Your Details"
          description="Please upload your proof of address. All documents must be laying on a flat surface with all 4 corners inside the frame. All information should be clear and identifiable."
        />
        <FileInput form={form} name="proofOfAddress" label="Proof of Address*" />
        <Button type="submit" variant="gray" className="w-full h-10">Submit</Button>
      </form>
    </Form>
  );
}

function Level4Form({ onSubmitSuccess }: LevelFormProps) {
  const form = useForm<Level4Data>({
    resolver: zodResolver(level4Schema) as unknown as Resolver<Level4Data>,
    defaultValues: { sourceOfFunds: undefined },
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
        <FormHeader 
          title="Confirm Your Details"
          description="Please upload supporting documentation for your Source of Funds. Document laying on a flat surface must show all 4 corners and all information should be clear and identifiable."
        />
        <FileInput form={form} name="sourceOfFunds" label="Source of Funds*" />
        <Button type="submit" variant="gray" className="w-full h-10">Submit</Button>
      </form>
    </Form>
  );
}

// Level configuration
const LEVELS = [
  { id: 1, title: "Level 1", Component: Level1Form, prerequisite: null },
  { id: 2, title: "Level 2", Component: Level2Form, prerequisite: 1 },
  { id: 3, title: "Level 3", Component: Level3Form, prerequisite: 2 },
  { id: 4, title: "Level 4", Component: Level4Form, prerequisite: 3 },
];

// Main Component
export default function VerificationPage() {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());

  const markLevelCompleted = (level: number) => {
    setCompletedLevels((prev) => new Set([...prev, level]));
    toast.success(`Level ${level} submitted successfully!`);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {LEVELS.map(({ id, title, Component, prerequisite }) => {
        const isCompleted = completedLevels.has(id);
        const prerequisiteCompleted = prerequisite ? completedLevels.has(prerequisite) : true;
        const shouldOpen = prerequisiteCompleted && !isCompleted;

        return (
          <OutlineCard
            key={id}
            title={
              <div className="flex items-center gap-2">
                {title}
                {isCompleted && <SubmittedBadge />}
              </div>
            }
            collapsable
            defaultOpen={shouldOpen}
          >
            <div className="flex flex-col gap-6">
              {!prerequisiteCompleted && (
                <InfoAlert message={`Please complete level ${prerequisite} verification first.`} />
              )}
              <Component onSubmitSuccess={() => markLevelCompleted(id)} />
            </div>
          </OutlineCard>
        );
      })}
    </div>
  );
}