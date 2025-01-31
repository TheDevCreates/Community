import { Json } from "@devcreates/types/database";

export default interface User {
  id: string;
  created_at: string;
  github:
    | {
        id: string;
        login: string;
        avatar_url: string;
      }
    | Json;
}
