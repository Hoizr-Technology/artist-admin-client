import {
  FiHeadphones,
  FiUser,
  FiUsers,
  FiMic,
  FiMusic,
  FiFeather,
  FiSmile,
  FiBookOpen,
  FiFilm,
  FiEdit,
  FiUserCheck,
  FiMapPin,
  FiStar,
  FiAperture,
  FiMonitor,
} from "react-icons/fi";
import { ArtistType } from "@/generated/graphql";

export const artistTypes = [
  {
    type: ArtistType.Band,
    label: "Band",
    icon: FiUsers,
    description: "Group of musicians performing together",
  },
  {
    type: ArtistType.Dj,
    label: "DJ",
    icon: FiHeadphones,
    description: "Mixing and playing music",
  },
  {
    type: ArtistType.SoloMusician,
    label: "Solo Musician",
    icon: FiUser,
    description: "Performs alone",
  },
  {
    type: ArtistType.StandUpComedian,
    label: "Stand-up Comedian",
    icon: FiSmile,
    description: "Performs stand-up comedy",
  },
  {
    type: ArtistType.Anchor,
    label: "Anchor",
    icon: FiMic,
    description: "Hosts and anchors events",
  },
  {
    type: ArtistType.Mc,
    label: "MC",
    icon: FiMic,
    description: "Master of Ceremonies",
  },
  {
    type: ArtistType.Producer,
    label: "Producer",
    icon: FiMusic,
    description: "Creates and arranges music",
  },
  {
    type: ArtistType.Dancer,
    label: "Dancer",
    icon: FiAperture,
    description: "Performs dance acts",
  },

  {
    type: ArtistType.Speaker,
    label: "Speaker",
    icon: FiMic,
    description: "Keynote/Public Speaker",
  },
  {
    type: ArtistType.Influencer,
    label: "Influencer",
    icon: FiUserCheck,
    description: "Creates and shares content",
  },

  {
    type: ArtistType.Poet,
    label: "Poet",
    icon: FiFeather,
    description: "Performs poetry",
  },
  {
    type: ArtistType.TheaterArtist,
    label: "Theater Artist",
    icon: FiBookOpen,
    description: "Performs theater",
  },
  {
    type: ArtistType.Vj,
    label: "VJ",
    icon: FiFilm,
    description: "Video Jockey/Visuals",
  },
  {
    type: ArtistType.LiveAct,
    label: "Live Act",
    icon: FiEdit,
    description: "Performs live acts/other acts",
  },
];
