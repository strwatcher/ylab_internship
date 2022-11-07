export interface ProfileState {
  data: ProfileData;
  waiting: boolean;
}

export interface ProfileData {
  _id?: string;
  profile?: {
    name?: string;
    phone?: string;
  };
  email?: string;
}
