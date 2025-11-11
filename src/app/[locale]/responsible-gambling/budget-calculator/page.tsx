"use client";

import { useState } from "react";
import { Input } from "@/app/[locale]/components/ui/input";
import Image from "next/image";
import CalculatorSVG from "@/app/[locale]/components/common/svg_icons/calculator-svg";
import { useTranslations } from "next-intl";

export default function MonthlyBudgetCalculator() {
  const t = useTranslations("monthlyBudgetCalculator");
  const [wages, setWages] = useState(0);
  const [pensions, setPensions] = useState(0);
  const [benefits, setBenefits] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);

  const [rentMortgage, setRentMortgage] = useState(0);
  const [utilityBills, setUtilityBills] = useState(0);
  const [loansCredit, setLoansCredit] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);

  const totalIncome = wages + pensions + benefits + otherIncome;
  const totalExpenses =
    rentMortgage + utilityBills + loansCredit + otherExpenses;
  const disposableIncome = totalIncome - totalExpenses;

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  const formatInput = (value: number) => {
    return value.toFixed(8);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setter(isNaN(value) ? 0 : value);
    };

  return (
    <div className="w-full bg-background-1 p-6 rounded-lg flex flex-col gap-6">
      <div className="rounded-lg w-full h-35 md:h-62.5 bg-background-3 flex items-center justify-center aspect-92/25">
        <CalculatorSVG className="h-20 md:h-30 w-20 md:w-30" />
      </div>

      <div className="bg-background rounded-lg p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-base font-semibold text-foreground">
            {t("title")}
          </div>
          <div className="text-sm text-foreground/55 font-normal">
            {t("confidential")}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="text-sm font-medium text-foreground">
                {t("incomeSection")}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">{t("wagesLabel")}</span>
                  <span className="text-foreground/55">
                    {formatCurrency(wages)}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={formatInput(wages)}
                    onChange={handleInputChange(setWages)}
                    className="w-full h-12 border-none bg-background-1 text-foreground placeholder:text-foreground/50 pr-10"
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src="/icons/usd-svg.svg"
                    alt="bitcoin"
                    height={20}
                    width={20}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">
                    {t("pensionsLabel")}
                  </span>
                  <span className="text-foreground/55">
                    {formatCurrency(pensions)}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={formatInput(pensions)}
                    onChange={handleInputChange(setPensions)}
                    className="w-full h-12 border-none bg-background-1 text-foreground placeholder:text-foreground/50 pr-10"
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src="/icons/usd-svg.svg"
                    alt="bitcoin"
                    height={20}
                    width={20}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">
                    {t("benefitsLabel")}
                  </span>
                  <span className="text-foreground/55">
                    {formatCurrency(benefits)}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={formatInput(benefits)}
                    onChange={handleInputChange(setBenefits)}
                    className="w-full h-12 border-none bg-background-1 text-foreground placeholder:text-foreground/50 pr-10"
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src="/icons/usd-svg.svg"
                    alt="bitcoin"
                    height={20}
                    width={20}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">
                    {t("otherIncomeLabel")}
                  </span>
                  <span className="text-foreground/55">
                    {formatCurrency(otherIncome)}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={formatInput(otherIncome)}
                    onChange={handleInputChange(setOtherIncome)}
                    className="w-full h-12 border-none bg-background-1 text-foreground placeholder:text-foreground/50 pr-10"
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src="/icons/usd-svg.svg"
                    alt="bitcoin"
                    height={20}
                    width={20}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">
                    {t("totalIncomeLabel")}
                  </span>
                  <span className="text-foreground/55">
                    {formatCurrency(totalIncome)}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    value={formatInput(totalIncome)}
                    readOnly
                    className="w-full h-12 border-none bg-background-1 text-foreground/50 pr-10 cursor-not-allowed"
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src="/icons/usd-svg.svg"
                    alt="bitcoin"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="text-sm font-medium text-foreground">
                {t("expensesSection")}
              </div>{" "}
              {/* Offset for title alignment on desktop */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">
                    {t("rentMortgageLabel")}
                  </span>
                  <span className="text-foreground/55">
                    {formatCurrency(rentMortgage)}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={formatInput(rentMortgage)}
                    onChange={handleInputChange(setRentMortgage)}
                    className="w-full h-12 border-none bg-background-1 text-foreground placeholder:text-foreground/50 pr-10"
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src="/icons/usd-svg.svg"
                    alt="bitcoin"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">
                    {t("utilityBillsLabel")}
                  </span>
                  <span className="text-foreground/55">
                    {formatCurrency(utilityBills)}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={formatInput(utilityBills)}
                    onChange={handleInputChange(setUtilityBills)}
                    className="w-full h-12 border-none bg-background-1 text-foreground placeholder:text-foreground/50 pr-10"
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src="/icons/usd-svg.svg"
                    alt="bitcoin"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">
                    {t("loansCreditLabel")}
                  </span>
                  <span className="text-foreground/55">
                    {formatCurrency(loansCredit)}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={formatInput(loansCredit)}
                    onChange={handleInputChange(setLoansCredit)}
                    className="w-full h-12 border-none bg-background-1 text-foreground placeholder:text-foreground/50 pr-10"
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src="/icons/usd-svg.svg"
                    alt="bitcoin"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">
                    {t("otherExpensesLabel")}
                  </span>
                  <span className="text-foreground/55">
                    {formatCurrency(otherExpenses)}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    value={formatInput(otherExpenses)}
                    onChange={handleInputChange(setOtherExpenses)}
                    className="w-full h-12 border-none bg-background-1 text-foreground placeholder:text-foreground/50 pr-10"
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src="/icons/usd-svg.svg"
                    alt="bitcoin"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/70">
                    {t("totalExpensesLabel")}
                  </span>
                  <span className="text-foreground/55">
                    {formatCurrency(totalExpenses)}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    value={formatInput(totalExpenses)}
                    readOnly
                    className="w-full h-12 border-none bg-background-1 text-foreground/50 pr-10 cursor-not-allowed"
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src="/icons/usd-svg.svg"
                    alt="bitcoin"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-background p-4 rounded-lg border">
          <div className="text-sm pb-1.5 font-medium text-foreground/55">
            {t("disposableIncomeTitle")}
          </div>
          <div className="text-xl font-bold text-foreground flex flex-row items-center gap-1">
            {formatCurrency(disposableIncome)}{" "}
            <Image
              src="/icons/usd-svg.svg"
              alt="bitcoin"
              height={20}
              width={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
