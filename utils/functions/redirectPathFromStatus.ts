import { ArtistStatus, UserStatus } from "@/generated/graphql";
import { GetServerSidePropsResult } from "next";

export const redirectPathFromStatus = (
  status: ArtistStatus | UserStatus,
  isRestaurant: boolean
): GetServerSidePropsResult<any> => {
  // Handle Restaurant Status
  if (isRestaurant) {
    switch (status as ArtistStatus) {
      case ArtistStatus.Active:
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      //   case ArtistStatus.InternalVerificationPending:
      //     return {
      //       redirect: {
      //         destination: "/account/blocked",
      //         permanent: false,
      //       },
      //     };
      case ArtistStatus.Blocked:
        return {
          redirect: {
            destination: "/account/blocked",
            permanent: false,
          },
        };
      case ArtistStatus.OnboardingPending:
        return {
          redirect: {
            destination: "/onboarding/artist/about-us",
            permanent: false,
          },
        };
      case ArtistStatus.PaymentPending:
        return {
          redirect: {
            destination: "/account/payment-pending",
            permanent: false,
          },
        };
      default:
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
    }
  }

  // Handle User Status
  switch (status as UserStatus) {
    case UserStatus.Blocked:
      return {
        redirect: {
          destination: "/account/blocked",
          permanent: false,
        },
      };
    case UserStatus.OnboardingPending:
      return {
        redirect: {
          destination: "/onboarding/artist/about-us",
          permanent: false,
        },
      };

    case UserStatus.Active:
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    default:
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
  }
};
