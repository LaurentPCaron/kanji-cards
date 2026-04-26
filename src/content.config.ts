// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

function fixImagePath(path: string) {
  if (!path) return path;
  return path.startsWith('/') ? `${import.meta.env.BASE_URL}${path}` : path;
}

const kanjisCollection = defineCollection({
  loader: glob({ base: './src/content/kanjis', pattern: '**/*.yml' }),
  schema: z.object({
    title: z.string(),
    background: z
      .array(
        z.union([
          z.object({
            image: z.string().transform(fixImagePath),
          }),
          z.object({
            color: z.string(),
          }),
        ]),
      )
      .max(1),
    kanji: z.object({
      kanji: z.string(),
      color: z.string(),
    }),
    image: z.string().transform(fixImagePath),
    imageAlt: z.string().optional(),
    kunyomis: z.array(z.string()),
    onyomis: z.array(z.string()),
    vocabulary: z.array(
      z.object({
        french: z.string(),
        japanese: z.array(
          z.object({
            kanji: z.string(),
            furigana: z.string().optional(),
          }),
        ),
      }),
    ),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { kanjisCollection };
