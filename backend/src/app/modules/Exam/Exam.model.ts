import mongoose, { mongo } from "mongoose";
import { ISet } from "./Exam.interface";



const setSchema = new mongoose.Schema<ISet>({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    questions:[
        {
            questionType: {
                type:String,
                required:true
            },
            titleQuestion: {
                type:String
            },
            question:{
                type:{
                    type:String,
                required:true
                },
                value: {
                    type:String,
                    required:true
                }
            },
            options:[
                {
                    type:{
                        type:String,
                        required:true
                    },
                    value:{
                        type:String,
                        require:true
                    }
                }
            ],
            answer:{
                type: String,
                required:true
            }
        }
    ]
})

export const SetModel =  mongoose.model('set',setSchema)