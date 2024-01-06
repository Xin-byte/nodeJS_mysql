import { z } from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number({
    invalid_type_error: 'Movie year must be a number',
    required_error: 'Movie year is required'
  }).min(1950).max(2025),
  director: z.string({
    invalid_type_error: 'Movie director must a be string',
    required_error: 'Movie director is required'
  }),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'Poster must a valid URL'
  }),
  rate: z.number().min(0).max(10).default(0),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Romance']),
    {
      invalid_type_error: 'Movie genre must a ber an array of enum Genre',
      required_error: 'Movie genre is required'
    }
  )
})

function validateMovie (input) {
  return movieSchema.safeParse(input)
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}

export { validateMovie, validatePartialMovie }
