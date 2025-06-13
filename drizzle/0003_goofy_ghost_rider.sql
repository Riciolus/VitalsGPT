CREATE TABLE "nawikwok" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
