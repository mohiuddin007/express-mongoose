
export type TGuardian = {
  fatherName: string;
  motherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherContactNo: string;
  motherOccupation: string;
};

export type TUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
}

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}

export type TStudent = {
  id: string;
  name: TUserName;
  gender: "male" | "female";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'inActive';
};
