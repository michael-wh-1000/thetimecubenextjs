ALTER TABLE "time_cubes" ADD COLUMN "birth_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "time_cubes" ADD COLUMN "death_date" date NOT NULL;

UPDATE time_cubes
SET 
  birth_date = CURRENT_DATE - (passed_years || ' years')::interval,
  death_date = CURRENT_DATE - (passed_years || ' years')::interval + (total_years || ' years')::interval
WHERE birth_date IS NULL;