ALTER TABLE "customer" ALTER COLUMN "coins" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "inventory" integer[] DEFAULT '{}'::integer[] NOT NULL;