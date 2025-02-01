import { SetModel } from "../Exam/Exam.model";



const getAllSetForAdmin = async () => {
    const allSet = await SetModel.find().select('-questions');
    return allSet;
  };

  const getSingleSetForAdmin = async (setId: string) => {
    const findSet = await SetModel.findOne({_id: setId});
    return findSet;
  };
  const addSet = async (name: string, description: string) => {
    const setCreated = await SetModel.create({
      description,
      name,
    });
    return {
      setCreated,
    };
  };
const updateSet = async ({setId,status}: {setId:string,status: string}) => {
  const foundSet = await SetModel.findById(setId)
  if(foundSet?.questions.length !== 40) {
    return {
      setIncomplete: true
    }
  }
  const updated = await SetModel.findByIdAndUpdate(setId, {status})
  return {updated}
}
export const AdminServices = {
    getAllSetForAdmin,
    getSingleSetForAdmin,
    addSet,
    updateSet
};
