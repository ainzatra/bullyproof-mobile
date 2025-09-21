export interface UpdateUserInfo {
  name: string;
  birthday: string;
  gender: string;
  grade: number;
  section: string;
  guardian: Guardian;
}

export interface Guardian {
  name: string;
  email: string;
  phone: string;
  address: string;
  relationship: string;
}

export interface UpdatePassword {
  old: string;
  new: string;
  confirm: string;
}
