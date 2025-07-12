import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiCamera, FiUser } from "react-icons/fi";
import { sdk } from "@/utils/graphqlClient";
import useGlobalStore from "@/store/global";
import useOnboardingStore from "@/store/onboarding";
import { useRouter } from "next/router";
import { extractErrorMessage } from "@/utils/functions/common";
import CButton from "../common/buttons/button";
import { ButtonType } from "../common/buttons/interface";

const ArtistBasicInfo = () => {
  const { setToastData } = useGlobalStore();
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    user,
    stageName,
    setStageName,
    bio,
    setBio,
    profilePicture,
    setProfilePicture,
  } = useOnboardingStore();
  console.log("akfljhhruafg yeag", user);
  // Create preview for selected image
  useEffect(() => {
    if (profileImage) {
      const objectUrl = URL.createObjectURL(profileImage);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profileImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setToastData({
          message: "File size should be less than 5MB",
          type: "error",
        });
        return;
      }
      setProfileImage(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setBtnLoading(true);

      // Upload profile picture if new image is selected
      let profilePicUrl = profilePicture;
      if (profileImage) {
        // In a real app, you would upload the file here and get the URL
        // For demo purposes, we'll simulate with a placeholder
        // const uploadedUrl = await uploadFile(profileImage);
        // profilePicUrl = uploadedUrl;
        profilePicUrl = "https://via.placeholder.com/300";
      }

      // Save to store
      setProfilePicture(profilePicUrl);

      // Submit to API
      await sdk.artistOnboarding({
        input: {
          stageName: stageName.trim(),
          bio: bio.trim(),
          profilePicture: profilePicUrl,
        },
      });

      // Go to next step
      router.push("/onboarding/artist/genres");
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
      className="w-full mb-auto min-h-full max-h-full sm:px-12 max-w-3xl flex flex-col justify-between bg-transparent items-center space-y-6 text-center relative"
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
      <h2 className="text-3xl font-medium text-white">Profile Setup</h2>
      <div className="w-full rounded-xl shadow-sm p-6 bg-surface">
        <div className="space-y-6 p-4">
          {/* Name Fields (Read-only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-left text-gray-300">
                First Name
              </label>
              <div className="flex items-center p-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-300">
                <FiUser className="mr-2" />
                <span>{user?.firstName || ""}</span>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-left text-gray-300">
                Last Name
              </label>
              <div className="flex items-center p-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-300">
                <FiUser className="mr-2" />
                <span>{user?.lastName || ""}</span>
              </div>
            </div>
          </div>

          {/* Stage Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-left text-gray-300">
              Stage Name *
            </label>
            <input
              type="text"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              className="input input-primary w-full"
              placeholder="Enter your stage name"
              maxLength={50}
            />
            <p className="text-xs text-gray-500 text-right mt-1">
              {stageName.length}/50 characters
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-2 text-sm font-medium text-left text-gray-300">
              Bio *
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="textarea textarea-primary w-full h-32"
              placeholder="Tell us about yourself and your music..."
              maxLength={500}
            />
            <p className="text-xs text-gray-500 text-right mt-1">
              {bio.length}/500 characters
            </p>
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block mb-2 text-sm font-medium text-left text-gray-300">
              Profile Picture
            </label>
            <div className="flex items-center space-x-6">
              <div className="relative">
                {previewUrl || profilePicture ? (
                  <img
                    src={previewUrl || profilePicture || ""}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                  />
                ) : (
                  <div className="bg-gray-700 border-2 border-dashed border-primary rounded-full w-24 h-24 flex items-center justify-center">
                    <FiCamera className="text-gray-400 text-2xl" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <label className="block w-full py-2 px-4 bg-gray-800 text-gray-300 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                  <span className="flex items-center justify-center">
                    <FiCamera className="mr-2" />
                    {profileImage || profilePicture
                      ? "Change Photo"
                      : "Upload Photo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Recommended size: 300x300px (max 5MB)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between space-x-6">
        <CButton
          loading={btnLoading}
          variant={ButtonType.Secondary}
          onClick={() => router.push("/onboarding/artist/artist-type")}
          className="w-full"
        >
          Back
        </CButton>
        <CButton
          loading={btnLoading}
          variant={ButtonType.Primary}
          onClick={handleSubmit}
          disabled={!stageName.trim() || !bio.trim()}
          className="w-full"
        >
          Continue
        </CButton>
      </div>
    </motion.div>
  );
};

export default ArtistBasicInfo;
