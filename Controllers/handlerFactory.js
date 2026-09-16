const asyncHandler = require("express-async-handler");
const AppError = require("../Utils/appError");

exports.getAll = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const docs = await Model.find();

    if (!docs) {
      return next(new AppError(`there is no ${Model.modelName}s`, 404));
    }

    res.status(200).json({
      status: "Success",
      data: {
        docs,
      },
    });
  });
};

exports.getOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const docs = await Model.findById(req.params.id);

    if (!docs) {
      return next(new AppError(`there is no ${Model.modelName}s`, 400));
    }

    res.status(200).json({
      status: "Success",
      data: {
        docs,
      },
    });
  });
};

exports.addOne = (Model) => {
  return asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: "Success",
      data: {
        newDoc,
      },
    });
  });
};

exports.updateOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc) {
      return next(
        new AppError(`there is no ${Model.modelName} with that id`, 400),
      );
    }
    res.status(201).json({
      status: "Success",
      data: {
        updatedDoc,
      },
    });
  });
};

exports.deleteOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);

    if (!deletedDoc) {
      return next(
        new AppError(`there is no ${Model.modelName} with that Id.`, 400),
      );
    }

    res.status(204).json({
      status: "Success",
    });
  });
};
