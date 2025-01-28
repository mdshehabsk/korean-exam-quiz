import { z } from "zod";

const CreateSetZodSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "name is required" })
      .min(1, { message: "name is required" })
      .max(15, { message: "name must be less than 15 characters" }),
    description: z
      .string({ required_error: "description is required" })
      .min(1, { message: "description is required" })
      .max(100, { message: "description must be less than 100 characters" }),
  }),
});

const CreateQuestionZodSchema = z
  .object({
    body: z.object({
      type: z.enum(["reading", "listening"], {
        required_error: "question type is required",
        invalid_type_error: "type must be either 'reading' or 'listening'",
      }),
      title: z
        .string({ required_error: "title is required" })
        .min(1, { message: "title must be more than 1 character" })
        .max(300, { message: "title must be less than 300 characters" }),
      descriptionType: z.enum(["text", "audio", "image"], {
        required_error: "description type is required",
        invalid_type_error:
          "description type must be either 'text', 'audio', or 'image'",
      }),
      optionsType: z.enum(["text", "audio", "image"], {
        required_error: "options type is required",
        invalid_type_error:
          "options type must be either 'text', 'audio', or 'image'",
      }),
      description: z.string().optional(), // Conditionally validated
      options: z.string().optional(), // Conditionally validated
      answer: z.preprocess(
        (value) => {
          const parsed = Number(value); // Convert to number
          return isNaN(parsed) ? null : parsed; // Return null if not a valid number
        },
        z
          .number({ required_error: "answer is required." })
          .int("answer must be an integer.") // Ensure answer is an integer
          .min(1, "answer must be at least 1.") // Ensure stock is non-negative
      ),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.body.descriptionType === "text") {
      if (
        !data.body.description ||
        data.body.description.length < 10 ||
        data.body.description.length > 1000
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "When descriptionType is 'text', description must be between 10 and 1000 characters.",
          path: ["body", "description"],
        });
      }
    }

    // Validate options when optionsType is "text"
    if (data.body.optionsType === "text") {
      try {
        const options = JSON.parse(data.body.options || "");
        if (
          !Array.isArray(options) ||
          options.length < 4 ||
          !options.every(
            (option) =>
              typeof option === "string" &&
              option.length <= 100 &&
              option.length >= 1
          )
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "When optionsType is 'text', options must be a valid JSON string that parses to an array with at least 4 strings, each having a minimum length of 1 character and maximum length of 100 characters.",
            path: ["body", "options"],
          });
        }
      } catch (e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "When optionsType is 'text', options must be a valid JSON string that parses to an array with at least 4 strings, each having a minimum length of 1 character and maximum length of 100 characters.",
          path: ["body", "options"],
        });
      }
    }
  });

// Helper function to validate image dimensions
// async function validateImageDimensions(file: File): Promise<boolean> {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.src = URL.createObjectURL(file);
//     img.onload = () => {
//       const isValid = img.width <= 600 && img.height <= 600;
//       resolve(isValid);
//     };
//     img.onerror = () => resolve(false);
//   });
// }

// Schema definition
const CreateQuestionImageZodSchema = z
  .object({
    body: z.object({
      descriptionType: z.string(),
      optionsType : z.string()
    }),
    files: z.array(
  
      z.object({
        originalname: z.string().min(1, "File name is required"),
        fieldname: z.string(),
        mimetype: z.string().optional(),
      }).optional()
    ).optional(),
  })
  .superRefine((req, ctx) => {
    const { descriptionType , optionsType } = req.body;
    const descriptionFiles = req.files?.filter(file => file?.fieldname === 'description')  || [];
    if (descriptionType === "image") {
      if (descriptionFiles.length !== 1) {
       return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'When description type is image, exactly one description image is required.',
          path: ['files','description']
        });
      }

      const mimmeTypeOkay = ["image/jpg", "image/png", "image/jpeg"].includes(descriptionFiles[0]?.mimetype as string)
      if(!mimmeTypeOkay) {
       return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'When description type is image, Only "image/jpg", "image/png", and "image/jpeg" are allowed.',
          path: ['files','description']
        });
      }
    }
    const optionsFiles = req.files?.filter(file => file?.fieldname === 'options') || []
    if(optionsType === 'image') {
      if (optionsFiles.length !== 4) {
        return ctx.addIssue({
           code: z.ZodIssueCode.custom,
           message: 'When optoins type is image, exactly four options image is required.',
           path: ['files','options']
         });
       }
    }
    if(optionsType === 'image') {
      const everyMimeOkay = optionsFiles?.every(file =>  ["image/jpg", "image/png", "image/jpeg"].includes(file?.mimetype as string) )
      if(!everyMimeOkay) {
        return ctx.addIssue({
           code: z.ZodIssueCode.custom,
           message: 'When options type is image, Only "image/jpg", "image/png", and "image/jpeg" are allowed.',
           path: ['files','options']
         });
       }
    }
  });

export const ExamValidations = {
  CreateSetZodSchema,
  CreateQuestionZodSchema,
  CreateQuestionImageZodSchema,
};
