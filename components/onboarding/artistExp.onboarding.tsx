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

const ArtistExperience = () => {
  const { setToastData } = useGlobalStore();
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);

  // Get experience data from store
  const {
    experience,
    setExperience,
    hourRate,
    setHourRate,
    hourRateCurrency,
    setHourRateCurrency,
  } = useOnboardingStore();

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

  return (
    <motion.div
      className="w-full mb-auto min-h-full sm:px-12 max-w-3xl flex flex-col justify-between bg-transparent items-center space-y-6 text-center relative"
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
      <h1 className="text-3xl text-primary sm:text-4xl font-bold leading-tight mb-6">
        Your Experience & Rates
      </h1>

      <div className="w-full rounded-xl shadow-sm p-6 bg-surface">
        <div className="space-y-6 p-4">
          {/* Experience Level */}
          <div>
            <label className="block mb-2 text-sm font-medium text-left text-gray-300">
              Experience Level *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {experienceOptions.map((exp) => (
                <div
                  key={exp.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    experience === exp.value
                      ? "border-primary ring-2 ring-primary/50 bg-primary/10"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                  onClick={() => setExperience(exp.value)}
                >
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-medium">{exp.label}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-left text-gray-300">
                Hourly Rate *
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={hourRate || ""}
                  onChange={(e) => setHourRate(parseFloat(e.target.value))}
                  className="input input-primary w-full pl-8"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                <span className="absolute left-3 top-3 text-gray-400">$</span>
              </div>
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-left text-gray-300">
                Currency *
              </label>
              <div className="relative">
                <select
                  value={hourRateCurrency}
                  onChange={(e) =>
                    setHourRateCurrency(e.target.value as Currency)
                  }
                  className="select select-primary w-full"
                >
                  <option value="">Select Currency</option>
                  {currencyOptions.map((currency) => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label} ({currency.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 text-left">
            <h3 className="text-primary font-semibold mb-2">
              Pricing Guidance
            </h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Beginners: $20-$50/hour</li>
              <li>• Semi-Professional: $50-$100/hour</li>
              <li>• Intermediate: $100-$200/hour</li>
              <li>• Professional: $200-$500/hour</li>
              <li>• Experts/Veterans: $500+/hour</li>
            </ul>
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
          disabled={!experience || !hourRate || !hourRateCurrency}
          className="w-full"
        >
          Complete Onboarding
        </CButton>
      </div>
    </motion.div>
  );
};

export default ArtistExperience;
