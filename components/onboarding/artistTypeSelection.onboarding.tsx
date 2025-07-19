import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { sdk } from "@/utils/graphqlClient";
import useGlobalStore from "@/store/global";
import useOnboardingStore from "@/store/onboarding";
import { useRouter } from "next/router";
import { extractErrorMessage } from "@/utils/functions/common";
import CButton from "../common/buttons/button";
import { ButtonType } from "../common/buttons/interface";
import { ArtistType } from "@/generated/graphql";
import { artistTypes } from "@/utils/enums/artistType.enum";
// import artistTypes from above

const MAX_TYPES = 3;
const MIN_TYPES = 1;

const ArtistTypeSelection = () => {
  const { setToastData } = useGlobalStore();
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);

  const { artistType, setArtistType } = useOnboardingStore();
  // Start with the list (or empty)
  const [selectedTypes, setSelectedTypes] = useState<ArtistType[]>(
    Array.isArray(artistType) ? artistType : artistType ? [artistType] : []
  );

  // Sync store with local state
  useEffect(() => {
    setArtistType(selectedTypes);
  }, [selectedTypes, setArtistType]);

  // Toggle logic with limit
  const toggleType = (type: ArtistType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes((prev) => prev.filter((t) => t !== type));
      return;
    }
    if (selectedTypes.length >= MAX_TYPES) {
      setToastData({
        message: `You can select up to ${MAX_TYPES} artist types.`,
        type: "warning",
      });
      return;
    }
    setSelectedTypes((prev) => [...prev, type]);
  };

  const handleSubmit = async () => {
    if (selectedTypes.length < MIN_TYPES) {
      setToastData({
        message: `Please select at least ${MIN_TYPES} artist type${
          MIN_TYPES > 1 ? "s" : ""
        }`,
        type: "error",
      });
      return;
    }
    try {
      setBtnLoading(true);
      await sdk.artistOnboarding({
        input: { artistType: selectedTypes },
      });
      router.push("/onboarding/artist/profile-setup");
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

  // You can tweak height as you wish (320-400px fits most use cases).
  return (
    <motion.div
      className="w-full mb-auto min-h-full sm:px-4 max-w-3xl flex flex-col justify-between bg-transparent items-center text-center relative py-6"
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
      }}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{ duration: 0.3, type: "spring" }}
    >
      {/* ========== Modern Heading ========== */}
      <div className="w-full">
        <h1 className="text-2xl sm:text-3xl text-primary font-bold leading-tight mb-2">
          What Type of Artist Are You?
        </h1>
        <p className="max-w-xl mx-auto text-white/60 mb-5 text-sm">
          Pick all roles you perform in. This helps HOIZR match you to the
          perfect gigs and clubs.
        </p>
      </div>
      <div className="w-full rounded-xl shadow-sm p-4 bg-surface flex flex-col gap-2">
        {/* Card Grid, scrollable */}
        <div
          className="overflow-y-auto custom-scrollbar px-2"
          style={{ maxHeight: 400, minHeight: 210 }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 pb-2">
            {artistTypes.map((typeInfo) => {
              const IconComponent = typeInfo.icon;
              const isSelected = selectedTypes.includes(typeInfo.type);
              const limitReached =
                selectedTypes.length >= MAX_TYPES && !isSelected;
              return (
                <button
                  key={typeInfo.type}
                  type="button"
                  disabled={limitReached}
                  className={`
                  relative group cursor-pointer transition-all duration-300 transform hover:scale-105 
                  ${limitReached ? "opacity-40 pointer-events-none" : ""}
                `}
                  onClick={() => toggleType(typeInfo.type)}
                >
                  {/* Glass effect overlay */}
                  <div
                    className={`absolute inset-0  ${
                      isSelected ? "bg-primary/40" : "bg-primary/5"
                    } backdrop-blur-sm rounded-2xl`}
                  />

                  {/* Content */}
                  <div className="relative p-4 flex flex-col items-center justify-center ">
                    <div
                      className={`
                      p-3 rounded-full bg-primary/10 backdrop-blur-sm mb-3 
                      transition-all duration-300 group-hover:bg-primary/30
                      ${isSelected ? "bg-primary/90 scale-110" : ""}
                    `}
                    >
                      <IconComponent
                        className={`w-6 h-6 text-white transition-transform duration-300 ${
                          isSelected ? "scale-110" : ""
                        }`}
                      />
                    </div>
                    <h3 className="text-white font-semibold text-sm text-center leading-tight">
                      {typeInfo.label}
                    </h3>
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-pulse" />
                    )}
                  </div>
                  {/* Hover glow effect */}
                  <div
                    className={`
                    absolute inset-0 bg-gradient-to-br from-primary/60 to-primary/80 rounded-2xl opacity-0 
                    group-hover:opacity-20 transition-opacity duration-300 blur-xl
                  `}
                  />
                </button>
              );
            })}
          </div>
        </div>
        {/* Fake scrollbar style */}
        <style>
          {`
            .custom-scrollbar::-webkit-scrollbar { width: 8px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
            .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #333 #23272a; }
          `}
        </style>
        {/* Selected tags */}
        {selectedTypes.length > 0 && (
          <div className="mt-3 text-left">
            <div className="font-semibold text-white mb-1 text-xs">
              Selected Artist Types ({selectedTypes.length}/{MAX_TYPES})
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map((type) => {
                const info = artistTypes.find((t) => t.type === type);
                return (
                  <span
                    key={type}
                    className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs"
                  >
                    {info?.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-between space-x-6">
        <CButton
          loading={btnLoading}
          variant={ButtonType.Secondary}
          onClick={router.back}
          className="w-full"
        >
          Back
        </CButton>
        <CButton
          loading={btnLoading}
          variant={ButtonType.Primary}
          onClick={handleSubmit}
          className="w-full"
        >
          Continue
        </CButton>
      </div>
    </motion.div>
  );
};

export default ArtistTypeSelection;
