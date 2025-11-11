"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSidebarStore } from "@/store/sidebar-store";
import GlobalModal from "../../../global-components/global-modal/global-modal";
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
  amount: z.string().min(1, { message: "Amount is required" }),
});

interface TransferBalanceModalProps {
  balance: number;
}

export default function TransferBalanceModal({
  balance,
}: TransferBalanceModalProps) {
  const { transferBalanceModalOpen, toggleTransferBalanceModalOpen } =
    useSidebarStore();
  const pathName = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: "" },
  });

  const handleTransferBalance = async () => {
    toggleTransferBalanceModalOpen();
  };

  return (
    <GlobalModal
      title="Transfer Commission"
      open={transferBalanceModalOpen}
      onOpenChange={() => {
        toggleTransferBalanceModalOpen();
        router.push(pathName, { scroll: false });
      }}
      className="lg:min-w-96"
    >
      <div className="space-y-4 w-full">
        <div className="w-full bg-sidebar px-3 py-2 rounded-md">
          <div className="text-white/55">Estimated Available Commission</div>
          <div className="text-white font-semibold">${balance} USD</div>
        </div>

        {balance <= 0 ? (
          <div className="text-center text-red-500 border border-dashed border-red-500 p-4 rounded-md">
            You have no available balance to transfer. Please add funds to your
            account to proceed.
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleTransferBalance)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Amount *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter Amount"
                        className="w-full mt-1 !h-12"
                        min="1"
                        max={balance}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <Button
                  fillWidth
                  variant="purpleGradient"
                  type="submit"
                  className="w-full py-3"
                  aria-label="transfer balance"
                  disabled={
                    !form.formState.isValid ||
                    Number(form.watch("amount")) > balance
                  }
                >
                  Transfer Balance
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </GlobalModal>
  );
}
