
export interface ISetQuestion {
    type: 'reading' | 'listening',
    title?: string,
    description : string,
    descriptionType: 'text' | 'image' | 'audio'
    answer: number,
    options : string[],
    optionsType : 'text' | 'image' | 'audio'
}


export interface ISet {
    name:string,
    description:string,
    status: 'publish' | 'draft'
    questions:ISetQuestion[],
}