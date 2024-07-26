export interface NewUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface CustomError {
  response: {
    data: {
      field: string[];
      message: string;
    };
  };
}

export interface SignUpProps {
  isModalOpen?: boolean;
  toggleModal?: () => void;
}

export interface SignUpFormProps extends SignUpProps {
  formRef: React.RefObject<HTMLDivElement | undefined>;
}
