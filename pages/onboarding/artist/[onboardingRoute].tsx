import OnboardingLayout from "@/components/layouts/onboarding.layout";
import ArtistBasicInfo from "@/components/onboarding/ArtistBasicInfo";
import ArtistTypeSelection from "@/components/onboarding/ArtistTypeSelection";
import OnboardingAboutUs from "@/components/onboarding/onboardingAboutUs";
import useOnboardingStore from "@/store/onboarding";

import { sdk } from "@/utils/graphqlClient";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

type HomePageProps = {
  repo: {
    pagePath: string;
    user?: any;
    artistType?: any;
    stageName?: any;
    genres?: any;
    profilePicture?: any;
    bio?: any;
    address?: any;
    experience?: any;
    hourRateCurrency?: any;
    hourRate?: number | null;
    websiteUrl?: any;
    socialLinks?: any;
  };
};

const OnboardingPage = ({ repo }: HomePageProps) => {
  const {
    // Step 2
    setArtistType,
    // Step 3
    setStageName,
    setBio,
    setProfilePicture,
    // Step 4
    setGenres,
    // Step 5
    setAddressLine1,
    setAddressLine2,
    setCity,
    setCords,
    setPlace,
    setZipcode,
    // Step 6
    setExperience,
    setHourRate,
    setHourRateCurrency,
    // Other data
    setUser,
    setWebsiteUrl,
    setSocialLinks,
  } = useOnboardingStore();

  useEffect(() => {
    // Set user info
    setUser(repo.user);

    // Step 2 - Artist Type
    setArtistType(repo.artistType || "");

    // Step 3 - Stage Name, Bio, Profile Picture
    setStageName(repo.stageName || "");
    setBio(repo.bio || "");
    setProfilePicture(repo.profilePicture || "");

    // Step 4 - Genres
    setGenres(repo.genres || []);

    // Step 5 - Address
    setAddressLine1(repo.address?.addressLine1 || "");
    setAddressLine2(repo.address?.addressLine2 || "");
    setCity(repo.address?.city || "");
    setZipcode(repo.address?.zipcode || "");
    setCords(repo.address?.coordinate?.coordinates || [0, 0]);
    setPlace(
      repo.address?.place
        ? {
            displayName: repo.address.place.displayName,
            placeId: repo.address.place.placeId,
          }
        : null
    );

    // Step 6 - Experience & Rates
    setExperience(repo.experience || "");
    setHourRate(repo.hourRate || 0);
    setHourRateCurrency(repo.hourRateCurrency || "");

    // Other data
    setWebsiteUrl(repo.websiteUrl || "");
    setSocialLinks(
      repo.socialLinks || {
        instagram: "",
        soundcloud: "",
        spotify: "",
        youtube: "",
        mixcloud: "",
        bandcamp: "",
      }
    );
  }, [
    repo,
    setUser,
    setArtistType,
    setStageName,
    setBio,
    setProfilePicture,
    setGenres,
    setAddressLine1,
    setAddressLine2,
    setCity,
    setCords,
    setPlace,
    setZipcode,
    setExperience,
    setHourRate,
    setHourRateCurrency,
    setWebsiteUrl,
    setSocialLinks,
  ]);

  let childComponent;

  switch (repo.pagePath) {
    case "about-us":
      childComponent = <OnboardingAboutUs />;
      break;
    case "artist-type":
      childComponent = <ArtistTypeSelection />;
      break;
    case "profile-setup":
      childComponent = <ArtistBasicInfo />;
      break;

    //   break;
    default:
      childComponent = <div>Default Component</div>;
      break;
  }

  return <OnboardingLayout>{childComponent}</OnboardingLayout>;
};

export default OnboardingPage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const cookieHeader = context.req.headers.cookie ?? "";

  const tokenExists = cookieHeader.includes("accessToken=");
  if (!tokenExists) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await sdk.artistOnboardingData(
      {},
      {
        cookie: context.req.headers.cookie?.toString() ?? "",
      }
    );

    if (response && response.artistOnboardingData) {
      const {
        artistType,
        stageName,
        genres,
        profilePicture,
        bio,
        address,
        experience,
        hourRateCurrency,
        hourRate,
        websiteUrl,
        socialLinks,
      } = response.artistOnboardingData;
      console.log(context.query["onboardingRoute"]?.toString() ?? "");
      return {
        props: {
          repo: {
            pagePath: context.query["onboardingRoute"]?.toString() ?? "",
            user: response.artistOnboardingData.user,
            artistType,
            stageName,
            genres,
            profilePicture,
            bio,
            address,
            experience,
            hourRateCurrency,
            hourRate,
            websiteUrl,
            socialLinks,
          },
        },
      };
    } else if (response.artistOnboardingData === null) {
      return {
        props: {
          repo: {
            pagePath: context.query["onboardingRoute"]?.toString() ?? "",
            user: null,
            artistType: null,
            stageName: null,
            genres: null,
            profilePicture: null,
            bio: null,
            address: null,
            experience: null,
            hourRateCurrency: null,
            hourRate: null,
            websiteUrl: null,
            socialLinks: null,
          },
        },
      };
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
