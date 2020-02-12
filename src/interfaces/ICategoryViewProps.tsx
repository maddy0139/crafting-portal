export interface ICategory {
    _id: string,
    title: string,
    imageUrl: string,
    details: string
}
export interface ICategoryViewProps {
    categories?: Array<ICategory>
    categoryClickHandler?: (e: React.MouseEvent, id:string) => void
}
