

const myExam = {
    id:1,
    name: "Sample Exam",
    description: "This is a sample exam.",
    questions: [
        {
            type:'reading',
            id:1,
            question: "Reading Question 1",
            answer: 1,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
        {
            type:'reading',
            id:2,
            question: "Reading Question 2",
            answer: 2,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
        {
            type:'listening',
            id:3,
            question: "Listening Question 1",
            answer: 1,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
        {
            type:'listening',
            id:4,
            question: "Listening Question 2",
            answer: 2,
            options: [
                { id: 1, value: "Option 1" },
                { id: 2, value: "Option 2" },
                { id: 3, value: "Option 3" },
                { id: 4, value: "Option 4" },
            ]
        },
    ],

};

const getAllSet = async () => {

}

const getSingleSet = async (id:string) => {
    return myExam
}


export const ExamServices = {
    getAllSet,
    getSingleSet
}