import { ENTITY_DDL, type Entity } from "./entity"

export type CategoryColor = "GRAY" | "RED" | "YELLOW" | "BLUE" | "GREEN"

export type Category = Entity<{
  name: string
  color: CategoryColor
  monthlyLimit: number
}>

export const CATEGORY_DDL = `
  CREATE TABLE IF NOT EXISTS categories (
    ${ENTITY_DDL}
    name TEXT NOT NULL,
    color TEXT NOT NULL CHECK (color IN ('GRAY','RED','YELLOW','BLUE','GREEN')),
    monthlyLimit INTEGER NOT NULL DEFAULT 0
  );
` as const
