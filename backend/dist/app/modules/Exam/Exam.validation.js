"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamValidations = void 0;
const zod_1 = require("zod");
const CreateSetZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: "name is required" })
            .min(1, { message: "name is required" })
            .max(15, { message: "name must be less than 15 characters" }),
        description: zod_1.z
            .string({ required_error: "description is required" })
            .min(1, { message: "description is required" })
            .max(100, { message: "description must be less than 100 characters" }),
    }),
});
const CreateQuestionZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        type: zod_1.z.enum(["reading", "listening"], {
            required_error: "question type is required",
            invalid_type_error: "type must be either 'reading' or 'listening'",
        }),
        title: zod_1.z
            .string({ required_error: "title is required" })
            .min(1, { message: "title must be more than 1 character" })
            .max(300, { message: "title must be less than 300 characters" }).optional(),
        descriptionType: zod_1.z.enum(["text", "audio", "image"], {
            required_error: "description type is required",
            invalid_type_error: "description type must be either 'text', 'audio', or 'image'",
        }),
        optionsType: zod_1.z.enum(["text", "audio", "image"], {
            required_error: "options type is required",
            invalid_type_error: "options type must be either 'text', 'audio', or 'image'",
        }),
        description: zod_1.z.string().optional(), // Conditionally validated
        options: zod_1.z.string().optional(), // Conditionally validated
        answer: zod_1.z.preprocess((value) => {
            const parsed = Number(value); // Convert to number
            return isNaN(parsed) ? null : parsed; // Return null if not a valid number
        }, zod_1.z
            .number({ required_error: "answer is required." })
            .int("answer must be an integer.") // Ensure answer is an integer
            .min(1, "answer must be at least 1.") // Ensure stock is non-negative
        ),
    }),
})
    .superRefine((data, ctx) => {
    if (data.body.descriptionType === "text") {
        if (!data.body.description ||
            data.body.description.length < 10 ||
            data.body.description.length > 1000) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "When descriptionType is 'text', description must be between 10 and 1000 characters.",
                path: ["body", "description"],
            });
        }
    }
    // Validate options when optionsType is "text"
    if (data.body.optionsType === "text") {
        try {
            const options = JSON.parse(data.body.options || "");
            if (!Array.isArray(options) ||
                options.length < 4 ||
                !options.every((option) => typeof option === "string" &&
                    option.length <= 100 &&
                    option.length >= 1)) {
                ctx.addIssue({
                    code: zod_1.z.ZodIssueCode.custom,
                    message: "When optionsType is 'text', options must be a valid JSON string that parses to an array with at least 4 strings, each having a minimum length of 1 character and maximum length of 100 characters.",
                    path: ["body", "options"],
                });
            }
        }
        catch (e) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "When optionsType is 'text', options must be a valid JSON string that parses to an array with at least 4 strings, each having a minimum length of 1 character and maximum length of 100 characters.",
                path: ["body", "options"],
            });
        }
    }
});
const CreateQuestionFileZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        descriptionType: zod_1.z.string(),
        optionsType: zod_1.z.string()
    }),
    files: zod_1.z.array(zod_1.z.object({
        originalname: zod_1.z.string().min(1, "File name is required"),
        fieldname: zod_1.z.string(),
        mimetype: zod_1.z.string().optional(),
    }).optional()).optional(),
})
    .superRefine((req, ctx) => {
    var _a, _b, _c, _d;
    const { descriptionType, optionsType } = req.body;
    const descriptionFiles = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.filter(file => (file === null || file === void 0 ? void 0 : file.fieldname) === 'description')) || [];
    if (descriptionType === "image") {
        if (descriptionFiles.length !== 1) {
            return ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'When description type is image, exactly one description image is required.',
                path: ['files', 'description']
            });
        }
        const mimmeTypeOkay = ["image/jpg", "image/png", "image/jpeg"].includes((_b = descriptionFiles[0]) === null || _b === void 0 ? void 0 : _b.mimetype);
        if (!mimmeTypeOkay) {
            return ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'When description type is image, Only "image/jpg", "image/png", and "image/jpeg" are allowed.',
                path: ['files', 'description']
            });
        }
    }
    const optionsFiles = ((_c = req.files) === null || _c === void 0 ? void 0 : _c.filter(file => (file === null || file === void 0 ? void 0 : file.fieldname) === 'options')) || [];
    if (optionsType === 'image') {
        if (optionsFiles.length !== 4) {
            return ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'When optoins type is image, exactly four options image is required.',
                path: ['files', 'options']
            });
        }
    }
    if (optionsType === 'image') {
        const everyMimeOkay = optionsFiles === null || optionsFiles === void 0 ? void 0 : optionsFiles.every(file => ["image/jpg", "image/png", "image/jpeg"].includes(file === null || file === void 0 ? void 0 : file.mimetype));
        if (!everyMimeOkay) {
            return ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'When options type is image, Only "image/jpg", "image/png", and "image/jpeg" are allowed.',
                path: ['files', 'options']
            });
        }
    }
    if (descriptionType === "audio") {
        if (descriptionFiles.length !== 1) {
            return ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'When description type is audio, exactly one description audio is required.',
                path: ['files', 'description']
            });
        }
        const mimmeTypeOkay = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/flac", "audio/aac", "audio/x-wav"].includes((_d = descriptionFiles[0]) === null || _d === void 0 ? void 0 : _d.mimetype);
        if (!mimmeTypeOkay) {
            return ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'When description type is audio, Only audio/mpeg, audio/wav, audio/ogg , audio/flac and audio/x-wav  are allowed.',
                path: ['files', 'description']
            });
        }
    }
    if (optionsType === 'audio') {
        if (optionsFiles.length !== 4) {
            return ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'When optoins type is image, exactly four options audio is required.',
                path: ['files', 'options']
            });
        }
    }
    if (optionsType === 'audio') {
        const everyMimeOkay = optionsFiles === null || optionsFiles === void 0 ? void 0 : optionsFiles.every(file => ["audio/mpeg", "audio/wav", "audio/ogg", "audio/flac", "audio/aac", "audio/x-wav"].includes(file === null || file === void 0 ? void 0 : file.mimetype));
        if (!everyMimeOkay) {
            return ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'When options type is audio, Only audio/mpeg, audio/wav, audio/ogg , audio/flac and audio/x-wav are allowed.',
                path: ['files', 'options']
            });
        }
    }
});
exports.ExamValidations = {
    CreateSetZodSchema,
    CreateQuestionZodSchema,
    CreateQuestionFileZodSchema,
};
