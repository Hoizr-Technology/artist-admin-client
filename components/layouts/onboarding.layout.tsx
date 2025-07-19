import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import logo1 from "../../assets/logo/text.png";
import { sdk } from "@/utils/graphqlClient";
import useGlobalStore from "@/store/global";
import { extractErrorMessage } from "@/utils/functions/common";
import dynamicOnboardingAnimation from "../../assets/gif/dynamicOnboarding.json";
import Lottie from "lottie-react";
import {
  FiUser,
  FiMic,
  FiEdit3,
  FiMusic,
  FiMapPin,
  FiStar,
  FiDollarSign,
} from "react-icons/fi";
import useMasterStore from "@/store/masters";

type Props = {
  children: ReactNode;
};

const steps = [
  {
    title: "Welcome!",
    description: "Discover how HOIZR unlocks your artist journey.",
    step: "1/6",
    link: "about-us",
    icon: FiUser,
  },
  {
    title: "What Type of Artist Are You?",
    description: "Select your artist types so we can match you with gigs.",
    step: "2/6",
    link: "artist-type",
    icon: FiMic,
  },
  {
    title: "Profile Setup",
    description: "Add stage name, bio, and your best photo.",
    step: "3/6",
    link: "profile-setup",
    icon: FiEdit3,
  },
  {
    title: "Genres",
    description: "Let clubs and hosts know your music styles.",
    step: "4/6",
    link: "genres",
    icon: FiMusic,
  },
  {
    title: "Location",
    description: "Add your city and region to get relevant gigs.",
    step: "5/6",
    link: "location",
    icon: FiMapPin,
  },
  {
    title: "Experience & Rates",
    description: "Show your experience and set your rates.",
    step: "6/6",
    link: "experience-rates",
    icon: FiDollarSign,
  },
];

const ArtistOnboardingLayout = ({ children }: Props) => {
  const router = useRouter();
  const { query } = router;
  const { onboardingRoute } = query;
  const { setToastData } = useGlobalStore();
  const { setMasterStates, setMasterTimezones } = useMasterStore();

  const handleLogout = async () => {
    try {
      const response = await sdk.artistLogout();
      if (response && response.artistLogout) {
        router.replace("/login");
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    }
  };

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const resstates = await sdk.getActiveStates();
        if (resstates && resstates.getActiveStates) {
          const formattedStates = resstates.getActiveStates.map(
            (state: { value: string; _id: string }) => ({
              value: state._id,
              label: state.value,
            })
          );
          setMasterStates(formattedStates);
        }
        // const resTimeZones = await sdk.getActiveTimezones();
        // if (resTimeZones && resTimeZones.getActiveTimezones) {
        //   const formattedTimeZones = resTimeZones.getActiveTimezones.map(
        //     (timeZone: { gmtOffset: number; value: string; _id: string }) => {
        //       const gmtOffsetHours = timeZone.gmtOffset / 3600;
        //       const sign = gmtOffsetHours >= 0 ? "+" : "-";
        //       const formattedLabel = `${timeZone.value} (GMT ${sign} ${Math.abs(
        //         gmtOffsetHours
        //       )})`;
        //       return {
        //         value: timeZone._id,
        //         label: formattedLabel,
        //       };
        //     }
        //   );
        //   setMasterTimezones(formattedTimeZones);
        // }
      } catch (error) {
        const errorMessage = extractErrorMessage(error);
        setToastData({
          type: "error",
          message: errorMessage,
        });
      }
    };

    fetchMasterData();
  }, [setMasterStates, setMasterTimezones, setToastData]);

  const currentStep = steps.find((step) => step.link === onboardingRoute);

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left Sidebar - Only visible on desktop */}
      <div className="hidden lg:flex lg:w-2/5 flex-col bg-background">
        {/* Top Section - Logo and Logout */}
        <div className="flex justify-between items-center p-6">
          <div className="flex-shrink-0">
            <Image src={logo1} alt="Logo" width={140} height={35} />
          </div>
          {/* Logout Button - Top Right */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:underline hover:text-red-600 transition-colors duration-200"
          >
            <LogOutIcon size={16} />
            <span>Logout</span>
          </button>
        </div>

        {/* Middle Section - Step Info & Animated BG */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Lottie
              animationData={dynamicOnboardingAnimation}
              loop={true}
              autoplay={true}
              style={{ width: 600, height: 600, opacity: 0.3 }}
            />
          </div>
          {currentStep && (
            <div className="text-center text-white relative z-10">
              <div className="mb-2">
                <span className="text-sm text-primary font-medium">
                  Step {currentStep.step}
                </span>
              </div>
              <h1 className="text-2xl xl:text-3xl font-bold mb-4">
                {currentStep.title}
              </h1>
              <p className="text-lg">{currentStep.description}</p>
              <div className="mt-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20">
                  <currentStep.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Steps */}
        <div className="px-8 py-6">
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div
                key={step.link}
                className={`flex items-center p-3 rounded-lg ${
                  step.link === onboardingRoute
                    ? "bg-primary/10 border border-primary"
                    : "opacity-60 hover:opacity-80"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    step.link === onboardingRoute
                      ? "bg-primary text-black"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{step.title}</p>
                  <p className="text-xs text-primary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex justify-between items-start gap-2 p-2 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            HOIZR TECHNOLOGIES PRIVATE LIMITED
          </div>
          <button
            onClick={() => {
              // Add your support functionality here
              console.log("Support clicked");
            }}
            className="text-sm font-medium text-primary cursor-pointer hover:underline transition-colors duration-200"
          >
            Support
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 lg:w-3/5 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center p-4 bg-background">
          <div className="flex-shrink-0">
            <Image src={logo1} alt="Logo" width={120} height={30} />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-600 transition-colors duration-200"
          >
            <LogOutIcon size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* Mobile Step Info */}
        <div className="lg:hidden px-4 py-4 border-b border-gray-200">
          {currentStep && (
            <div className="text-start text-white">
              <div className="mb-1">
                <span className="text-sm text-primary font-medium">
                  Step {currentStep.step}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-white">
                {currentStep.title}
              </h2>
              <p className="text-gray-600 text-sm">{currentStep.description}</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-3 lg:p-5 max-h-screen">
          <div className="w-full h-full max-w-2xl mx-auto">
            <AnimatePresence mode="wait">{children}</AnimatePresence>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden flex flex-col sm:flex-row justify-between items-center gap-2 px-4 py-2 border-t border-white bg-background">
          <div className="text-xs text-gray-500 order-2 sm:order-1">
            Hoizr Technologies Private Limited
          </div>
          <button
            onClick={() => {
              console.log("Support clicked");
            }}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 order-1 sm:order-2"
          >
            Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistOnboardingLayout;
