import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type AccessHistory = {
  __typename?: 'AccessHistory';
  ipAddress: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTimeISO']['output'];
  userAgent: Scalars['String']['output'];
};

export type AddConfigInput = {
  boolVal?: InputMaybe<Scalars['Boolean']['input']>;
  numVal?: InputMaybe<Scalars['Float']['input']>;
  textVal?: InputMaybe<Scalars['String']['input']>;
  type: ConfigTypeEnum;
  valueType: ConfigValueEnum;
};

export type AddStateInput = {
  abbreviation: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type AddTimezoneInput = {
  gmtOffset: Scalars['Float']['input'];
  value: Scalars['String']['input'];
};

export type AddressInfo = {
  __typename?: 'AddressInfo';
  _id: Scalars['ID']['output'];
  addressLine1: Scalars['String']['output'];
  addressLine2?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  coordinate?: Maybe<LocationCommon>;
  place?: Maybe<Places>;
  state: StateData;
  zipcode: Scalars['Float']['output'];
};

export type AddressInfoInput = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  coordinate?: InputMaybe<LocationCommonInput>;
  place?: InputMaybe<PlaceInput>;
  state: StateDataInput;
  zipcode: Scalars['Float']['input'];
};

export type Admin = {
  __typename?: 'Admin';
  _id: Scalars['ID']['output'];
  accessHistory?: Maybe<Array<AccessHistory>>;
  blockedBy?: Maybe<Admin>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy?: Maybe<Admin>;
  email: Scalars['String']['output'];
  lastLoggedIn?: Maybe<Scalars['DateTimeISO']['output']>;
  lastLoggedOut?: Maybe<Scalars['DateTimeISO']['output']>;
  name: Scalars['String']['output'];
  role: AdminRole;
  status: AdminStatus;
  unBlockedBy?: Maybe<Admin>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy?: Maybe<Admin>;
};

export type AdminLoginVerificationInput = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
  otpId: Scalars['String']['input'];
};

/** Types of Admin Roles */
export enum AdminRole {
  Admin = 'ADMIN',
  Master = 'MASTER',
  Support = 'SUPPORT'
}

/** Status types for admin accounts */
export enum AdminStatus {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Pending = 'PENDING'
}

export type AgencyProfile = {
  __typename?: 'AgencyProfile';
  _id: Scalars['ID']['output'];
  agencyName: Scalars['String']['output'];
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  logoUrl?: Maybe<Scalars['String']['output']>;
  serviceTypes: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

/** Status of artist application or host offer */
export enum ApplicationStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Artist = {
  __typename?: 'Artist';
  _id?: Maybe<Scalars['ID']['output']>;
  address?: Maybe<AddressInfo>;
  agencyProfileId?: Maybe<AgencyProfile>;
  artistType?: Maybe<ArtistType>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  experience?: Maybe<ExperienceLevel>;
  firstName: Scalars['String']['output'];
  genres?: Maybe<Array<MusicGenre>>;
  hoizrBookingUrl?: Maybe<Scalars['String']['output']>;
  hourRate?: Maybe<Scalars['Float']['output']>;
  hourRateCurrency?: Maybe<Currency>;
  isDiscoverable?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  portfolio?: Maybe<Array<ArtistPortfolio>>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  rejectedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  rejectedBy?: Maybe<Scalars['String']['output']>;
  rejectionReason?: Maybe<Scalars['String']['output']>;
  socialLinks?: Maybe<SocialLinks>;
  stageName?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ProfileStatus>;
  testimonials?: Maybe<Array<Testimonial>>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  user?: Maybe<User>;
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

export type ArtistApplication = {
  __typename?: 'ArtistApplication';
  appliedAt: Scalars['DateTimeISO']['output'];
  artist: Artist;
  artistAddress?: Maybe<AddressInfo>;
  artistGenres?: Maybe<Array<MusicGenre>>;
  artistName?: Maybe<Scalars['String']['output']>;
  artistProfilePicture?: Maybe<Scalars['String']['output']>;
  artistSocialLinks?: Maybe<SocialLinks>;
  artistStageName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  status: ApplicationStatus;
};

export type ArtistApplyToEventInput = {
  eventId: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
};

export type ArtistLoginVerificationInput = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
  otpId: Scalars['String']['input'];
};

export type ArtistOnboardingInput = {
  address?: InputMaybe<AddressInfoInput>;
  artistType?: InputMaybe<ArtistType>;
  bio?: InputMaybe<Scalars['String']['input']>;
  experience?: InputMaybe<ExperienceLevel>;
  genres?: InputMaybe<Array<MusicGenre>>;
  hourRate?: InputMaybe<Scalars['Float']['input']>;
  hourRateCurrency?: InputMaybe<Currency>;
  isDiscoverable?: InputMaybe<Scalars['Boolean']['input']>;
  portfolio?: InputMaybe<Array<ArtistPortfolioInput>>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  socialLinks?: InputMaybe<SocialLinksInput>;
  stageName?: InputMaybe<Scalars['String']['input']>;
  testimonials?: InputMaybe<Array<TestimonialInput>>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
};

export type ArtistPaginatedResponse = {
  __typename?: 'ArtistPaginatedResponse';
  items: Array<Artist>;
  total: Scalars['Float']['output'];
};

export type ArtistPortfolio = {
  __typename?: 'ArtistPortfolio';
  _id?: Maybe<Scalars['ID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: PortfolioType;
  uploadedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  url: Scalars['String']['output'];
};

export type ArtistPortfolioInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type: PortfolioType;
  url: Scalars['String']['input'];
};

/** Type of artist (Dj, Band, or Solo Musician) */
export enum ArtistType {
  Band = 'BAND',
  Dj = 'DJ',
  SoloMusician = 'SOLO_MUSICIAN'
}

export type ArtistUpdateInvitationStatusInput = {
  eventId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

/** Authentication method used by the user */
export enum AuthType {
  MagicLink = 'MAGIC_LINK',
  Otp = 'OTP'
}

export type BlockUnblockArtistInput = {
  artistId: Scalars['ID']['input'];
  block: Scalars['Boolean']['input'];
};

export type BudgetRange = {
  __typename?: 'BudgetRange';
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
};

export type BudgetRangeInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export type Config = {
  __typename?: 'Config';
  _id: Scalars['ID']['output'];
  boolVal?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  numVal?: Maybe<Scalars['Float']['output']>;
  textVal?: Maybe<Scalars['String']['output']>;
  type: ConfigTypeEnum;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
  valueType: ConfigValueEnum;
};

/** Enum to store the types of master config that can be changed by admins anytime */
export enum ConfigTypeEnum {
  MaxCsvRows = 'MaxCSVRows',
  MonthlySubscription = 'MonthlySubscription',
  ProcessingFee = 'ProcessingFee'
}

/** Enum to store the types of Config Values */
export enum ConfigValueEnum {
  Boolean = 'BOOLEAN',
  Number = 'NUMBER',
  Text = 'TEXT'
}

export type ContactDetails = {
  __typename?: 'ContactDetails';
  email: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type CreateEventInput = {
  email: Scalars['String']['input'];
  otp?: InputMaybe<Scalars['String']['input']>;
  otpId?: InputMaybe<Scalars['String']['input']>;
};

/** Supported currency codes for financial transactions */
export enum Currency {
  Aud = 'AUD',
  Brl = 'BRL',
  Cad = 'CAD',
  Chf = 'CHF',
  Cny = 'CNY',
  Eur = 'EUR',
  Gbp = 'GBP',
  Inr = 'INR',
  Jpy = 'JPY',
  Mxn = 'MXN',
  Ngn = 'NGN',
  Usd = 'USD',
  Zar = 'ZAR'
}

export type Event = {
  __typename?: 'Event';
  _id: Scalars['ID']['output'];
  artistApplications?: Maybe<Array<ArtistApplication>>;
  budget?: Maybe<BudgetRange>;
  createdAt: Scalars['DateTimeISO']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTimeISO']['output']>;
  eventDate: Scalars['DateTimeISO']['output'];
  eventType: EventType;
  expectedAudience?: Maybe<Scalars['Float']['output']>;
  genresPreferred?: Maybe<Array<MusicGenre>>;
  host: HostProfile;
  hostInvitations?: Maybe<Array<HostInvitation>>;
  location: AddressInfo;
  status: EventStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** Status of the event lifecycle */
export enum EventStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Draft = 'DRAFT'
}

/** Type of the event visibility */
export enum EventType {
  InviteOnly = 'INVITE_ONLY',
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  Ticketed = 'TICKETED'
}

/** Indicates the artist's experience level */
export enum ExperienceLevel {
  Beginner = 'BEGINNER',
  Expert = 'EXPERT',
  Intermediate = 'INTERMEDIATE',
  Professional = 'PROFESSIONAL',
  Semiprofessional = 'SEMIPROFESSIONAL',
  Veteran = 'VETERAN'
}

/** Enum to store the types of operation for data filtering */
export enum FilterDataEnum {
  Contains = 'Contains',
  Equals = 'Equals',
  GreaterThan = 'GreaterThan',
  LessThan = 'LessThan',
  NotEquals = 'NotEquals'
}

export type FilterDataInput = {
  key: Scalars['String']['input'];
  operation: FilterDataEnum;
  value?: InputMaybe<Scalars['String']['input']>;
  valueArr?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type HostInvitation = {
  __typename?: 'HostInvitation';
  artist: Artist;
  artistAddress?: Maybe<AddressInfo>;
  artistGenres?: Maybe<Array<MusicGenre>>;
  artistName?: Maybe<Scalars['String']['output']>;
  artistProfilePicture?: Maybe<Scalars['String']['output']>;
  artistSocialLinks?: Maybe<SocialLinks>;
  artistStageName?: Maybe<Scalars['String']['output']>;
  invitedAt: Scalars['DateTimeISO']['output'];
  note?: Maybe<Scalars['String']['output']>;
  status: ApplicationStatus;
};

export type HostInviteArtistInput = {
  artistId: Scalars['String']['input'];
  eventId: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type HostLoginVerificationInput = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
  otpId: Scalars['String']['input'];
};

export type HostOnboardingInput = {
  address?: InputMaybe<AddressInfoInput>;
  averageEventSize?: InputMaybe<Scalars['Float']['input']>;
  businessRegistrationNumber?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  frequentCities?: InputMaybe<Array<Scalars['String']['input']>>;
  gstNumber?: InputMaybe<Scalars['String']['input']>;
  hostName?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  socialLinks?: InputMaybe<SocialLinksInput>;
  venueType?: InputMaybe<VenueType>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
};

export type HostProfile = {
  __typename?: 'HostProfile';
  _id: Scalars['ID']['output'];
  address?: Maybe<AddressInfo>;
  averageEventSize?: Maybe<Scalars['Float']['output']>;
  businessRegistrationNumber?: Maybe<Scalars['String']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  frequentCities?: Maybe<Array<Scalars['String']['output']>>;
  gstNumber?: Maybe<Scalars['String']['output']>;
  hostName?: Maybe<Scalars['String']['output']>;
  isDiscoverable: Scalars['Boolean']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  rejectedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  rejectedBy?: Maybe<Scalars['String']['output']>;
  rejectionReason?: Maybe<Scalars['String']['output']>;
  socialLinks?: Maybe<SocialLinks>;
  status?: Maybe<ProfileStatus>;
  totalBookingsMade?: Maybe<Scalars['Float']['output']>;
  totalEventsHosted?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
  venueType?: Maybe<VenueType>;
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

export type HostUpdateApplicationStatusInput = {
  artistId: Scalars['String']['input'];
  eventId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};

export type LocationCommon = {
  __typename?: 'LocationCommon';
  coordinates: Array<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type LocationCommonInput = {
  coordinates: Array<Scalars['Float']['input']>;
};

/** Various genres of music available for artist or event selection */
export enum MusicGenre {
  Disco = 'DISCO',
  Eighties = 'EIGHTIES',
  HipHop = 'HIP_HOP',
  House = 'HOUSE',
  Local = 'LOCAL',
  Lounge = 'LOUNGE',
  Nineties = 'NINETIES',
  Reggae = 'REGGAE',
  Remixes = 'REMIXES',
  Rnb = 'RNB',
  Rock = 'ROCK',
  Techno = 'TECHNO',
  Top_40 = 'TOP_40',
  TwoThousands = 'TWO_THOUSANDS',
  Vinyl = 'VINYL'
}

export type Mutation = {
  __typename?: 'Mutation';
  addConfig: Scalars['Boolean']['output'];
  addState: Scalars['Boolean']['output'];
  addTimezone: Scalars['Boolean']['output'];
  adminLogout: Scalars['Boolean']['output'];
  applyToEvent: Scalars['Boolean']['output'];
  artistLogout: Scalars['Boolean']['output'];
  artistOnboarding: Scalars['Boolean']['output'];
  artistUpdateInvitationStatus: Scalars['Boolean']['output'];
  blockUnblockArtist: Scalars['Boolean']['output'];
  completeEventCreation: Scalars['Boolean']['output'];
  createEventVerification: Scalars['String']['output'];
  hostInviteArtist: Scalars['Boolean']['output'];
  hostLogout: Scalars['Boolean']['output'];
  hostOnboarding: Scalars['Boolean']['output'];
  hostUpdateApplicationStatus: Scalars['Boolean']['output'];
  rejectArtist: Scalars['Boolean']['output'];
  tokensRefresh: Scalars['Boolean']['output'];
  updateConfig: Scalars['Boolean']['output'];
  updateEvent: Scalars['Boolean']['output'];
  updateStateStatus: Scalars['Boolean']['output'];
  updateTimezoneStatus: Scalars['Boolean']['output'];
  verifyArtist: Scalars['Boolean']['output'];
};


export type MutationAddConfigArgs = {
  input: AddConfigInput;
};


export type MutationAddStateArgs = {
  input: AddStateInput;
};


export type MutationAddTimezoneArgs = {
  input: AddTimezoneInput;
};


export type MutationApplyToEventArgs = {
  input: ArtistApplyToEventInput;
};


export type MutationArtistOnboardingArgs = {
  input: ArtistOnboardingInput;
};


export type MutationArtistUpdateInvitationStatusArgs = {
  input: ArtistUpdateInvitationStatusInput;
};


export type MutationBlockUnblockArtistArgs = {
  input: BlockUnblockArtistInput;
};


export type MutationCompleteEventCreationArgs = {
  eventId: Scalars['String']['input'];
};


export type MutationCreateEventVerificationArgs = {
  input: CreateEventInput;
};


export type MutationHostInviteArtistArgs = {
  input: HostInviteArtistInput;
};


export type MutationHostOnboardingArgs = {
  input: HostOnboardingInput;
};


export type MutationHostUpdateApplicationStatusArgs = {
  input: HostUpdateApplicationStatusInput;
};


export type MutationRejectArtistArgs = {
  input: RejectArtistInput;
};


export type MutationUpdateConfigArgs = {
  id: Scalars['String']['input'];
  input: UpdateConfigInput;
};


export type MutationUpdateEventArgs = {
  eventId: Scalars['String']['input'];
  input: UpdateEventInput;
};


export type MutationUpdateStateStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateTimezoneStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationVerifyArtistArgs = {
  input: VerifyArtistInput;
};

export type PaginationInput = {
  pageNumber?: InputMaybe<Scalars['Float']['input']>;
  rowsPerPage?: InputMaybe<RowsPerPageEnum>;
};

export type PlaceDetail = {
  __typename?: 'PlaceDetail';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  state?: Maybe<Scalars['String']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type PlaceInput = {
  displayName: Scalars['String']['input'];
  placeId: Scalars['String']['input'];
};

export type Places = {
  __typename?: 'Places';
  displayName: Scalars['String']['output'];
  placeId: Scalars['String']['output'];
};

/** Type of portfolio content (Music, Video, Image, Social, Other) */
export enum PortfolioType {
  Image = 'IMAGE',
  Music = 'MUSIC',
  Other = 'OTHER',
  Social = 'SOCIAL',
  Video = 'VIDEO'
}

/** ProfileStatus type enum  */
export enum ProfileStatus {
  Active = 'active',
  Blocked = 'blocked',
  InternalVerificationPending = 'internalVerificationPending',
  OnboardingPending = 'onboardingPending'
}

export type Query = {
  __typename?: 'Query';
  adminLogin: Scalars['String']['output'];
  adminLoginVerification: Scalars['Boolean']['output'];
  allArtists: ArtistPaginatedResponse;
  artistLogin: Scalars['String']['output'];
  artistLoginVerification: Scalars['Boolean']['output'];
  artistOnboardingData?: Maybe<Artist>;
  completeArtistOnboarding: Scalars['Boolean']['output'];
  completeHostOnboarding: Scalars['Boolean']['output'];
  createEvent: Scalars['String']['output'];
  getActiveStates: Array<State>;
  getActiveTimezones: Array<Timezone>;
  getAllConfigs: Array<Config>;
  getAllEvents: Array<Event>;
  getAllStates: Array<State>;
  getAllTimezones: Array<Timezone>;
  getArtistApplicationsForEvent: Array<ArtistApplication>;
  getConfig: Config;
  getEventById?: Maybe<Event>;
  getHostInvitationsForEvent: Array<HostInvitation>;
  getPlaceDetails?: Maybe<PlaceDetail>;
  getPlacesList: Array<Places>;
  getPublicEvents: Array<Event>;
  hostLogin: Scalars['String']['output'];
  hostLoginVerification: Scalars['Boolean']['output'];
  hostOnboardingData?: Maybe<HostProfile>;
  meArtist: Artist;
  meContactDetails?: Maybe<ContactDetails>;
  meHost: HostProfile;
  meUser?: Maybe<User>;
  userSignup: Scalars['String']['output'];
  userSignupVerification: Scalars['Boolean']['output'];
};


export type QueryAdminLoginArgs = {
  email: Scalars['String']['input'];
};


export type QueryAdminLoginVerificationArgs = {
  input: AdminLoginVerificationInput;
};


export type QueryAllArtistsArgs = {
  filter?: InputMaybe<Array<FilterDataInput>>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortDataInput>;
};


export type QueryArtistLoginArgs = {
  email: Scalars['String']['input'];
};


export type QueryArtistLoginVerificationArgs = {
  input: ArtistLoginVerificationInput;
};


export type QueryCreateEventArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetArtistApplicationsForEventArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryGetConfigArgs = {
  type: ConfigTypeEnum;
};


export type QueryGetEventByIdArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryGetHostInvitationsForEventArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryGetPlaceDetailsArgs = {
  placeId: Scalars['String']['input'];
};


export type QueryGetPlacesListArgs = {
  input: Scalars['String']['input'];
};


export type QueryHostLoginArgs = {
  email: Scalars['String']['input'];
};


export type QueryHostLoginVerificationArgs = {
  input: HostLoginVerificationInput;
};


export type QueryUserSignupArgs = {
  input: UserSignupInput;
};


export type QueryUserSignupVerificationArgs = {
  input: UserSignupVerificationInput;
};

export type RejectArtistInput = {
  artistId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};

/** Enum to store the count of items per page */
export enum RowsPerPageEnum {
  Fifty = 'FIFTY',
  Ten = 'TEN',
  Thirty = 'THIRTY'
}

export type SocialLinks = {
  __typename?: 'SocialLinks';
  bandcamp?: Maybe<Scalars['String']['output']>;
  facebook?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  mixcloud?: Maybe<Scalars['String']['output']>;
  soundcloud?: Maybe<Scalars['String']['output']>;
  spotify?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export type SocialLinksInput = {
  bandcamp?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  mixcloud?: InputMaybe<Scalars['String']['input']>;
  soundcloud?: InputMaybe<Scalars['String']['input']>;
  spotify?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
};

/** Enum to store the types of sorting options data filtering */
export enum SortDataEnum {
  Asc = 'Asc',
  Desc = 'Desc',
  None = 'None'
}

export type SortDataInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<SortDataEnum>;
};

export type State = {
  __typename?: 'State';
  _id: Scalars['ID']['output'];
  abbreviation?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  status: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
  value: Scalars['String']['output'];
};

export type StateData = {
  __typename?: 'StateData';
  stateId: Scalars['String']['output'];
  stateName: Scalars['String']['output'];
};

export type StateDataInput = {
  stateId?: InputMaybe<Scalars['String']['input']>;
  stateName: Scalars['String']['input'];
};

export type Testimonial = {
  __typename?: 'Testimonial';
  _id?: Maybe<Scalars['ID']['output']>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  name: Scalars['String']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type TestimonialInput = {
  content: Scalars['String']['input'];
  name: Scalars['String']['input'];
  profileImage?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type Timezone = {
  __typename?: 'Timezone';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdBy: Admin;
  gmtOffset: Scalars['Float']['output'];
  status: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedBy: Admin;
  value: Scalars['String']['output'];
};

export type UpdateConfigInput = {
  boolVal?: InputMaybe<Scalars['Boolean']['input']>;
  numVal?: InputMaybe<Scalars['Float']['input']>;
  textVal?: InputMaybe<Scalars['String']['input']>;
  valueType: ConfigValueEnum;
};

export type UpdateEventInput = {
  budget?: InputMaybe<BudgetRangeInput>;
  currency?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  eventDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  eventType?: InputMaybe<EventType>;
  expectedAudience?: InputMaybe<Scalars['Float']['input']>;
  genresPreferred?: InputMaybe<Array<MusicGenre>>;
  location?: InputMaybe<AddressInfoInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  authType: AuthType;
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  isVerified: Scalars['Boolean']['output'];
  lastLogin?: Maybe<Scalars['DateTimeISO']['output']>;
  lastName: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  profileId: Scalars['String']['output'];
  status: UserStatus;
  updatedAt: Scalars['DateTimeISO']['output'];
  userType: UserType;
};

export type UserSignupInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  userType: UserType;
};

export type UserSignupVerificationInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  otp: Scalars['String']['input'];
  otpId: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  userType: UserType;
};

/** UserStatus type enum  */
export enum UserStatus {
  Active = 'active',
  Blocked = 'blocked'
}

/** Type of user (artist, agency, or host) */
export enum UserType {
  Agency = 'AGENCY',
  Artist = 'ARTIST',
  Host = 'HOST'
}

/** Type of venue for events */
export enum VenueType {
  Bar = 'BAR',
  Club = 'CLUB',
  ConcertHall = 'CONCERT_HALL',
  Festival = 'FESTIVAL',
  Hotel = 'HOTEL',
  Lounge = 'LOUNGE',
  Outdoor = 'OUTDOOR',
  PrivateEvent = 'PRIVATE_EVENT',
  Restaurant = 'RESTAURANT'
}

export type VerifyArtistInput = {
  artistId: Scalars['ID']['input'];
};

export type ArtistLoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ArtistLoginQuery = { __typename?: 'Query', artistLogin: string };

export type ArtistLoginVerificationQueryVariables = Exact<{
  input: ArtistLoginVerificationInput;
}>;


export type ArtistLoginVerificationQuery = { __typename?: 'Query', artistLoginVerification: boolean };

export type ArtistLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type ArtistLogoutMutation = { __typename?: 'Mutation', artistLogout: boolean };

export type ArtistOnboardingMutationVariables = Exact<{
  input: ArtistOnboardingInput;
}>;


export type ArtistOnboardingMutation = { __typename?: 'Mutation', artistOnboarding: boolean };

export type ArtistOnboardingDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtistOnboardingDataQuery = { __typename?: 'Query', artistOnboardingData?: { __typename?: 'Artist', _id?: string | null, artistType?: ArtistType | null, stageName?: string | null, genres?: Array<MusicGenre> | null, profilePicture?: string | null, bio?: string | null, experience?: ExperienceLevel | null, hourRateCurrency?: Currency | null, hourRate?: number | null, websiteUrl?: string | null, user?: { __typename?: 'User', firstName: string, lastName: string } | null, address?: { __typename?: 'AddressInfo', addressLine1: string, addressLine2?: string | null, city: string, zipcode: number, state: { __typename?: 'StateData', stateId: string, stateName: string }, coordinate?: { __typename?: 'LocationCommon', type?: string | null, coordinates: Array<number> } | null, place?: { __typename?: 'Places', placeId: string, displayName: string } | null } | null, socialLinks?: { __typename?: 'SocialLinks', instagram?: string | null, soundcloud?: string | null, spotify?: string | null, youtube?: string | null, mixcloud?: string | null, bandcamp?: string | null } | null } | null };

export type CompleteArtistOnboardingQueryVariables = Exact<{ [key: string]: never; }>;


export type CompleteArtistOnboardingQuery = { __typename?: 'Query', completeArtistOnboarding: boolean };

export type MeArtistQueryVariables = Exact<{ [key: string]: never; }>;


export type MeArtistQuery = { __typename?: 'Query', meArtist: { __typename?: 'Artist', _id?: string | null, artistType?: ArtistType | null, stageName?: string | null, genres?: Array<MusicGenre> | null, profilePicture?: string | null, bio?: string | null, experience?: ExperienceLevel | null, hourRateCurrency?: Currency | null, hourRate?: number | null, websiteUrl?: string | null, user?: { __typename?: 'User', firstName: string, lastName: string } | null, address?: { __typename?: 'AddressInfo', addressLine1: string, addressLine2?: string | null, city: string, zipcode: number, state: { __typename?: 'StateData', stateId: string, stateName: string }, coordinate?: { __typename?: 'LocationCommon', type?: string | null, coordinates: Array<number> } | null, place?: { __typename?: 'Places', placeId: string, displayName: string } | null } | null, socialLinks?: { __typename?: 'SocialLinks', instagram?: string | null, soundcloud?: string | null, spotify?: string | null, youtube?: string | null, mixcloud?: string | null, bandcamp?: string | null } | null } };

export type MeCheckArtistQueryVariables = Exact<{ [key: string]: never; }>;


export type MeCheckArtistQuery = { __typename?: 'Query', meArtist: { __typename?: 'Artist', _id?: string | null, stageName?: string | null, status?: ProfileStatus | null, user?: { __typename?: 'User', firstName: string, lastName: string } | null } };

export type GetActiveStatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveStatesQuery = { __typename?: 'Query', getActiveStates: Array<{ __typename?: 'State', value: string, abbreviation?: string | null, _id: string }> };

export type UserSignupQueryVariables = Exact<{
  input: UserSignupInput;
}>;


export type UserSignupQuery = { __typename?: 'Query', userSignup: string };

export type UserSignupVerificationQueryVariables = Exact<{
  input: UserSignupVerificationInput;
}>;


export type UserSignupVerificationQuery = { __typename?: 'Query', userSignupVerification: boolean };

export type MeUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MeUserQuery = { __typename?: 'Query', meUser?: { __typename?: 'User', _id: string, firstName: string, lastName: string, status: UserStatus, email: string, phoneNumber: string, userType: UserType, profileId: string, isVerified: boolean, authType: AuthType } | null };

export type AllPlacesQueryVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type AllPlacesQuery = { __typename?: 'Query', getPlacesList: Array<{ __typename?: 'Places', placeId: string, displayName: string }> };

export type PlaceDetailsQueryVariables = Exact<{
  placeId: Scalars['String']['input'];
}>;


export type PlaceDetailsQuery = { __typename?: 'Query', getPlaceDetails?: { __typename?: 'PlaceDetail', latitude: number, longitude: number, city?: string | null, state?: string | null, address?: string | null, zipcode?: string | null } | null };


export const ArtistLoginDocument = gql`
    query artistLogin($email: String!) {
  artistLogin(email: $email)
}
    `;
export const ArtistLoginVerificationDocument = gql`
    query artistLoginVerification($input: ArtistLoginVerificationInput!) {
  artistLoginVerification(input: $input)
}
    `;
export const ArtistLogoutDocument = gql`
    mutation artistLogout {
  artistLogout
}
    `;
export const ArtistOnboardingDocument = gql`
    mutation artistOnboarding($input: ArtistOnboardingInput!) {
  artistOnboarding(input: $input)
}
    `;
export const ArtistOnboardingDataDocument = gql`
    query artistOnboardingData {
  artistOnboardingData {
    _id
    user {
      firstName
      lastName
    }
    artistType
    stageName
    genres
    profilePicture
    bio
    address {
      addressLine1
      addressLine2
      city
      zipcode
      state {
        stateId
        stateName
      }
      coordinate {
        type
        coordinates
      }
      place {
        placeId
        displayName
      }
    }
    experience
    hourRateCurrency
    hourRate
    websiteUrl
    socialLinks {
      instagram
      soundcloud
      spotify
      youtube
      mixcloud
      bandcamp
    }
  }
}
    `;
export const CompleteArtistOnboardingDocument = gql`
    query completeArtistOnboarding {
  completeArtistOnboarding
}
    `;
export const MeArtistDocument = gql`
    query meArtist {
  meArtist {
    _id
    user {
      firstName
      lastName
    }
    artistType
    stageName
    genres
    profilePicture
    bio
    address {
      addressLine1
      addressLine2
      city
      zipcode
      state {
        stateId
        stateName
      }
      coordinate {
        type
        coordinates
      }
      place {
        placeId
        displayName
      }
    }
    experience
    hourRateCurrency
    hourRate
    websiteUrl
    socialLinks {
      instagram
      soundcloud
      spotify
      youtube
      mixcloud
      bandcamp
    }
  }
}
    `;
export const MeCheckArtistDocument = gql`
    query meCheckArtist {
  meArtist {
    _id
    user {
      firstName
      lastName
    }
    stageName
    status
  }
}
    `;
export const GetActiveStatesDocument = gql`
    query getActiveStates {
  getActiveStates {
    value
    abbreviation
    _id
  }
}
    `;
export const UserSignupDocument = gql`
    query userSignup($input: UserSignupInput!) {
  userSignup(input: $input)
}
    `;
export const UserSignupVerificationDocument = gql`
    query userSignupVerification($input: UserSignupVerificationInput!) {
  userSignupVerification(input: $input)
}
    `;
export const MeUserDocument = gql`
    query MeUser {
  meUser {
    _id
    firstName
    lastName
    status
    email
    phoneNumber
    userType
    profileId
    isVerified
    authType
    status
  }
}
    `;
export const AllPlacesDocument = gql`
    query AllPlaces($input: String!) {
  getPlacesList(input: $input) {
    placeId
    displayName
  }
}
    `;
export const PlaceDetailsDocument = gql`
    query PlaceDetails($placeId: String!) {
  getPlaceDetails(placeId: $placeId) {
    latitude
    longitude
    city
    state
    address
    zipcode
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    artistLogin(variables: ArtistLoginQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ArtistLoginQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArtistLoginQuery>({ document: ArtistLoginDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'artistLogin', 'query', variables);
    },
    artistLoginVerification(variables: ArtistLoginVerificationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ArtistLoginVerificationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArtistLoginVerificationQuery>({ document: ArtistLoginVerificationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'artistLoginVerification', 'query', variables);
    },
    artistLogout(variables?: ArtistLogoutMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ArtistLogoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArtistLogoutMutation>({ document: ArtistLogoutDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'artistLogout', 'mutation', variables);
    },
    artistOnboarding(variables: ArtistOnboardingMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ArtistOnboardingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArtistOnboardingMutation>({ document: ArtistOnboardingDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'artistOnboarding', 'mutation', variables);
    },
    artistOnboardingData(variables?: ArtistOnboardingDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ArtistOnboardingDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArtistOnboardingDataQuery>({ document: ArtistOnboardingDataDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'artistOnboardingData', 'query', variables);
    },
    completeArtistOnboarding(variables?: CompleteArtistOnboardingQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CompleteArtistOnboardingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CompleteArtistOnboardingQuery>({ document: CompleteArtistOnboardingDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'completeArtistOnboarding', 'query', variables);
    },
    meArtist(variables?: MeArtistQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<MeArtistQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeArtistQuery>({ document: MeArtistDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'meArtist', 'query', variables);
    },
    meCheckArtist(variables?: MeCheckArtistQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<MeCheckArtistQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeCheckArtistQuery>({ document: MeCheckArtistDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'meCheckArtist', 'query', variables);
    },
    getActiveStates(variables?: GetActiveStatesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetActiveStatesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetActiveStatesQuery>({ document: GetActiveStatesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getActiveStates', 'query', variables);
    },
    userSignup(variables: UserSignupQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UserSignupQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserSignupQuery>({ document: UserSignupDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'userSignup', 'query', variables);
    },
    userSignupVerification(variables: UserSignupVerificationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UserSignupVerificationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserSignupVerificationQuery>({ document: UserSignupVerificationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'userSignupVerification', 'query', variables);
    },
    MeUser(variables?: MeUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<MeUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeUserQuery>({ document: MeUserDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'MeUser', 'query', variables);
    },
    AllPlaces(variables: AllPlacesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AllPlacesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllPlacesQuery>({ document: AllPlacesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AllPlaces', 'query', variables);
    },
    PlaceDetails(variables: PlaceDetailsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PlaceDetailsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PlaceDetailsQuery>({ document: PlaceDetailsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'PlaceDetails', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;