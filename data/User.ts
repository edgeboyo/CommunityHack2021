interface User {
  username: string;
  password: string;
  email: string;
}

interface RawUser {
  username: string;
  rawPassword: string;
  email: string;
}

export { User, RawUser };
