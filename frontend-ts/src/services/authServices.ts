import type { User } from "../models/User";
import { getErrorMessage } from "../utils/errorMessage";
import backendUrl from "./apiService";

export const processLogin = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    const url = `${backendUrl}/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    const user: User = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      role: data.user.role,
      company: data.user.companie,
    };
    return user;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};

export const verifyToken = async (): Promise<null | User> => {
  try {
    const response = await fetch(`${backendUrl}/auth/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const isValid: boolean = response.status === 200;

    const data = await response.json();
    const user: User = {
      id: data.decoded.id,
      email: data.decoded.email,
      name: data.decoded.name,
      role: data.decoded.role,
    };

    if (!isValid) {
      return null;
    }

    return user;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${backendUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw Error(getErrorMessage(data.message));
    }
    return true;
  } catch (error) {
    throw Error(getErrorMessage(error));
  }
};
