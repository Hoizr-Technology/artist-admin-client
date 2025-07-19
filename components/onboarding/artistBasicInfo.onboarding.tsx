import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX } from "react-icons/fi";
import { sdk } from "@/utils/graphqlClient";
import useGlobalStore from "@/store/global";
import useOnboardingStore from "@/store/onboarding";
import { useRouter } from "next/router";
import { extractErrorMessage } from "@/utils/functions/common";
import CButton from "../common/buttons/button";
import { ButtonType } from "../common/buttons/interface";

const MIN_BIO_LENGTH = 30;
const MAX_BIO_LENGTH = 500;

const ArtistBasicInfo = () => {
  const { setToastData } = useGlobalStore();
  const router = useRouter();
  const [btnLoading, setBtnLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const {
    user,
    stageName,
    setStageName,
    bio,
    setBio,
    profilePicture,
    setProfilePicture,
  } = useOnboardingStore();

  // Validation error states
  const [bioError, setBioError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // For sticky footer detection, not required here but helpful for future

  // PROFILE IMAGE PREVIEW
  useEffect(() => {
    if (profileImage) {
      const objectUrl = URL.createObjectURL(profileImage);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profileImage]);

  // IMAGE UPLOAD FUNCTION
  const uploadToCloudinary = async (file: File): Promise<string> => {
    if (!file) return "";
    const formData = new FormData();
    const imageFileExtension = file.name.split(".").pop() || "";
    const sanitizedFileName = `${
      user?.firstName || "user"
    }_${Date.now()}.${imageFileExtension}`.replace(/[^a-zA-Z0-9._-]/g, "");
    formData.append("file", file, sanitizedFileName);
    formData.append("upload_preset", "client_uploads");
    formData.append("folder", "artist/profilePicture");
    formData.append("public_id", `${user?.firstName || "user"}_${Date.now()}`);
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/duhefgqh4/image/upload",
        { method: "POST", body: formData }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Upload failed: ${response.statusText}`
        );
      }
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to upload image to Cloudinary"
      );
    }
  };

  // DROPZONE
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          setToastData({
            message: "File size should be less than 5MB",
            type: "error",
          });
          return;
        }
        setProfileImage(file);
        setImageError(null);
      }
    },
    [setToastData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
    multiple: false,
    maxSize: 5 * 1024 * 1024,
  });

  // REMOVE IMAGE
  const removeImage = () => {
    setProfileImage(null);
    setPreviewUrl(null);
    setProfilePicture("");
  };

  // VALIDATION EFFECTS
  useEffect(() => {
    if (bio && bio.length < MIN_BIO_LENGTH) {
      setBioError(`Bio must be at least ${MIN_BIO_LENGTH} characters.`);
    } else {
      setBioError(null);
    }
  }, [bio]);

  useEffect(() => {
    if (!(previewUrl || profilePicture)) {
      setImageError("Please upload a profile picture.");
    } else {
      setImageError(null);
    }
  }, [previewUrl, profilePicture]);

  // FORM BUTTON LOGIC
  const formValid =
    !!stageName.trim() &&
    !!bio &&
    bio.length >= MIN_BIO_LENGTH &&
    !!(previewUrl || profilePicture) &&
    !btnLoading &&
    !imageUploading;

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    if (!formValid) {
      if (!stageName.trim()) {
        setToastData({ message: "Stage name is required.", type: "error" });
      } else if (!bio || bio.length < MIN_BIO_LENGTH) {
        setToastData({
          message: `Bio must be at least ${MIN_BIO_LENGTH} characters.`,
          type: "error",
        });
      } else if (!(previewUrl || profilePicture)) {
        setToastData({
          message: "Profile picture is required.",
          type: "error",
        });
      }
      return;
    }
    try {
      setBtnLoading(true);

      // Upload new image if present
      let profilePicUrl = profilePicture;
      if (profileImage) {
        setImageUploading(true);
        try {
          profilePicUrl = await uploadToCloudinary(profileImage);
        } catch {
          setToastData({
            message: "Failed to upload profile picture",
            type: "error",
          });
          return;
        } finally {
          setImageUploading(false);
        }
      }
      setProfilePicture(profilePicUrl);

      await sdk.artistOnboarding({
        input: {
          stageName: stageName.trim(),
          bio: bio.trim(),
          profilePicture: profilePicUrl,
        },
      });
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

  // SCROLLABLE CONTENT STYLE:
  // Set a max height, use min-h-0 and overflow-y-auto so it does not grow past screen
  // Make the whole layout (parent) use min-h-screen/flex-col
  return (
    <motion.div
      className="w-full min-h-screen max-w-3xl mx-auto flex flex-col bg-transparent items-center text-center relative py-3"
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
      }}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{ duration: 0.3, type: "spring" }}
      // Parent uses flex-col min-h-screen
    >
      {/* Header/Subtitle */}
      <div className="w-full mt-1 mb-3">
        <h1 className="text-2xl sm:text-3xl text-primary font-bold leading-tight mb-1">
          Set up your stage presence
        </h1>
        <p className="max-w-xl mx-auto text-white/60 mb-2 text-sm">
          Add your artist name, a catchy bio, and a great photo. This is how
          clubs & fans will discover you!
        </p>
      </div>

      {/* SCROLLABLE content */}
      <div
        className="w-full flex-1 overflow-y-auto min-h-0"
        style={{
          maxHeight: "calc(100vh - 200px)", // fits layout w/ buttons, adjust as needed
        }}
      >
        <div className="w-full rounded-xl shadow-sm bg-surface mb-2">
          <div className="space-y-6 p-4">
            {/* Full Name (Always Disabled) */}
            <div>
              <label className="block mb-2 text-sm font-medium text-left text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                value={`${user?.firstName || ""} ${
                  user?.lastName || ""
                }`.trim()}
                disabled
                className="input input-primary w-full"
                placeholder="Full Name"
              />
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
                maxLength={MAX_BIO_LENGTH}
              />
              <p
                className={`text-xs text-right mt-1 ${
                  bioError ? "text-red-400" : "text-gray-500"
                }`}
              >
                {bio.length}/{MAX_BIO_LENGTH} characters
              </p>
              {bioError && (
                <p className="text-xs text-left text-red-400 mt-1">
                  {bioError}
                </p>
              )}
            </div>
            {/* Profile Picture */}
            <div>
              <label className="block mb-2 text-sm font-medium text-left text-gray-300">
                Profile Picture *
              </label>
              <div className="flex items-center space-x-6">
                {(previewUrl || profilePicture) && (
                  <div className="relative flex-shrink-0">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary shadow-lg">
                        <img
                          src={previewUrl || profilePicture || ""}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <FiX size={12} />
                      </button>
                    </div>
                  </div>
                )}
                {!(previewUrl || profilePicture) && (
                  <div className="flex-1">
                    <div
                      {...getRootProps()}
                      className={`
                        relative w-full p-4 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer
                        ${
                          isDragActive
                            ? "border-primary bg-primary/10"
                            : "border-gray-600 hover:border-primary/50 hover:bg-gray-800/50"
                        }
                        ${
                          imageUploading ? "pointer-events-none opacity-50" : ""
                        }
                      `}
                    >
                      <input {...getInputProps()} />
                      <div className="text-center">
                        <div className="mx-auto w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-gray-700">
                          {imageUploading ? (
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <FiUpload className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-300 text-sm font-medium">
                            {imageUploading
                              ? "Uploading..."
                              : isDragActive
                              ? "Drop image here"
                              : "Drag & drop or click to browse"}
                          </p>
                          <p className="text-gray-500 text-xs">
                            PNG, JPG, GIF • Max 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 text-left mt-2">
                      • Upload a high-quality image for better matching results
                    </p>
                    <p className="text-xs text-gray-500 text-left">
                      • Videos are not supported
                    </p>
                    <p className="text-xs text-gray-500 text-left">
                      • Recommended: Square image, 400x400px minimum
                    </p>
                    {imageError && (
                      <p className="text-xs text-left text-red-400 mt-1">
                        {imageError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Buttons */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:space-x-6 space-y-2 sm:space-y-0 pb-2 px-1 pt-2 z-10 bg-transparent">
        <CButton
          loading={btnLoading}
          variant={ButtonType.Secondary}
          onClick={() => router.push("/onboarding/artist/artist-type")}
          className="w-full"
        >
          Back
        </CButton>
        <CButton
          loading={btnLoading || imageUploading}
          variant={ButtonType.Primary}
          onClick={handleSubmit}
          disabled={!formValid}
          className="w-full"
        >
          {imageUploading ? "Uploading..." : "Continue"}
        </CButton>
      </div>
    </motion.div>
  );
};

export default ArtistBasicInfo;
