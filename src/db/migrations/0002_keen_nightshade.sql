ALTER TABLE "customer" ALTER COLUMN "inventory" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "customer" ALTER COLUMN "inventory" SET DEFAULT '{}'::text[];