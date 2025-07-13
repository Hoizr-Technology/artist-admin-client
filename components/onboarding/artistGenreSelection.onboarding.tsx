import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { sdk } from "@/utils/graphqlClient";
import useGlobalStore from "@/store/global";
import { extractErrorMessage } from "@/utils/functions/common";
import CButton from "../common/buttons/button";
import { ButtonType } from "../common/buttons/interface";
import { MusicGenre } from "@/generated/graphql";
import useOnboardingStore from "@/store/onboarding";
import { useRouter } from "next/router";
import {
  Music,
  Disc3,
  Headphones,
  Radio,
  MapPin,
  Coffee,
  Repeat,
  Heart,
  Guitar,
  Zap,
  TrendingUp,
  Calendar,
  Disc,
} from "lucide-react";

// Create genre objects with formatted labels
const allGenres = [
  {
    value: MusicGenre.Disco,
    label: "Disco",
    icon: Disc3,
  },
  {
    value: MusicGenre.Eighties,
    label: "80s",
    icon: Radio,
  },
  {
    value: MusicGenre.HipHop,
    label: "Hip Hop",
    icon: Headphones,
  },
  {
    value: MusicGenre.House,
    label: "House",
    icon: Music,
  },
  {
    value: MusicGenre.Local,
    label: "Local",
    icon: MapPin,
  },
  {
    value: MusicGenre.Lounge,
    label: "Lounge",
    icon: Coffee,
  },
  {
    value: MusicGenre.Nineties,
    label: "90s",
    icon: Calendar,
  },
  {
    value: MusicGenre.Reggae,
    label: "Reggae",
    icon: Music,
  },
  {
    value: MusicGenre.Remixes,
    label: "Remixes",
    icon: Repeat,
  },
  {
    value: MusicGenre.Rnb,
    label: "R&B",
    icon: Heart,
  },
  {
    value: MusicGenre.Rock,
    label: "Rock",
    icon: Guitar,
  },
  {
    value: MusicGenre.Techno,
    label: "Techno",
    icon: Zap,
  },
  {
    value: MusicGenre.Top_40,
    label: "Top 40",
    icon: TrendingUp,
  },
  {
    value: MusicGenre.TwoThousands,
    label: "2000s",
    icon: Disc3,
  },
  {
    value: MusicGenre.Vinyl,
    label: "Vinyl",
    icon: Disc,
  },
];
const ArtistGenres = () => {
  const { setToastData } = useGlobalStore();
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);

  // Get genres from store and its setter
  const { genres, setGenres } = useOnboardingStore();

  // Initialize local state with value from store
  const [selectedGenres, setSelectedGenres] = useState<MusicGenre[]>(
    (genres as MusicGenre[]) || []
  );

  // Update store whenever selectedGenres changes
  useEffect(() => {
    setGenres(selectedGenres);
  }, [selectedGenres, setGenres]);

  const toggleGenre = (genre: MusicGenre) => {
    setSelectedGenres(
      (prev) =>
        prev.includes(genre)
          ? prev.filter((g) => g !== genre) // Remove if already selected
          : [...prev, genre] // Add if not selected
    );
  };

  const handleSubmit = async () => {
    if (selectedGenres.length === 0) {
      setToastData({
        message: "Please select at least one genre",
        type: "error",
      });
      return;
    }

    try {
      setBtnLoading(true);
      await sdk.artistOnboarding({
        input: { genres: selectedGenres },
      });

      router.push("/onboarding/artist/location");
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
        Select Your Music Genres
      </h1>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allGenres.map((genre) => {
            const IconComponent = genre.icon;
            const isSelected = selectedGenres.includes(genre.value);

            return (
              <div
                key={genre.value}
                className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 `}
                onClick={() => toggleGenre(genre.value)}
              >
                {/* Glass effect overlay */}
                <div
                  className={`absolute inset-0  ${
                    isSelected ? "bg-primary/40" : "bg-primary/5"
                  } backdrop-blur-sm rounded-2xl`}
                />

                {/* Content */}
                <div className="relative p-6 flex flex-col items-center justify-center min-h-[120px]">
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
                    {genre.label}
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
              </div>
            );
          })}
        </div>

        {/* Selected genres display */}
        {selectedGenres.length > 0 && (
          <div className="mt-8 text-center">
            <h3 className="text-white text-lg font-semibold mb-4">
              Selected Genres ({selectedGenres.length})
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedGenres.map((genreValue) => {
                const genre = allGenres.find((g) => g.value === genreValue);
                return (
                  <span
                    key={genreValue}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                  >
                    {genre?.label}
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
          onClick={() => router.push("/onboarding/artist/profile-setup")}
          className="w-full"
        >
          Back
        </CButton>
        <CButton
          loading={btnLoading}
          variant={ButtonType.Primary}
          onClick={handleSubmit}
          disabled={selectedGenres.length === 0}
          className="w-full"
        >
          Continue
        </CButton>
      </div>
    </motion.div>
  );
};

export default ArtistGenres;
