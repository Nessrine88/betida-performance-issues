"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/app/[locale]/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/[locale]/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/[locale]/components/ui/form";
import { useEffect } from "react";
import GameIconSvg from "@/app/[locale]/components/common/svg_icons/sidebar-icons/game-icon-svg";
import CImage from "@/lib/CIdImage";

const formSchema = z.object({
  game: z.string().min(1, "Please select a game"),
  clientSeed: z.string().min(1, "Client seed is required"),
  serverSeed: z.string().min(1, "Server seed is required"),
  nonce: z.number().min(0, "Nonce must be 0 or greater"),
});

type FormData = z.infer<typeof formSchema>;

export default function ProvablyFairCalculation() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      game: "",
      clientSeed: "",
      serverSeed: "",
      nonce: 0,
    },
    mode: "onChange",
  });

  const watchedFields = form.watch();

  useEffect(() => {
  }, [watchedFields]);

  return (
    <div className="bg-background-1 rounded-lg p-6 max-w-242 w-full mx-auto h-auto flex flex-col gap-6">
      <Form {...form}>
        <form className="space-y-4">
          {/* Game Select */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Game</label>
            <FormField
              control={form.control}
              name="game"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="game"
                        className="w-full relative !bg-background !h-10"
                      >
                        <SelectValue className="!pl-12" />
                        {field.value === "" && (
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <GameIconSvg />
                          </div>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dice">Dice</SelectItem>
                        <SelectItem value="dragon-tower">
                          Dragon Tower
                        </SelectItem>
                        <SelectItem value="flip">Flip</SelectItem>
                        <SelectItem value="hilo">Hilo</SelectItem>
                        <SelectItem value="keno">Keno</SelectItem>
                        <SelectItem value="limbo">Limbo</SelectItem>
                        <SelectItem value="mines">Mines</SelectItem>
                        <SelectItem value="packs">Packs</SelectItem>
                        <SelectItem value="plinko">Plinko</SelectItem>
                        <SelectItem value="prime-dice">Prime Dice</SelectItem>
                        <SelectItem value="pump">Pump</SelectItem>
                        <SelectItem value="rock-paper-scissors">
                          Rock Paper Scissors
                        </SelectItem>
                        <SelectItem value="roulette">Roulette</SelectItem>
                        <SelectItem value="slide">Slide</SelectItem>
                        <SelectItem value="scarab-spin">Scarab Spin</SelectItem>
                        <SelectItem value="blue-samurai">
                          Blue Samurai
                        </SelectItem>
                        <SelectItem value="tome-of-life">
                          Tome of Life
                        </SelectItem>
                        <SelectItem value="snakes">Snakes</SelectItem>
                        <SelectItem value="video-poker">Video Poker</SelectItem>
                        <SelectItem value="wheel">Wheel</SelectItem>
                        <SelectItem value="baccarat">Baccarat</SelectItem>
                        <SelectItem value="bars">Bars</SelectItem>
                        <SelectItem value="blackjack">Blackjack</SelectItem>
                        <SelectItem value="cases">Cases</SelectItem>
                        <SelectItem value="chicken">Chicken</SelectItem>
                        <SelectItem value="crash">Crash</SelectItem>
                        <SelectItem value="darts">Darts</SelectItem>
                        <SelectItem value="diamonds">Diamonds</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Client Seed Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Client Seed
            </label>
            <FormField
              control={form.control}
              name="clientSeed"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter client seed"
                      className="!bg-background h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Server Seed Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Server Seed
            </label>
            <FormField
              control={form.control}
              name="serverSeed"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter server seed"
                      className="!bg-background h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Nonce Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Nonce</label>
            <FormField
              control={form.control}
              name="nonce"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      placeholder="0"
                      className="!bg-background h-10"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <CImage
            publicId="fair-calculation"
            alt="fair-calculation"
            className="rounded-lg object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
            fetchPriority="high"
          />
        </form>
      </Form>
    </div>
  );
}
