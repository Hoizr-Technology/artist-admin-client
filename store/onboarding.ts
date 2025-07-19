import { ArtistType, Genres } from "@/generated/graphql";
import { create } from "zustand";

type OnboardingStates = {
  // STEP 1 - User Info (no state needed, just display)

  // STEP 2 - Artist Type
  artistType: ArtistType[] | null;
  setArtistType: (e: ArtistType[]) => void;

  // STEP 3 - Stage Name, Bio, Profile Picture
  stageName: string;
  setStageName: (e: string) => void;
  bio: string;
  setBio: (e: string) => void;
  profilePicture: string;
  setProfilePicture: (e: string) => void;

  // STEP 4 - Genres
  genres: Genres[];
  setGenres: (e: Genres[]) => void;

  // STEP 5 - Address
  addressLine1: string;
  setAddressLine1: (address: string) => void;
  addressLine2: string;
  setAddressLine2: (address: string) => void;
  city: string;
  setCity: (city: string) => void;
  zipcode: string;
  setZipcode: (zipcode: string) => void;
  state: { id: string; value: string } | null;
  setState: (state: { id: string; value: string } | null) => void;
  place: { displayName: string; placeId: string } | null;
  setPlace: (place: { displayName: string; placeId: string } | null) => void;
  cords: [number, number];
  setCords: (coords: [number, number]) => void;

  // STEP 6 - Experience & Rates
  experience: string;
  setExperience: (e: string) => void;
  hourRate: number;
  setHourRate: (e: number) => void;
  hourRateCurrency: string;
  setHourRateCurrency: (e: string) => void;

  // Other data
  user: { firstName: string; lastName: string } | null;
  setUser: (e: { firstName: string; lastName: string } | null) => void;
  websiteUrl: string;
  setWebsiteUrl: (e: string) => void;
  socialLinks: {
    instagram: string;
    soundcloud: string;
    spotify: string;
    youtube: string;
    mixcloud: string;
    bandcamp: string;
  };
  setSocialLinks: (e: {
    instagram: string;
    soundcloud: string;
    spotify: string;
    youtube: string;
    mixcloud: string;
    bandcamp: string;
  }) => void;
};

const useOnboardingStore = create<OnboardingStates>((set) => ({
  // STEP 2 - Artist Type
  artistType: null,
  setArtistType: (e: ArtistType[]) => set({ artistType: e }),

  // STEP 3 - Stage Name, Bio, Profile Picture
  stageName: "",
  setStageName: (e: string) => set({ stageName: e }),
  bio: "",
  setBio: (e: string) => set({ bio: e }),
  profilePicture: "",
  setProfilePicture: (e: string) => set({ profilePicture: e }),

  // STEP 4 - Genres
  genres: [],
  setGenres: (e: Genres[]) => set({ genres: e }),

  // STEP 5 - Address
  addressLine1: "",
  setAddressLine1: (address) => set({ addressLine1: address }),
  addressLine2: "",
  setAddressLine2: (address) => set({ addressLine2: address }),
  city: "",
  setCity: (city) => set({ city }),
  state: null,
  setState: (state) => set({ state }),
  zipcode: "",
  setZipcode: (zipcode) => set({ zipcode }),

  place: null,
  setPlace: (place) => set({ place }),
  cords: [0, 0],
  setCords: (cords) => set({ cords }),

  // STEP 6 - Experience & Rates
  experience: "",
  setExperience: (e: string) => set({ experience: e }),
  hourRate: 0,
  setHourRate: (e: number) => set({ hourRate: e }),
  hourRateCurrency: "",
  setHourRateCurrency: (e: string) => set({ hourRateCurrency: e }),

  // Other data
  user: null,
  setUser: (e: { firstName: string; lastName: string } | null) =>
    set({ user: e }),
  websiteUrl: "",
  setWebsiteUrl: (e: string) => set({ websiteUrl: e }),
  socialLinks: {
    instagram: "",
    soundcloud: "",
    spotify: "",
    youtube: "",
    mixcloud: "",
    bandcamp: "",
  },
  setSocialLinks: (e: {
    instagram: string;
    soundcloud: string;
    spotify: string;
    youtube: string;
    mixcloud: string;
    bandcamp: string;
  }) => set({ socialLinks: e }),
}));

export default useOnboardingStore;
