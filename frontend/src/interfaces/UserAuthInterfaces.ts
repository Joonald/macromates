export interface NewUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface AuthUser extends NewUser {
  _id: number;
}

export interface CustomError {
  response: {
    data: {
      field: string[];
      message: string;
    };
  };
}

export interface LoginError {
  response: {
    data: {
      message: string;
    };
  };
}

export interface ModalProps {
  isModalOpen?: boolean;
  toggleModal?: () => void;
}
