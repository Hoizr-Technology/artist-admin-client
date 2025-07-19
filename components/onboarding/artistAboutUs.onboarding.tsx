"use client";
import React from "react";
import CButton from "../common/buttons/button";
import { ButtonType } from "../common/buttons/interface";
import { useRouter } from "next/router";

const OnboardingAboutUs = () => {
  const router = useRouter();
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center   rounded-xl  px-4 sm:px-10 py-8 space-y-6">
      <div className="w-full">
        <h1 className="text-2xl sm:text-4xl font-black text-primary mb-4 text-center tracking-tight ">
          Step Into the Spotlight.
          <br className="hidden sm:block" />
          <span className="text-white">
            Take Control of Your Artist Journey
          </span>
        </h1>
        <p className="text-lg text-white/90 font-medium text-center max-w-2xl mx-auto mb-4">
          HOIZR empowers independent talent to connect, get booked, and manage
          gigs like a pro.
        </p>
      </div>

      <div className="w-full flex-1 flex flex-col gap-6 md:gap-5 items-center justify-center bg-background/60 rounded-xl  p-4 md:p-7">
        <div className="flex flex-col gap-4 w-full text-left">
          <div className="flex gap-3 items-start">
            <span className="font-bold text-primary text-lg shrink-0">🎯</span>
            <span>
              <strong className="text-primary">
                Verified Bookings & Real Support.
              </strong>
              <br />
              No chasing DMs &mdash; receive legit offers and grow your career
              with a verified artist profile.
            </span>
          </div>

          <div className="flex gap-3 items-start">
            <span className="font-bold text-primary text-lg shrink-0">🌍</span>
            <span>
              <strong className="text-primary">
                Reach Clubs, Agencies & Planners.
              </strong>
              <br />
              Get discovered by those looking for YOUR unique vibe&mdash;locally
              and globally.
            </span>
          </div>

          <div className="flex gap-3 items-start">
            <span className="font-bold text-primary text-lg shrink-0">🛡️</span>
            <span>
              <strong className="text-primary">Your Brand, Your Rules.</strong>
              <br />
              Choose your own genres, rates, and cancellation terms.{" "}
              <span className="text-white/70">You stay in control.</span>
            </span>
          </div>

          <div className="flex gap-3 items-start">
            <span className="font-bold text-primary text-lg shrink-0">📈</span>
            <span>
              <strong className="text-primary">
                Grow As An Artist & as a Business.
              </strong>
              <br />
              Access smart tools for negotiation, analytics, and branding just
              like the pros.
            </span>
          </div>

          <div className="flex gap-3 items-start">
            <span className="font-bold text-primary text-lg shrink-0">✨</span>
            <span>
              <strong className="text-primary">Break All Boundaries.</strong>
              <br />
              List multiple locations and styles. Land gigs in new cities,
              countries—even continents.
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-2">
        <CButton
          variant={ButtonType.Primary}
          onClick={() => router.push("/onboarding/artist/artist-type")}
        >
          Start Building Your Artist Profile
        </CButton>
      </div>
    </div>
  );
};

export default OnboardingAboutUs;
