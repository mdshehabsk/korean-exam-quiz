import React from "react"

type TProps = {
    children: string,
    color: 'red' | 'blue' | 'green' | 'yellow'
}


const ExamFooterBtn : React.FC<TProps> = ({children,color}) => {
 let btnColor;
 if(color === 'red') {
    btnColor = 'bg-red'
 }else if(color === 'blue'){
    btnColor = 'bg-blue'
 }else if(color === 'green'){
    btnColor = 'bg-green'
 }else if(color === 'yellow') {
    btnColor = 'bg-yellow'
 }

 return <button type="button" className={`text-white ${btnColor}-700 hover:${btnColor}-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-2.5 text-center me-2 mb-2`}> {children} </button>

}
   

export default ExamFooterBtn