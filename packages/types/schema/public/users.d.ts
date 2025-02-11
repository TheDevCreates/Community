import { Json } from "@devcreates/types/database";

export default interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}
