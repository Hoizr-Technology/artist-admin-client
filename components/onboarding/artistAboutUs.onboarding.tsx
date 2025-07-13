"use client";
import React from "react";
import CButton from "../common/buttons/button";
import { ButtonType } from "../common/buttons/interface";
import { useRouter } from "next/router";

const OnboardingAboutUs = () => {
  const router = useRouter();
  return (
    <div className="text-center text-primary  min-h-full sm:px-12 max-w-3xl flex flex-col justify-between">
      <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
        STEP INTO THE SPOTLIGHT
        <br />
        AND OWN YOUR BOOKINGS
      </h1>

      <div className=" text-base sm:text-lg text-white flex flex-col gap-4 text-start">
        <p>
          <strong className="text-primary text-md">
            Get booked. On your terms.
          </strong>
          <br />
          No more chasing DMs — receive verified booking requests straight to
          your inbox.
        </p>

        <p>
          <strong className="text-primary">Show up where it matters.</strong>
          <br />
          Be seen by clubs, agencies, and hosts actively looking for artists
          like you.
        </p>

        <p>
          <strong className="text-primary">
            Protect your time, protect your craft.
          </strong>
          <br />
          Set your own rates, availability, and cancellation rules — you're in
          control.
        </p>

        <p>
          <strong className="text-primary">Grow beyond your city.</strong>
          <br />
          Add locations, genres, and styles to unlock gigs across regions and
          countries.
        </p>

        <p>
          <strong className="text-primary">Turn talent into business.</strong>
          <br />
          Access negotiation tools, insights, and branding power used by
          top-tier artists.
        </p>
      </div>

      <CButton
        variant={ButtonType.Primary}
        children="Continue"
        className="w-full"
        onClick={() => router.push("/onboarding/artist/artist-type")}
      />
    </div>
  );
};

export default OnboardingAboutUs;
