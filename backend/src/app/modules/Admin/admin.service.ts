import { SetModel } from "../Exam/Exam.model";



const getAllSetForAdmin = async () => {
    const allSet = await SetModel.find().select('-questions');
    return allSet;
  };

  const getSingleSetForAdmin = async (setId: string) => {
    const findSet = await SetModel.findOne({_id: setId});
    return findSet;
  };

export const AdminServices = {
    getAllSetForAdmin,
    getSingleSetForAdmin
};
