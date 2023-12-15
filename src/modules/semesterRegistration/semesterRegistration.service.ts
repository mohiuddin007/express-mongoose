import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semeterRegistration.constant";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  //check if there any registered semester that is already "upcoming" or 'ongoing'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: RegistrationStatus.UPCOMING }, { status: RegistrationStatus.ONGOING }],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`
    );
  }

  //check if the semester exists
  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester not found"
    );
  }

  //check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This semester is already registered!"
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate({
      path: "AcademicSemester",
      options: { strictPopulate: false },
    }),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  //check if the requested registered semester is exists
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "This semester is not found!");
  }

  //if the required semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`
    );
  }
  //upcoming -> ongoing -> ended
  if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }
  if (currentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
