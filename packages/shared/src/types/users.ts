export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type PayloadUser = Omit<User, "password">;

export type RegisterUser = Omit<User, "id"> & {
  confirmPassword: string;
};

export type LoginUser = Omit<User, "id" | "name"> & {
  rememberMe: boolean;
};
