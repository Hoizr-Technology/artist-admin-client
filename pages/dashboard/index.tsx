import MainLayout from "@/components/layouts/mainBodyLayout";
import { UserStatus } from "@/generated/graphql";
import useGlobalStore from "@/store/global";
import useUserStore from "@/store/user";
import { redirectPathFromStatus } from "@/utils/functions/redirectPathFromStatus";
import { sdk } from "@/utils/graphqlClient";
import { Loader } from "lucide-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type NextPageWithLayout = React.FC & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type UserRepo = {
  hasAccess: boolean;
};

const Dashboard: NextPageWithLayout = ({ repo }: { repo?: UserRepo }) => {
  const { setToastData } = useGlobalStore();
  const [canEditRestaurant, setCanEditRestaurant] = useState(false);
  const [canEditMenu, setCanEditMenu] = useState(false);
  const [canEditTaxRate, setCanEditTaxRate] = useState(false);
  const [csvShowErrorModal, setCsvShowErrorModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const date = new Date();
    const iso = date.toISOString();
  }, []);

  const { meUser } = useUserStore();

  if (!repo) {
    return <Loader />;
  }

  if (!repo.hasAccess) {
    return "You do not have access to this page";
  }

  return <div>Hi</div>;
};

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
    const response = await sdk.MeCheckUser(
      {},
      {
        cookie: context.req.headers.cookie?.toString() ?? "",
      }
    );

    if (!response.meUser) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    if (response.meUser.status === UserStatus.OnboardingPending) {
      return {
        redirect: {
          destination: "/onboarding/artist/about-us",
          permanent: false,
        },
      };
    }

    const { status } = response.meUser;

    let redirectResult = redirectPathFromStatus(status, false);

    if (status === UserStatus.Active) {
      return {
        props: {
          repo: {
            hasAccess: true,
          },
        },
      };
    }

    return redirectResult;
  } catch (error) {
    // console.error("Failed to fetch user details:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
