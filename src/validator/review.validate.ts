import Joi from "joi";


export const validate_create_review={
    body:Joi.object()
    .keys({
        description: Joi.string().required(),
    })
}

export const validate_delete_review={
    query:Joi.object()
    .keys({rId: Joi.string(),}).required(),
};