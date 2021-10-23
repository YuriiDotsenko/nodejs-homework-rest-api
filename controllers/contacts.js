const { NotFound, BadRequest } = require("http-errors");

const { joiSchema } = require("../models/contact");

const { Contact } = require("../models");

const getAll = async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;
  const { favorite } = req.query;
  const { _id } = req.user;

  const skip = (page - 1) * limit;

  if (favorite) {
    const favoriteContacts = await Contact.find(
      { owner: _id, favorite },
      "_id name email phone favorite ",
      { skip: skip, limit: +limit }
    ).populate("owner", "email");

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: favoriteContacts,
      },
    });
    return;
  }

  const allContacts = await Contact.find(
    { owner: _id },
    "_id name email phone favorite ",
    { skip: skip, limit: +limit }
  ).populate("owner", "email");

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: allContacts,
    },
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(
    contactId,
    "_id name phone favorite"
  );
  if (!contactById) {
    throw new NotFound(`Contact with id = ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contactById,
    },
  });
};

const add = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      newContact,
    },
  });
};

const updateById = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  const { error } = joiSchema.validate(body);

  if (error) {
    throw new BadRequest(error.message);
  }

  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updatedContact) {
    throw new NotFound(`Contact with id = ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { updatedContact },
  });
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!updatedContact) {
    throw new NotFound(`Contact with id = ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { updatedContact },
  });
};

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const removeContact = await Contact.findByIdAndDelete(contactId);
  if (!removeContact) {
    throw new NotFound(`Contact with id = ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  updateStatusContact,
  removeById,
};
