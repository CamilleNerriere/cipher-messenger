import Joi from "joi";
import sanitizeHTML from "sanitize-html";

const sanitizeString = (string) => {
  if (typeof string !== "string") return string;
  return sanitizeHTML(string, {
    allowedTags: [], // Ne permet aucune balise HTML
    allowedAttributes: {}, // Ne permet aucun attribut
  });
};

const JoiSanitized = Joi.extend((joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.sanitized":
      "Le contenu contient des balises ou attributs HTML non autorisés.",
  },
  rules: {
    sanitize: {
      validate(value, helpers) {
        const sanitized = sanitizeString(value);
        if (sanitized !== value) {
          return helpers.error("string.sanitized");
        }
        return sanitized;
      },
    },
  },
}));

const sanitizeAndValidate = {
  register: Joi.object({
    username: JoiSanitized.string().min(5).max(20).sanitize().required(),
    password: JoiSanitized.string().sanitize().min(8).max(40).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  }),
  login: Joi.object({
    password: JoiSanitized.string().sanitize().max(40).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  }),
  conversation: Joi.object({
    members: Joi.array().items(JoiSanitized.string().sanitize().length(24)),
    encryptionKey: Joi.number().min(0).max(10).required(),
  }),
};

export default sanitizeAndValidate;
