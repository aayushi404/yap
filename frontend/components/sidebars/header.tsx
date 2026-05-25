import { BackButton } from "../ui/buttons"

const Header = (
    {
        onClickHandler,
        header,
        subHeader
    }: {
        onClickHandler: () => void,
        header: string,
        subHeader: string
    }
) => {
    return (
        <div className="sticky top-0 z-10 border-b border-neutral-800 bg-black/80 p-2 backdrop-blur-md">
            <div className="flex gap-2 items-center">
                <BackButton onClickHandler={onClickHandler}/>
                <div className="flex-col">
                    <h1 className="text-xl font-bold">{header}</h1>
                    <p>{subHeader}</p>
                </div>
            </div>
        </div>

    )
}

export default Header