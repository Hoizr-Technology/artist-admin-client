import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiHeadphones, FiUser, FiUsers } from "react-icons/fi";
import { ArtistType } from "@/generated/graphql";
import { sdk } from "@/utils/graphqlClient";
import useGlobalStore from "@/store/global";
import useOnboardingStore from "@/store/onboarding"; // Import the onboarding store
import { useRouter } from "next/router";
import { extractErrorMessage } from "@/utils/functions/common";
import CButton from "../common/buttons/button";
import { ButtonType } from "../common/buttons/interface";

const artistTypes = [
  {
    type: ArtistType.Band,
    label: "Band",
    icon: <FiUsers className="h-10 w-10" />,
    description: "Group of musicians performing together",
  },
  {
    type: ArtistType.Dj,
    label: "DJ",
    icon: <FiHeadphones className="h-10 w-10" />,
    description: "Disc jockey mixing and playing recorded music",
  },
  {
    type: ArtistType.SoloMusician,
    label: "Solo Musician",
    icon: <FiUser className="h-10 w-10" />,
    description: "Individual artist performing alone",
  },
];

const ArtistTypeSelection = () => {
  const { setToastData } = useGlobalStore();
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);

  // Get artistType from store and its setter
  const { artistType, setArtistType } = useOnboardingStore();

  // Initialize local state with value from store
  const [selectedType, setSelectedType] = useState<ArtistType | null>(
    artistType as ArtistType
  );

  // Update store whenever selectedType changes
  useEffect(() => {
    if (selectedType) {
      setArtistType(selectedType);
    }
  }, [selectedType, setArtistType]);

  const handleSubmit = async () => {
    if (!selectedType) {
      setToastData({
        message: "Please select an artist type",
        type: "error",
      });
      return;
    }

    try {
      setBtnLoading(true);
      await sdk.artistOnboarding({
        input: { artistType: selectedType },
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

  return (
    <motion.div
      className=" w-full mb-auto min-h-full sm:px-12 max-w-3xl flex flex-col justify-between bg-transparent  items-center space-y-6 text-center relative"
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
      <h2 className="text-3xl font-medium text-white">
        What type of artist are you?
      </h2>
      <div className="w-full  rounded-xl shadow-sm p-6 bg-surface ">
        <div className="space-y-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {artistTypes.map((typeInfo) => (
              <div
                key={typeInfo.type}
                className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                  selectedType === typeInfo.type
                    ? "border-primary ring-2 ring-primary ring-opacity-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => setSelectedType(typeInfo.type)}
              >
                <div className="flex flex-col items-center">
                  <div className="text-primary mb-2">{typeInfo.icon}</div>
                  <h3 className="text-lg font-medium">{typeInfo.label}</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {typeInfo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
