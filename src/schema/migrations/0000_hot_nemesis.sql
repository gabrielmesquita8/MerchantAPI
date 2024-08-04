CREATE TABLE IF NOT EXISTS "customer" (
	"customer_id" serial PRIMARY KEY NOT NULL,
	"customer_name" text,
	"codename" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"coins" integer,
	CONSTRAINT "customer_codename_unique" UNIQUE("codename")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"item_id" serial PRIMARY KEY NOT NULL,
	"item_name" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"description" varchar(255)
);
