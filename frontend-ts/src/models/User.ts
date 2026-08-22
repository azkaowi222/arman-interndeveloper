import type { Company } from "./Company";

export interface User {
  id: number | string;
  email: string;
  name: string;
  role: string;
  company?: Company
}
