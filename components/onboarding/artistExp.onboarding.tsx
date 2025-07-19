import { motion } from "framer-motion";
import { useState } from "react";
import { sdk } from "@/utils/graphqlClient";
import useGlobalStore from "@/store/global";
import useOnboardingStore from "@/store/onboarding";
import { extractErrorMessage } from "@/utils/functions/common";
import CButton from "../common/buttons/button";
import { ButtonType } from "../common/buttons/interface";
import { useRouter } from "next/router";
import { ExperienceLevel, Currency } from "@/generated/graphql";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const experienceOptions = [
  { value: ExperienceLevel.Beginner, label: "Beginner" },
  { value: ExperienceLevel.Semiprofessional, label: "Semi-Professional" },
  { value: ExperienceLevel.Intermediate, label: "Intermediate" },
  { value: ExperienceLevel.Professional, label: "Professional" },
  { value: ExperienceLevel.Expert, label: "Expert" },
  { value: ExperienceLevel.Veteran, label: "Veteran" },
];

const currencyOptions = [
  { value: Currency.Usd, label: "USD", symbol: "$" },
  { value: Currency.Eur, label: "EUR", symbol: "€" },
  { value: Currency.Gbp, label: "GBP", symbol: "£" },
  { value: Currency.Inr, label: "INR", symbol: "₹" },
  { value: Currency.Cad, label: "CAD", symbol: "CA$" },
  { value: Currency.Aud, label: "AUD", symbol: "AU$" },
  { value: Currency.Jpy, label: "JPY", symbol: "¥" },
  { value: Currency.Cny, label: "CNY", symbol: "¥" },
  { value: Currency.Mxn, label: "MXN", symbol: "$" },
  { value: Currency.Brl, label: "BRL", symbol: "R$" },
  { value: Currency.Chf, label: "CHF", symbol: "CHF" },
  { value: Currency.Ngn, label: "NGN", symbol: "₦" },
  { value: Currency.Zar, label: "ZAR", symbol: "R" },
];

const priceRanges = [
  { level: ExperienceLevel.Beginner, range: "$20 - $50/hour" },
  { level: ExperienceLevel.Semiprofessional, range: "$50 - $100/hour" },
  { level: ExperienceLevel.Intermediate, range: "$100 - $200/hour" },
  { level: ExperienceLevel.Professional, range: "$200 - $500/hour" },
  { level: ExperienceLevel.Expert, range: "$500+/hour" },
  { level: ExperienceLevel.Veteran, range: "$500+/hour" },
];

const ArtistExperience = () => {
  const { setToastData } = useGlobalStore();
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const {
    experience,
    setExperience,
    hourRate,
    setHourRate,
    hourRateCurrency,
    setHourRateCurrency,
  } = useOnboardingStore();

  const [rateError, setRateError] = useState<string | null>(null);

  const validateRate = (rate: number) => {
    if (!rate || rate <= 0) return "Please enter a positive hourly rate";
    return null;
  };

  const handleRateChange = (val: string) => {
    const v = parseFloat(val);
    if (v < 0) {
      setRateError("Please enter a positive hourly rate");
      setHourRate(0);
    } else {
      setRateError(null);
      setHourRate(v);
    }
  };

  const handleSubmit = async () => {
    if (!experience) {
      setToastData({
        message: "Please select your experience level",
        type: "error",
      });
      return;
    }

    if (!hourRate || hourRate <= 0) {
      setToastData({
        message: "Please enter a valid hourly rate",
        type: "error",
      });
      setRateError("Please enter a valid hourly rate");
      return;
    }

    if (!hourRateCurrency) {
      setToastData({
        message: "Please select a currency",
        type: "error",
      });
      return;
    }

    try {
      setBtnLoading(true);

      // Save experience data
      await sdk.artistOnboarding({
        input: {
          experience: experience as ExperienceLevel,
          hourRate,
          hourRateCurrency: hourRateCurrency as Currency,
        },
      });

      // Complete onboarding
      const completeResponse = await sdk.completeArtistOnboarding();

      if (completeResponse.completeArtistOnboarding) {
        setToastData({
          message: "Onboarding completed successfully!",
          type: "success",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setBtnLoading(false);
    }
  };

  // Find current priceGuidance
  const guidance = priceRanges.find((p) => p.level === experience)?.range ?? "";

  return (
    <motion.div
      className="w-full mb-auto min-h-full sm:px-4 max-w-3xl flex flex-col justify-between bg-transparent items-center text-center relative py-6"
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { staggerChildren: 0.2 },
        },
      }}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{ duration: 0.3, type: "spring" }}
    >
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl text-primary font-bold leading-tight mb-2">
          Your Experience & Rates
        </h1>
        <p className="max-w-xl mx-auto text-white/60 mb-5 text-sm">
          Show hosts and agencies your skill level and set your standard hourly
          rate for gigs.
        </p>
      </div>

      <div className="w-full rounded-xl shadow-sm p-6 bg-surface">
        <div className="space-y-7 p-4">
          {/* Experience Level */}
          <div>
            <label className="block mb-3 text-sm font-medium text-left text-white">
              Experience Level *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {experienceOptions.map((exp) => (
                <button
                  type="button"
                  key={exp.value}
                  className={`rounded-xl font-semibold text-center transition-colors p-3 text-sm sm:text-base flex items-center justify-center outline-none
                    ${
                      experience === exp.value
                        ? "bg-primary/90 text-black border-2 border-primary scale-105"
                        : "bg-background border border-gray-600 text-white hover:border-primary"
                    }
                  `}
                  onClick={() => setExperience(exp.value)}
                >
                  {exp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hourly Rate & Currency */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-left text-white">
                Hourly Rate *
              </label>
              <input
                type="number"
                value={hourRate ?? ""}
                onChange={(e) => handleRateChange(e.target.value)}
                onWheel={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if (["e", "-", "+"].includes(e.key)) e.preventDefault();
                }}
                className={`input input-primary w-full bg-background text-white ${
                  rateError ? "border-red-500" : ""
                }`}
                placeholder="0.00"
                min={0}
                step="0.01"
              />
              {rateError && (
                <p className="text-red-400 text-xs mt-1 text-left">
                  {rateError}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-left text-white">
                Currency *
              </label>
              {/* <select
                value={hourRateCurrency ?? ""}
                onChange={(e) =>
                  setHourRateCurrency(e.target.value as Currency)
                }
                className="select select-primary w-full bg-background text-white text-base rounded-lg"
              >
                <option value="">Select Currency</option>
                {currencyOptions.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label} ({currency.symbol})
                  </option>
                ))}
              </select> */}
              <Controller
                name="hourRateCurrency"
                control={control}
                rules={{ required: "Currency is required" }}
                render={({ field }) => (
                  <Select
                    classNames={{
                      control: (state) =>
                        `${
                          state.isDisabled
                            ? "!opacity-40 !cursor-not-allowed !bg-surface !font-normal !text-white"
                            : "!bg-surface !text-white"
                        }`,
                      option: (state) =>
                        `!text-sm !bg-surface hover:!bg-primary hover:!text-black focus:!bg-transparent text-left ${
                          state.isSelected ? "!bg-primary !text-white" : ""
                        } `,
                      placeholder: () => `text-sm text-left font-normal`,
                      singleValue: () => `text-sm text-left font-noraml`,
                    }}
                    id="hourRateCurrency"
                    options={currencyOptions.map((el) => ({
                      value: el.value,
                      label: `${el.label} (${el.symbol})`,
                    }))}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    menuPortalTarget={
                      typeof window !== "undefined" ? document.body : null
                    }
                    menuShouldScrollIntoView={false}
                    placeholder="Select Currency"
                    value={
                      currencyOptions
                        .map((el) => ({
                          value: el.value,
                          label: `${el.label} (${el.symbol})`,
                        }))
                        .find((opt) => opt.value === hourRateCurrency) || null
                    }
                    onChange={(option) => {
                      field.onChange(option?.value);
                      setHourRateCurrency(option?.value as Currency);
                    }}
                    // react-select needs this for "controlled" mode:
                    isClearable
                  />
                )}
              />
            </div>
          </div>

          {/* Dynamic Pricing Guidance */}
          <div className="rounded-lg p-4 bg-gray-800/70 text-left">
            <h3 className="text-primary font-semibold mb-2">
              {experience && guidance ? "Suggested Range" : "Pricing Guidance"}
            </h3>
            {experience && guidance ? (
              <p className="text-white text-base font-medium">
                For{" "}
                <span className="text-primary">
                  {
                    experienceOptions.find((opt) => opt.value === experience)
                      ?.label
                  }
                </span>{" "}
                artists, a typical rate is:{" "}
                <span className="font-semibold">{guidance}</span>
              </p>
            ) : (
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Beginners: $20-$50/hour</li>
                <li>• Semi-Professional: $50-$100/hour</li>
                <li>• Intermediate: $100-$200/hour</li>
                <li>• Professional: $200-$500/hour</li>
                <li>• Experts/Veterans: $500+/hour</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between space-x-6">
        <CButton
          loading={btnLoading}
          variant={ButtonType.Secondary}
          onClick={() => router.push("/onboarding/artist/location")}
          className="w-full"
        >
          Back
        </CButton>
        <CButton
          loading={btnLoading}
          variant={ButtonType.Primary}
          onClick={handleSubmit}
          disabled={
            !experience || !hourRate || !hourRateCurrency || !!rateError
          }
          className="w-full"
        >
          Complete Onboarding
        </CButton>
      </div>
    </motion.div>
  );
};

export default ArtistExperience;
